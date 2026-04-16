import { useState, useEffect, useRef, useCallback } from 'react';
import {
  DndContext, DragOverlay, closestCenter,
  PointerSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import {
  SortableContext, verticalListSortingStrategy,
  useSortable, arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useResume } from '../context/ResumeContext.jsx';
import { SECTION_REGISTRY } from '../sections/sectionRegistry.js';
import { RENDERERS } from '../sections/renderers.js';
import HeaderSection from '../sections/HeaderSection.jsx';
import './Resume.css';

export default function Resume() {
  const { state, dispatch } = useResume();
  const { resume, layout, format } = state;

  const [localSections, setLocalSections] = useState(resume.sections);
  const [activeId, setActiveId] = useState(null);
  const localRef = useRef(localSections);

  // Keep ref in sync for use inside event handlers
  useEffect(() => { localRef.current = localSections; }, [localSections]);

  // Sync from context when not dragging
  useEffect(() => {
    if (!activeId) setLocalSections(resume.sections);
  }, [resume.sections, activeId]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const visibleLeft  = localSections.filter(s => s.visible !== false && s.column === 'left');
  const visibleRight = localSections.filter(s => s.visible !== false && s.column !== 'left');
  const activeSection = localSections.find(s => s.id === activeId);
  const canvasWidth = format.documentSize === 'letter' ? '816px' : '794px';

  function onDragStart({ active }) {
    setActiveId(active.id);
  }

  function onDragOver({ active, over }) {
    if (!over) return;
    const current = localRef.current;
    const activeSection = current.find(s => s.id === active.id);
    const overSection   = current.find(s => s.id === over.id);
    if (!activeSection || !overSection) return;
    // Only act on cross-column move
    if (activeSection.column === overSection.column) return;
    setLocalSections(prev =>
      prev.map(s => s.id === active.id ? { ...s, column: overSection.column } : s)
    );
  }

  function onDragEnd({ active, over }) {
    setActiveId(null);
    const current = localRef.current;

    if (!over) {
      setLocalSections(resume.sections);
      return;
    }

    // Same-column reorder
    const activeIdx = current.findIndex(s => s.id === active.id);
    const overIdx   = current.findIndex(s => s.id === over.id);
    const final = (overIdx !== -1 && activeIdx !== -1 && activeIdx !== overIdx)
      ? arrayMove(current, activeIdx, overIdx)
      : current;

    setLocalSections(final);
    dispatch({ type: 'REORDER_SECTIONS', sections: final });
  }

  function renderSection(section) {
    const reg = SECTION_REGISTRY[section.type];
    const Renderer = RENDERERS[reg?.renderer ?? 'generic'] ?? RENDERERS.generic;
    return (
      <SortableSection key={section.id} id={section.id}>
        <Renderer section={section} />
      </SortableSection>
    );
  }

  return (
    <div className="resume-wrapper">
      <div
        id="resume-canvas"
        className="resume-canvas"
        style={{ width: canvasWidth, minWidth: canvasWidth, fontFamily: 'var(--font-resume)' }}
      >
        <HeaderSection />

        {layout.mode === 'two-column' ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
          >
            <div className="resume-body two-column-grid">
              <ResumeColumn side="left"  sections={visibleLeft}  renderSection={renderSection} />
              <ColumnDivider onSwap={() => dispatch({ type: 'SWAP_COLUMNS' })} />
              <ResumeColumn side="right" sections={visibleRight} renderSection={renderSection} />
            </div>

            <DragOverlay dropAnimation={{ duration: 180, easing: 'ease' }}>
              {activeSection ? <SectionGhost section={activeSection} /> : null}
            </DragOverlay>
          </DndContext>
        ) : (
          <div className="resume-body one-column">
            {localSections.filter(s => s.visible !== false).map(section => {
              const reg = SECTION_REGISTRY[section.type];
              const Renderer = RENDERERS[reg?.renderer ?? 'generic'] ?? RENDERERS.generic;
              return <Renderer key={section.id} section={section} />;
            })}
          </div>
        )}

        {format.pdfKeywords && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              fontSize: '1px',
              lineHeight: '1px',
              color: 'transparent',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            {format.pdfKeywords}
          </div>
        )}
      </div>
    </div>
  );
}

function SortableSection({ id, children }) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.35 : 1 }}
      className="sortable-section"
    >
      <div ref={setActivatorNodeRef} className="section-drag-handle" {...listeners} {...attributes} title="Drag to move">
        <span className="section-drag-dots">· · · · · ·</span>
      </div>
      {children}
    </div>
  );
}

function SectionGhost({ section }) {
  const reg = SECTION_REGISTRY[section.type];
  return (
    <div className="section-ghost">
      <span className="section-ghost-icon">{reg?.icon ?? '§'}</span>
      <span className="section-ghost-label">{section.title}</span>
    </div>
  );
}

function ResumeColumn({ side, sections, renderSection }) {
  return (
    <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
      <div className={`column-${side} resume-column`}>
        <div className="column-inner">
          {sections.map(renderSection)}
        </div>
      </div>
    </SortableContext>
  );
}

function ColumnDivider({ onSwap }) {
  const { state, dispatch } = useResume();
  const dragging = useRef(false);
  const startX   = useRef(0);
  const startPct = useRef(state.layout.leftRatioPct ?? 58);

  const onMouseDown = useCallback((e) => {
    e.preventDefault();
    dragging.current = true;
    startX.current   = e.clientX;
    startPct.current = state.layout.leftRatioPct ?? 58;

    function onMove(ev) {
      if (!dragging.current) return;
      const canvas = document.getElementById('resume-canvas');
      if (!canvas) return;
      const totalW = canvas.getBoundingClientRect().width;
      const delta  = ev.clientX - startX.current;
      const newPct = Math.min(85, Math.max(15, startPct.current + (delta / totalW) * 100));
      dispatch({ type: 'SET_LEFT_RATIO', pct: Math.round(newPct * 10) / 10 });
    }
    function onUp() {
      dragging.current = false;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [state.layout.leftRatioPct, dispatch]);

  return (
    <div className="column-divider" onMouseDown={onMouseDown}>
      <div className="divider-line" />
      <button
        className="divider-swap-btn"
        onClick={(e) => { e.stopPropagation(); onSwap(); }}
        onMouseDown={(e) => e.stopPropagation()}
        title="Swap columns ⇄"
      >⇄</button>
    </div>
  );
}

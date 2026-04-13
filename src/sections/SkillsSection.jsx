import { useState, useRef, useEffect } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useResume } from '../context/ResumeContext.jsx';
import { SectionTitle } from './ProjectsSection.jsx';
import SortableItem from '../components/SortableItem.jsx';
import { nanoid } from '../utils/nanoid.js';
import './SectionBase.css';
import './SkillsSection.css';

function ChipInput({ value, onCommit, onCancel }) {
  const ref = useRef(null);
  const [val, setVal] = useState(value);

  useEffect(() => { ref.current?.focus(); ref.current?.select(); }, []);

  function commit() {
    const trimmed = val.trim();
    trimmed ? onCommit(trimmed) : onCancel();
  }

  return (
    <input
      ref={ref}
      className="skill-chip skill-chip--editing"
      value={val}
      onChange={e => setVal(e.target.value)}
      onBlur={commit}
      onKeyDown={e => {
        if (e.key === 'Enter') commit();
        if (e.key === 'Escape') onCancel();
      }}
    />
  );
}

export default function SkillsSection({ section }) {
  const { dispatch } = useResume();
  const [inputVal, setInputVal] = useState('');
  const [editingId, setEditingId] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function replaceItems(items) {
    dispatch({ type: 'REPLACE_SECTION_ITEMS', sectionId: section.id, items, historyLabel: 'Reordered skills' });
  }

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return;
    const oldIdx = section.items.findIndex(i => i.id === active.id);
    const newIdx = section.items.findIndex(i => i.id === over.id);
    replaceItems(arrayMove(section.items, oldIdx, newIdx));
  }

  function addSkill(label) {
    const trimmed = label.trim();
    if (!trimmed) return;
    dispatch({ type: 'ADD_SECTION_ITEM', sectionId: section.id, item: { id: nanoid(), label: trimmed } });
    setInputVal('');
  }

  function updateSkill(id, label) {
    dispatch({ type: 'UPDATE_SECTION_ITEM', sectionId: section.id, itemId: id, payload: { label } });
    setEditingId(null);
  }

  function removeSkill(id) {
    dispatch({ type: 'REMOVE_SECTION_ITEM', sectionId: section.id, itemId: id });
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addSkill(inputVal); }
  }

  return (
    <div className="resume-section">
      <SectionTitle section={section} dispatch={dispatch} />
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={section.items.map(i => i.id)} strategy={rectSortingStrategy}>
          <div className="skills-chip-list">
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id}>
                {({ ref, style, handleRef, listeners, attributes }) => (
                  editingId === item.id
                    ? <ChipInput
                        value={item.label}
                        onCommit={label => updateSkill(item.id, label)}
                        onCancel={() => setEditingId(null)}
                      />
                    : <span ref={ref} style={style} className="skill-chip" {...attributes}>
                        <span ref={handleRef} className="drag-dot" {...listeners} title="Drag to reorder">⠿</span>
                        <span className="skill-label" onClick={() => setEditingId(item.id)}>{item.label}</span>
                        <button className="skill-remove" onClick={() => removeSkill(item.id)}>×</button>
                      </span>
                )}
              </SortableItem>
            ))}
            <input
              className="skill-add-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => { if (inputVal.trim()) addSkill(inputVal); }}
              placeholder="+ Add skill…"
            />
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

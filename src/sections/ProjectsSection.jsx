import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useResume } from '../context/ResumeContext.jsx';
import EditableText from '../components/EditableText.jsx';
import SortableItem from '../components/SortableItem.jsx';
import { SECTION_REGISTRY } from './sectionRegistry.js';
import { nanoid } from '../utils/nanoid.js';
import './SectionBase.css';

export default function ProjectsSection({ section }) {
  const { dispatch } = useResume();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function updateItem(itemId, payload, label) {
    dispatch({ type: 'UPDATE_SECTION_ITEM', sectionId: section.id, itemId, payload, historyLabel: label });
  }

  function updateBullet(item, idx, value) {
    updateItem(item.id, { bullets: item.bullets.map((b, i) => i === idx ? value : b) }, `Edited bullet in ${section.title}`);
  }

  function addBullet(item) {
    const bullets = [...item.bullets, ''];
    updateItem(item.id, { bullets }, `Added bullet in ${section.title}`);
  }

  function removeBullet(item, idx) {
    updateItem(item.id, { bullets: item.bullets.filter((_, i) => i !== idx) }, `Removed bullet in ${section.title}`);
  }

  function moveBullet(item, { active, over }) {
    if (!over || active.id === over.id) return;
    // bullet ids are "bullet-{itemId}-{idx}"
    const oldIdx = Number(active.id.split('-').pop());
    const newIdx = Number(over.id.split('-').pop());
    updateItem(item.id, { bullets: arrayMove(item.bullets, oldIdx, newIdx) }, `Reordered bullets`);
  }

  function addItem() {
    dispatch({ type: 'ADD_SECTION_ITEM', sectionId: section.id, item: SECTION_REGISTRY[section.type].makeItem() });
  }

  function removeItem(itemId) {
    dispatch({ type: 'REMOVE_SECTION_ITEM', sectionId: section.id, itemId });
  }

  function handleCardDragEnd({ active, over }) {
    if (!over || active.id === over.id) return;
    const oldIdx = section.items.findIndex(i => i.id === active.id);
    const newIdx = section.items.findIndex(i => i.id === over.id);
    dispatch({ type: 'REPLACE_SECTION_ITEMS', sectionId: section.id, items: arrayMove(section.items, oldIdx, newIdx), historyLabel: 'Reordered projects' });
  }

  return (
    <div className="resume-section">
      <SectionTitle section={section} dispatch={dispatch} />
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleCardDragEnd}>
        <SortableContext items={section.items.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <div className="section-items">
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id}>
                {({ ref, style, handleRef, listeners, attributes }) => (
                  <div ref={ref} style={style} className="project-item section-item" {...attributes}>
                    <div className="item-header">
                      <span ref={handleRef} className="item-drag-handle" {...listeners} title="Drag to reorder">⠿</span>
                      <div className="item-header-left">
                        <EditableText tag="strong" className="item-title" value={item.title}
                          onChange={(v) => updateItem(item.id, { title: v }, `Edited project title`)} placeholder="Project Name" />
                        <EditableText tag="span" className="item-subtitle" value={item.subtitle}
                          onChange={(v) => updateItem(item.id, { subtitle: v })} placeholder="Role / Tech" />
                      </div>
                      <div className="item-header-right">
                        <EditableText tag="span" className="item-period" value={item.period}
                          onChange={(v) => updateItem(item.id, { period: v })} placeholder="Period" />
                        <button className="item-remove-btn" onClick={() => removeItem(item.id)}>×</button>
                      </div>
                    </div>
                    <BulletList item={item} onMove={moveBullet} onUpdate={updateBullet} onAdd={addBullet} onRemove={removeBullet} />
                  </div>
                )}
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <button className="add-item-btn" onClick={addItem}>+ Add Project</button>
    </div>
  );
}

export function BulletList({ item, onMove, onUpdate, onAdd, onRemove }) {
  const bulletSensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));
  const bulletIds = item.bullets.map((_, idx) => `bullet-${item.id}-${idx}`);
  return (
    <DndContext sensors={bulletSensors} collisionDetection={closestCenter} onDragEnd={(e) => onMove(item, e)}>
      <SortableContext items={bulletIds} strategy={verticalListSortingStrategy}>
        <ul className="bullet-list">
          {item.bullets.map((b, idx) => (
            <SortableItem key={bulletIds[idx]} id={bulletIds[idx]}>
              {({ ref, style, handleRef, listeners, attributes }) => (
                <li ref={ref} style={style} className="bullet-item" {...attributes}>
                  <span ref={handleRef} className="bullet-drag" {...listeners} title="Drag">⠿</span>
                  <EditableText tag="span" value={b}
                    onChange={(v) => onUpdate(item, idx, v)}
                    onEnter={() => onAdd(item)}
                    onBackspaceEmpty={() => onRemove(item, idx)}
                    placeholder="Describe what you did…" />
                </li>
              )}
            </SortableItem>
          ))}
          <li className="bullet-add" onClick={() => onAdd(item)}>+ add bullet</li>
        </ul>
      </SortableContext>
    </DndContext>
  );
}

export function SectionTitle({ section, dispatch }) {
  return (
    <div className="section-title-row">
      <EditableText tag="h2" className="section-title" value={section.title}
        onChange={(v) => dispatch({ type: 'UPDATE_SECTION_TITLE', sectionId: section.id, title: v })} />
    </div>
  );
}

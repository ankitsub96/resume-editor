import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useResume } from '../context/ResumeContext.jsx';
import EditableText from '../components/EditableText.jsx';
import SortableItem from '../components/SortableItem.jsx';
import { SECTION_REGISTRY } from './sectionRegistry.js';
import { SectionTitle } from './ProjectsSection.jsx';
import './SectionBase.css';

export default function WorkSection({ section }) {
  const { dispatch } = useResume();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const bulletSensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function updateItem(itemId, payload) {
    dispatch({ type: 'UPDATE_SECTION_ITEM', sectionId: section.id, itemId, payload });
  }

  function updateBullet(item, idx, value) {
    updateItem(item.id, { bullets: item.bullets.map((b, i) => i === idx ? value : b) });
  }

  function addBullet(item) {
    updateItem(item.id, { bullets: [...item.bullets, ''] });
  }

  function removeBullet(item, idx) {
    updateItem(item.id, { bullets: item.bullets.filter((_, i) => i !== idx) });
  }

  function moveBullet(item, { active, over }) {
    if (!over || active.id === over.id) return;
    const oldIdx = Number(active.id.split('-').pop());
    const newIdx = Number(over.id.split('-').pop());
    updateItem(item.id, { bullets: arrayMove(item.bullets, oldIdx, newIdx) });
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
    dispatch({ type: 'REPLACE_SECTION_ITEMS', sectionId: section.id, items: arrayMove(section.items, oldIdx, newIdx), historyLabel: 'Reordered jobs' });
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
                  <div ref={ref} style={style} className="section-item" {...attributes}>
                    <div className="item-header">
                      <span ref={handleRef} className="item-drag-handle" {...listeners}>⠿</span>
                      <div className="item-header-left">
                        <EditableText tag="strong" className="item-title" value={item.jobTitle}
                          onChange={(v) => updateItem(item.id, { jobTitle: v })} placeholder="Job Title" />
                        <EditableText tag="span" className="item-subtitle" value={item.company}
                          onChange={(v) => updateItem(item.id, { company: v })} placeholder="Company" />
                      </div>
                      <div className="item-header-right">
                        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:1 }}>
                          <EditableText tag="span" className="item-period" value={item.period}
                            onChange={(v) => updateItem(item.id, { period: v })} placeholder="Period" />
                          <EditableText tag="span" className="item-location" value={item.location}
                            onChange={(v) => updateItem(item.id, { location: v })} placeholder="Location" />
                        </div>
                        <button className="item-remove-btn" onClick={() => removeItem(item.id)}>×</button>
                      </div>
                    </div>
                    <DndContext sensors={bulletSensors} collisionDetection={closestCenter} onDragEnd={(e) => moveBullet(item, e)}>
                      <SortableContext items={item.bullets.map((_, idx) => `wbullet-${item.id}-${idx}`)} strategy={verticalListSortingStrategy}>
                        <ul className="bullet-list">
                          {item.bullets.map((b, idx) => (
                            <SortableItem key={`wbullet-${item.id}-${idx}`} id={`wbullet-${item.id}-${idx}`}>
                              {({ ref, style, handleRef, listeners, attributes }) => (
                                <li ref={ref} style={style} className="bullet-item" {...attributes}>
                                  <span ref={handleRef} className="bullet-drag" {...listeners}>⠿</span>
                                  <EditableText tag="span" value={b}
                                    onChange={(v) => updateBullet(item, idx, v)}
                                    onEnter={() => addBullet(item)}
                                    onBackspaceEmpty={() => removeBullet(item, idx)}
                                    placeholder="Describe your role…" />
                                </li>
                              )}
                            </SortableItem>
                          ))}
                          <li className="bullet-add" onClick={() => addBullet(item)}>+ add bullet</li>
                        </ul>
                      </SortableContext>
                    </DndContext>
                  </div>
                )}
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <button className="add-item-btn" onClick={addItem}>+ Add Job</button>
    </div>
  );
}

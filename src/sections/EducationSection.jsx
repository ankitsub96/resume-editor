import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useResume } from '../context/ResumeContext.jsx';
import EditableText from '../components/EditableText.jsx';
import SortableItem from '../components/SortableItem.jsx';
import { SECTION_REGISTRY } from './sectionRegistry.js';
import { SectionTitle } from './ProjectsSection.jsx';
import './SectionBase.css';

export default function EducationSection({ section }) {
  const { dispatch } = useResume();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function updateItem(itemId, payload) {
    dispatch({ type: 'UPDATE_SECTION_ITEM', sectionId: section.id, itemId, payload });
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
    dispatch({ type: 'REPLACE_SECTION_ITEMS', sectionId: section.id, items: arrayMove(section.items, oldIdx, newIdx) });
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
                      <span ref={handleRef} className="item-drag-handle" {...listeners} title="Drag to reorder">⠿</span>
                      <div className="item-header-left">
                        <EditableText
                          tag="strong"
                          className="item-title"
                          value={item.degree}
                          onChange={(v) => updateItem(item.id, { degree: v })}
                          placeholder="Degree / Field of Study"
                        />
                        <EditableText
                          tag="span"
                          className="item-subtitle"
                          value={item.institution}
                          onChange={(v) => updateItem(item.id, { institution: v })}
                          placeholder="University / Institution"
                        />
                        {item.gpa && (
                          <EditableText
                            tag="span"
                            className="item-period"
                            value={item.gpa}
                            onChange={(v) => updateItem(item.id, { gpa: v })}
                            placeholder="GPA / Score"
                          />
                        )}
                      </div>
                      <div className="item-header-right">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                          <EditableText
                            tag="span"
                            className="item-period"
                            value={item.period}
                            onChange={(v) => updateItem(item.id, { period: v })}
                            placeholder="MM/YYYY – MM/YYYY"
                          />
                          <EditableText
                            tag="span"
                            className="item-location"
                            value={item.location}
                            onChange={(v) => updateItem(item.id, { location: v })}
                            placeholder="Location"
                          />
                        </div>
                        </div>
                      <button className="item-remove-btn" onClick={() => removeItem(item.id)} title="Remove">×</button>
                    </div>
                  </div>
                )}
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <button className="add-item-btn" onClick={addItem}>+ Add Education</button>
    </div>
  );
}

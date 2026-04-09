import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useResume } from '../context/ResumeContext.jsx';
import EditableText from '../components/EditableText.jsx';
import SortableItem from '../components/SortableItem.jsx';
import { SECTION_REGISTRY } from './sectionRegistry.js';
import { SectionTitle } from './ProjectsSection.jsx';
import './SectionBase.css';
import './TechSkillsSection.css';

export default function TechSkillsSection({ section }) {
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
          <div className="tech-skills-list">
            {section.items.map((item) => (
              <SortableItem key={item.id} id={item.id}>
                {({ ref, style, handleRef, listeners, attributes }) => (
                  <div ref={ref} style={style} className="tech-skill-row" {...attributes}>
                    <span ref={handleRef} className="item-drag-handle" {...listeners} title="Drag to reorder">⠿</span>
                    <div className="tech-skill-inner">
                      <EditableText
                        tag="span"
                        className="tech-category"
                        value={item.category}
                        onChange={(v) => updateItem(item.id, { category: v })}
                        placeholder="Category"
                      />
                      <EditableText
                        tag="span"
                        className="tech-values"
                        value={item.skills}
                        onChange={(v) => updateItem(item.id, { skills: v })}
                        placeholder="Skill A, Skill B…"
                      />
                    </div>
                    <button className="item-remove-btn" onClick={() => removeItem(item.id)} title="Remove">×</button>
                  </div>
                )}
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <button className="add-item-btn" onClick={addItem}>+ Add Category</button>
    </div>
  );
}

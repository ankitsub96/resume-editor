/**
 * GenericSection — fallback renderer for Certificates, Languages, Achievements,
 * Volunteer, Interests, Publications, References, and any future section types
 * that use the 'generic' renderer key in sectionRegistry.js.
 */
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useResume } from '../context/ResumeContext.jsx';
import EditableText from '../components/EditableText.jsx';
import SortableItem from '../components/SortableItem.jsx';
import { SECTION_REGISTRY } from './sectionRegistry.js';
import { SectionTitle, BulletList } from './ProjectsSection.jsx';
import './SectionBase.css';

export default function GenericSection({ section }) {
  const { dispatch } = useResume();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  function updateItem(itemId, payload) {
    dispatch({ type: 'UPDATE_SECTION_ITEM', sectionId: section.id, itemId, payload });
  }

  function updateBullet(item, idx, value) {
    updateItem(item.id, { bullets: item.bullets.map((b, i) => (i === idx ? value : b)) });
  }

  function addBullet(item) {
    updateItem(item.id, { bullets: [...(item.bullets || []), ''] });
  }

  function removeBullet(item, idx) {
    updateItem(item.id, { bullets: (item.bullets || []).filter((_, i) => i !== idx) });
  }

  function moveBullet(item, { active, over }) {
    if (!over || active.id === over.id) return;
    const oldIdx = Number(active.id.split('-').pop());
    const newIdx = Number(over.id.split('-').pop());
    updateItem(item.id, { bullets: arrayMove(item.bullets, oldIdx, newIdx) });
  }

  function addItem() {
    const reg = SECTION_REGISTRY[section.type];
    const newItem = reg ? reg.makeItem() : { id: Date.now().toString(36), title: '', subtitle: '', period: '', bullets: [] };
    dispatch({ type: 'ADD_SECTION_ITEM', sectionId: section.id, item: newItem });
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
                          value={item.title || ''}
                          onChange={(v) => updateItem(item.id, { title: v })}
                          placeholder="Title"
                        />
                        {(item.subtitle !== undefined) && (
                          <EditableText
                            tag="span"
                            className="item-subtitle"
                            value={item.subtitle || ''}
                            onChange={(v) => updateItem(item.id, { subtitle: v })}
                            placeholder="Subtitle"
                          />
                        )}
                      </div>
                      <div className="item-header-right">
                        <EditableText
                          tag="span"
                          className="item-period"
                          value={item.period || ''}
                          onChange={(v) => updateItem(item.id, { period: v })}
                          placeholder="Date"
                        />
                        <button className="item-remove-btn" onClick={() => removeItem(item.id)} title="Remove">×</button>
                      </div>
                    </div>
                    {item.bullets !== undefined && (
                      <BulletList
                        item={item}
                        onMove={moveBullet}
                        onUpdate={updateBullet}
                        onAdd={addBullet}
                        onRemove={removeBullet}
                      />
                    )}
                  </div>
                )}
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <button className="add-item-btn" onClick={addItem}>+ Add Entry</button>
    </div>
  );
}

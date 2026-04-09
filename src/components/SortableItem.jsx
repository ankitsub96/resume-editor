import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/**
 * Wrap any child with drag-and-drop sortable behaviour.
 * Usage:
 *   <SortableItem id={item.id}>
 *     {(dragHandleProps) => <MyItem {...dragHandleProps} />}
 *   </SortableItem>
 *
 * dragHandleProps: { ref, style, listeners, attributes } — spread onto the drag handle element.
 */
export default function SortableItem({ id, children }) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    position: 'relative',
    zIndex: isDragging ? 10 : undefined,
  };

  return children({
    ref: setNodeRef,
    style,
    handleRef: setActivatorNodeRef,
    listeners,
    attributes,
    isDragging,
  });
}

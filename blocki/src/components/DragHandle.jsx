import { GripVertical } from 'lucide-react';

const DragHandle = () => {
  return (
    <div className="cursor-grab active:cursor-grabbing p-1">
      <GripVertical className="text-dark-bg dark:text-white" />
    </div>
  );
};

export default DragHandle;

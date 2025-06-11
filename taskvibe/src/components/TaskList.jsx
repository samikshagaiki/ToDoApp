
// components/TaskList.js
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';
import { Box } from '@mui/material';

const TaskList = ({ tasks, onUpdate, onDelete, onEdit, onReorder }) => {
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex(task => task._id === active.id);
    const newIndex = tasks.findIndex(task => task._id === over.id);
    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(oldIndex, 1);
    reorderedTasks.splice(newIndex, 0, movedTask);
    onReorder(reorderedTasks);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks.map(task => task._id)} strategy={verticalListSortingStrategy}>
        <Box>
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </Box>
      </SortableContext>
    </DndContext>
  );
};

export default TaskList;
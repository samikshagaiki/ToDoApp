// import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, Typography, Button, TextField, MenuItem, Select, Box } from '@mui/material';

const TaskCard = ({ task, onUpdate, onDelete, onEdit }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTask, setEditTask] = useState(task);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  const handleStatusChange = async (status) => {
    if (status === 'done') setShowConfetti(true);
    await onUpdate(task._id, { ...task, status });
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await onEdit(task._id, editTask);
    setIsEditing(false);
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.05 }}
    >
      <Card sx={{ mb: 2 }}>
        {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
        <CardContent>
          {isEditing ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Title"
                value={editTask.title}
                onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                fullWidth
              />
              <TextField
                label="Description"
                value={editTask.description}
                onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                multiline
                rows={3}
                fullWidth
              />
              <Select
                value={editTask.priority}
                onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
                fullWidth
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  component={Button}
                  variant="contained"
                  color="success"
                  onClick={handleSave}
                >
                  Save
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  component={Button}
                  variant="outlined"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </motion.button>
              </Box>
            </Box>
          ) : (
            <>
              <Typography variant="h6" sx={{ color: 'white' }}>{task.title}</Typography>
              <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>{task.description}</Typography>
              <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>Priority: {task.priority}</Typography>
              <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>Status: {task.status}</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  component={Button}
                  variant="contained"
                  color="primary"
                  onClick={() => handleStatusChange('done')}
                >
                  Complete
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  component={Button}
                  variant="contained"
                  color="warning"
                  onClick={handleEdit}
                >
                  Edit
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  component={Button}
                  variant="contained"
                  color="error"
                  onClick={() => onDelete(task._id)}
                >
                  Delete
                </motion.button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TaskCard;
import { useState } from 'react';
// import { motion } from 'framer-motion';
import axios from 'axios';
import { Box, TextField, Button, Typography, IconButton, Drawer } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

const Chatbot = ({ onAddTask, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hey! Need help with tasks?' }]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    try {
      const res = await axios.post('http://localhost:5000/api/chatbot', { message: input });
      setMessages([...messages, { sender: 'user', text: input }, { sender: 'bot', text: res.data.reply }]);
      if (res.data.reply.includes('task title')) {
        const title = input.replace(/add task|create task|new task/i, '').trim();
        if (title) onAddTask({ title, description: '', priority: 'medium' });
      }
    } catch (err) {
      setMessages([...messages, { sender: 'user', text: input }, { sender: 'bot', text: 'Oops, something went wrong!' }]);
        console.error('Error sending message:', err);
    }
    setInput('');
  };

  if (!user) return null;

  return (
    <motion.div
      sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1300 }}
      initial={{ scale: 0 }}
      animate={{ scale: isOpen ? 1 : 0.8 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      {!isOpen ? (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <IconButton
            color="secondary"
            onClick={() => setIsOpen(true)}
            sx={{ width: 64, height: 64, bgcolor: 'secondary.main' }}
          >
            <ChatIcon sx={{ color: 'white', fontSize: 32 }} />
          </IconButton>
        </motion.div>
      ) : (
        <Drawer anchor="bottom" open={isOpen} onClose={() => setIsOpen(false)}>
          <Box sx={{ width: 320, height: 400, p: 2, bgcolor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}>
            <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', mb: 1 }}
                >
                  <Typography
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      bgcolor: msg.sender === 'user' ? 'secondary.main' : 'grey.200',
                      color: msg.sender === 'user' ? 'white' : 'text.primary',
                      maxWidth: '70%',
                    }}
                  >
                    {msg.text}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                fullWidth
                variant="outlined"
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                sx={{ bgcolor: 'white', borderRadius: 1 }}
              />
              <Button variant="contained" color="secondary" onClick={handleSend}>
                Send
              </Button>
            </Box>
            <Button sx={{ mt: 1, color: 'white' }} onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </Box>
        </Drawer>
      )}
    </motion.div>
  );
};

export default Chatbot;
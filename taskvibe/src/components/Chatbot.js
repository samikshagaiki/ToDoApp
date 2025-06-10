// components/Chatbot.js
import { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, IconButton, Drawer, Paper } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

const Chatbot = ({ onAddTask, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hey! Need help with tasks?' }]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    
    try {
      const res = await axios.post('http://localhost:5000/api/chatbot', { message: input });
      const botMessage = { sender: 'bot', text: res.data.reply };
      setMessages(prev => [...prev, botMessage]);
      
      if (res.data.reply.includes('task title')) {
        const title = input.replace(/add task|create task|new task/i, '').trim();
        if (title) onAddTask({ title, description: '', priority: 'medium' });
      }
    } catch (err) {
      const errorMessage = { sender: 'bot', text: 'Oops, something went wrong!' };
      setMessages(prev => [...prev, errorMessage]);
      console.error('Error sending message:', err);
    }
    setInput('');
  };

  if (!user) return null;

  return (
    <>
      {!isOpen ? (
        <IconButton
          onClick={() => setIsOpen(true)}
          sx={{ 
            position: 'fixed', 
            bottom: 20, 
            right: 20, 
            width: 64, 
            height: 64, 
            bgcolor: 'secondary.main',
            '&:hover': { bgcolor: 'secondary.dark' }
          }}
        >
          <ChatIcon sx={{ color: 'white' }} />
        </IconButton>
      ) : (
        <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
          <Box sx={{ width: 400, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">TaskVibe Assistant</Typography>
              <IconButton onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            </Box>
            
            <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
              {messages.map((msg, index) => (
                <Paper
                  key={index}
                  sx={{
                    p: 2,
                    mb: 2,
                    bgcolor: msg.sender === 'user' ? 'primary.light' : 'grey.100',
                    ml: msg.sender === 'user' ? 4 : 0,
                    mr: msg.sender === 'bot' ? 4 : 0,
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                </Paper>
              ))}
            </Box>
            
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  fullWidth
                  variant="outlined"
                  size="small"
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button
                  onClick={handleSend}
                  variant="contained"
                  color="primary"
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default Chatbot;
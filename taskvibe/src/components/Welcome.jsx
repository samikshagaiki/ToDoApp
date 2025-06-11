import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/tasks');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '80vh',
      textAlign: 'center',
      p: 4
    }}>
      <Box sx={{ mb: 4 }}>
        <img 
          src="/bot.jpg" 
          alt="Bot" 
          style={{ width: 200, height: 200, borderRadius: '50%' }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </Box>
      <Typography variant="h2" sx={{ color: 'white', mb: 3, fontWeight: 'bold' }}>
        Welcome to TaskVibe!!!
      </Typography>
      <Typography variant="h5" sx={{ color: 'white', opacity: 0.9, maxWidth: 600, mb: 4 }}>
        Your ultimate to-do companion. Let our bot guide you to crush your tasks with style and fun!
      </Typography>
      <Button
        variant="contained"
        onClick={handleGetStarted}
        sx={{
          bgcolor: '#7c3aed',
          '&:hover': { bgcolor: '#6d28d9' },
          color: 'white',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          px: 4,
          py: 1.5,
          borderRadius: 2,
          textTransform: 'none',
          boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)'
        }}
      >
        Let's Get Started
      </Button>
    </Box>
  );
};

export default Welcome;
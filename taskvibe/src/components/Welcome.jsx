import { Box, Typography } from '@mui/material';

const Welcome = () => {
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
      <Typography variant="h5" sx={{ color: 'white', opacity: 0.9, maxWidth: 600 }}>
        Your ultimate to-do companion. Let our bot guide you to crush your tasks with style and fun!
      </Typography>
    </Box>
  );
};

export default Welcome;

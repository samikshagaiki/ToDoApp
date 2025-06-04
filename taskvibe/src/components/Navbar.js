import {Link} from 'react-router-dom';
// import{motion} from 'framer-motion';
import {AppBar,ToolBar,Typography,Button,Box} from '@mui/material';

const Navbar = ({user,setUser}) =>{
    const handleLogout =() =>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return(
        <motion.div
            initial={{y:-50,opacity:0}}
            animate={{y:0,opacity:1}}
            transition={{duration:0.5}}
        >
            <AppBar position="static" sx={{bgcolor:'rgba(255,255,255,0.2',backdropFilter:'blur(10px'}}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow:1,color:'white'}}>
                         TaskVibe
                    </Typography>
                        <Box>
                            <Button color="inherit" component={Link} to="/" sx={{color:'white'}}>
                                Home
                           </Button>
                           {user?(
                            <>
                                <Typography variant="body1" component="span" sx={{ color: 'white', mr: 2 }}>
                                    Hi, {user.username}
                                </Typography>
                                <Button color="inherit" onClick={handleLogout} sx={{ color: 'white' }}>
                                    Logout
                                </Button>
                            </>
                           ):(
                            <>
                                <Button color="inherit" component={Link} to="/login" sx={{ color: 'white' }}>
                                    Login
                                </Button>
                                <Button color="inherit" component={Link} to="/register" sx={{ color: 'white' }}>
                                    Register
                                </Button>
                            </>
                           )}
                        </Box>
                    
                </Toolbar>
            </AppBar>
        </motion.div>
    );
};

export default Navbar;
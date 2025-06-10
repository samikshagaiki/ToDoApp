// import {motion} from 'framer-motion';
import {Box,Typography} from '@mui/material';
import botImage from '../assets/bot.jpg';

const Welcome = () =>{
    return(
        <motion.div
        initial = {{opacity:0,scale:0.8}}
        animate={{opacity:1,scale:1}}
        transition={{duration:1,type:'spring'}}
        >
            <Box
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    alignItems:'center',
                    justifyContent:'center',
                    height:'100vh',
                    color:'white',
                    textAlign:'center',
                }}
            >
                
                <motion.img
                    src={botImage}
                    alt="TaksVibe Bot"
                    style={{width:128,height:128,marginBottom:16}}
                    animate={{scale:[1,1.1,1],rotate:[0,10,-10,0]}}
                    transition={{duration:2,repeat:Infinity}}
                />
                <Typography variant="h4" sx={{mb:2,fontWeight:'bold'}}>
                    Welcome to TaskVibe!!!
                </Typography>
                <Typography variant="body1" sx={{ maxWidth: 400 }}>
                    Your ultimate to-do companion. Let our bot guide you to crush your tasks with style and fun!
                </Typography>
    
                </Box>
        </motion.div>
    )
}
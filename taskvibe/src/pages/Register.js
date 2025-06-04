import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Box,Card,CardContent,Typography,TextField,Button} from '@mui/material';

const Register =({setUser}) =>{
    const [formData,setFormData] = useState({username:'',email:'',password:''});
    const [error,setError] = useState('');
    const navigate=useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:5000/api/auth/register',formData);
            localStorage.setItem('token',res.data.token);
            localStorage.setItem('user',JSON.stringify(res.data.user));
            setUser(res.data.user);
            navigate('/tasks');
        }catch(err){
            setError(err.response?.data.message || 'Registration failed'); 
        }
    };

    return(
        <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.5}}
        >
            <Box sx ={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                <Card sx={{maxWidth:400,width:'100%',p:2}}>
                    <CardContent>
                        <Typography variant="h5" sx={{mb:2,color:'white'}}>
                            Register
                        </Typography>
                        {error && (
                            <Typography color="error" sx={{mb:2}}>
                                {error}
                            </Typography>
                        )}
                        <Box component ="form" onSubmit={handleSubmit} sx={{display:'flex',flexDirection:'column',gap:2}}>
                            <TextField
                                label="Username"
                                value={formData.username}
                                onChange={(e) => setFormData({...formData,username:e.target.value})}
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData,email:e.target.value})}
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                label="Password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData,password:e.target.value})}
                                fullWidth
                                variant="outlined"
                            />
                            <motion.button
                                whileHover={{scale:1.05}}
                                whileTap={{scale:0.95}}
                                component={Button}
                                type="submit"
                                variant="contained"
                                color="secondary"
                            >
                                Register
                            </motion.button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </motion.div>    
    );
};

export default Register;
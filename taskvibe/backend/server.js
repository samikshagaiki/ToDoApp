const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const {setupChatbot} = require('./chatbot/nlp');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>console.log('MongoDB connected'))
.catch(err=>crossOriginIsolated.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

let nlp;
setupChatbot().then(nlpInstance =>{
    nlp = nlpInstance;
});

app.post('/api/chatbot',async(req,res)=>{
    const{message} = req.body;
    const response = await nlp.process('en',message);
    res.json({reply:response.answer || `Sorry,I didn't undersatnd that`});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
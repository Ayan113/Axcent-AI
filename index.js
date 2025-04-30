const express= require('express');
const cors=require('cors');
const fetch = require('node-fetch');
require('dotenv').config();
const app=express();

//Middlewares
app.use(cors());
app.use(express.json());

const ELEVENLABS_API_KEY='sk_1e22de7fa4394b57c0a777785df7338309a7f1db761e4d7f';
const voiceMap={
    indian:'SGbOfpm28edC83pZ9iGb',
    american:'iLzHtPh0bW6RGWRG0Xo5',
    british:'DWRB4weeqtqHSoQLvPTd',
    japanese:'Mv8AjrYZCBkdsmDHNwcB',
    chinese:'fQj4gJSexpu8RDE2Ii5m',
    german:'AnvlJBAqSLDzEevYr9Ap',
    french:'FNOttooGMYDRXmqkQ0Fz',
    arabic: 'EzoxNTKsg4JNN7wxAgut',
    korean:'QEj0heL4nQHjaGrihlr0',
    italian:'t3hJ92dgZhDVtsff084B',
};
//test route
app.get('/',(req,res)=>{
    res.send('Axcent AI backend is running');

});
//POST route to receive data from frontend that is sentence and accent
app.post('/generate',async(req,res)=>{
    const{sentence,accent}=req.body;

    console.log("Received sentence:",sentence);
    console.log("Received accent:",accent);

    if(!sentence || !accent){
        return res.status(400).json({error:'Please provide a sentence and an accent.'});

    }
    const voiceId=voiceMap[accent] || 'EXAVITQu4vr4xnSDxMaL'; // Default voice ID if accent not found

    try{
        const response=await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,{
            method:'POST',
            headers:{
                'xi-api-key':ELEVENLABS_API_KEY,
                'Content-Type':'application/json',
                'Accept':'audio/mpeg'
            },
            body:JSON.stringify({
                text:sentence,
                voice_setting:{
                    stability:0.75,
                    similarity_boost:0.75
                }
            })
        });
        const audioBuffer=await response.buffer();

        res.set('Content-Type','audio/mpeg');
        res.send(audioBuffer);
    }catch(error){
        console.error("Error generating voice:",error);
        res.status(500).json({error:'Failed to generate voice'});
    }


});

//start server
const PORT=5000;
app.listen(PORT,()=>{
    console.log('Server running on port',PORT);
});

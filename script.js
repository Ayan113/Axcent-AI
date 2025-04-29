document.addEventListener('DOMContentLoaded',()=>{
    const convertBtn=document.getElementById("convertBtn");
    const audioPlayer=document.getElementById('audio');

    convertBtn.addEventListener('click',async()=>{
        const sentence=document.getElementById('sentenceInput').value.trim();
        const accent=document.getElementById('accentSelect').value;

        if(!sentence || !accent){
            alert('Please type a sentence and select an accent.');
            return;
        }
        console.log('Sending Sentence:',sentence);
        console.log('Sending Accent:',accent);

        try{
               
            const response=await fetch('http://localhost:5000/generate',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'

                },
                body:JSON.stringify({sentence,accent})
            });
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
      
            audioPlayer.src = audioUrl;
            audioPlayer.style.display = 'block';
            audioPlayer.play();
          } catch (error) {
            console.error('Error:', error);
            alert('Failed to generate voice. Please try again.');
        }
    });
});
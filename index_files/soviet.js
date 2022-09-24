const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();

const url = 'https://ware255.github.io/soviet.mp3';

let audioSource = null;
let playCtx = null;

const eventName = typeof document.ontouchend !== 'undefined' ? 'touchend' : 'mouseup';
document.addEventListener(eventName, () => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload =  () => {
        ctx.decodeAudioData(request.response, (audioBuffer) => {
            if(audioSource) {
                audioSource.disconnect();
                playCtx.close();
            }
            
            playCtx = new AudioContext();
            audioSource = playCtx.createBufferSource();
            audioSource.buffer = audioBuffer;
            audioSource.connect(playCtx.destination);
            
            audioSource.start();
        });
    }
    request.send();
});
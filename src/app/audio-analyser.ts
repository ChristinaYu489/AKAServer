export class AudioAnalyser {
    ctx;
    audio;
    audioSrc;
    analyser;
    frequencyData;
    isLoop;

    init(audioNativeElement) {
        this.ctx = new AudioContext();
        this.audio = audioNativeElement;
        this.audio.onplaying = ()=>{this.onStartListener()}
        this.audio.onended = ()=>{this.stopRender();};
        this.audioSrc = this.ctx.createMediaElementSource(this.audio);
        this.analyser = this.ctx.createAnalyser();
        this.audioSrc.connect(this.analyser);
        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
    }

    startRender() {
        this.isLoop = true;
        this.renderFrame();
        this.audio.play();
    }
    stopRender() {
        this.isLoop = false;
    }

    renderFrame() {
        if (!this.isLoop) {
            this.onEndedListener();
            return;
        }
        requestAnimationFrame(() => { this.renderFrame() });
        this.analyser.getByteFrequencyData(this.frequencyData);
        this.onDataCaptureListener(this.frequencyData);
    }

    onStartListener = () => {};
    setOnStartListener(listener) {
        this.onStartListener = listener;
    }

    onDataCaptureListener = (frequencyData) => {};
    setDataCaptureListener(listener) {
        this.onDataCaptureListener = listener;
    }

    onEndedListener = ()=>{};
    setOnEndedListener(listener) {
        this.onEndedListener = listener;
    }
}
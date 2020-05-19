declare type webkitSpeechRecognition = any;
declare var webkitSpeechRecognition: webkitSpeechRecognition;

declare type JQuery = any;
declare var $: JQuery;

export class SpeachRecognition {
    recognition;
    recognizing = false;
    scriptList = [];
    onCompleteListener;
    isError = false;
    onStartListener = () => { };
    constructor() {
        this.recognition = new webkitSpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = "en-US";
    }


    start(listener1 = () => { }, listener2 = (scripts = []) => { }) {
        this.onStartListener = listener1;
        this.onCompleteListener = listener2;
        try {
            this.recognition.onstart = () => {
                console.log("start");
                this.onStartListener();
                this.recognizing = true;
                this.scriptList = [];
            };

            this.recognition.onend = () => {
                if(this.isError) {
                    this.isError = false;
                    return;
                }
                console.log("end");
                this.recognizing = false;
                this.onCompleteListener(this.scriptList);
            }

            this.recognition.onerror = () => {
                console.log("error");
                this.isError = true;
                this.recognizing = false;
                this.recognition.stop();
            }

            this.recognition.onresult = (event) => {
                console.log("result");
                console.log(event);
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    this.scriptList.push(event.results[i][0].transcript.toLowerCase());
                    if (event.results[i].isFinal) {
                        this.recognition.stop();
                    }
                }
            }
            this.recognition.start();
        } catch {
            this.recognition.stop();
            this.recognition.start();
        }
    }

    stop() {
        this.recognition.stop();
    }
}

export const speachRecognition = new SpeachRecognition();
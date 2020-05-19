declare var mediaRecorderWrapper;

class UserMedia {
    isAccessed = false;
    constructor() {
    }

    hasGetUserMedia() {
        return !!(navigator.mediaDevices &&
            navigator.mediaDevices.getUserMedia);
    }

    accessMicrophone(f) {
        navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then((stream) => {
            this.isAccessed = true;
            console.log("access microphone");
            f(stream);
        });
    }

    accessWebcam(f, width = 320, height = 240, framerate = 30, ) {
        navigator.mediaDevices.getUserMedia({
            audio: true, video: {
                width: width,
                height: height,
                frameRate: framerate
            }
        }).then((stream) => {
            f(stream)
        });
    }

    getRecorder() {
        return mediaRecorderWrapper;
    }
}

export const userMedia = new UserMedia;
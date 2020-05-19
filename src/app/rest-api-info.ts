class RestApiInfo {
    private BASE_URL = "http://15.164.104.94:5000/api";
    private CHAT_BASE_URL = "https://bach-api.themusio.com/api";
    private BASIC_AUTH = 'Basic ZGVtbzpkZW1vMTIzNA==';
    
    getBaseURL() {
        return this.BASE_URL
    }

    getSignUpInfo() {
        return {
            url: this.BASE_URL+"/users",
            method: 'POST'
        }
    }

    getLoginInfo() {
        return {
            url: this.BASE_URL+"/auth/login",
            method: 'POST'
        }
    }

    getMeInfo() {
        return {
            url: this.BASE_URL+"/auth/me",
            method: 'GET'
        }
    }

    getQuizContentsInfo() {
        return {
            url: this.BASE_URL + "/quiz/generate",
            method: 'GET'
        }
    }

    getChatCreateSessionInfo() {
        return {
            url: this.CHAT_BASE_URL + "/pt/session/",
            method: 'POST',
            auth: this.BASIC_AUTH
        }
    }

    getChatSendMassegeInfo(turnId) {
        return {
            url: this.CHAT_BASE_URL + "/pt/turn/"+turnId+"/",
            method: 'PATCH',
            auth: this.BASIC_AUTH
        }
    }

    getChatTakeMessageInfo() {
        return {
            url: this.CHAT_BASE_URL + "/pt/turn/",
            method: 'POST',
            auth: this.BASIC_AUTH
        }
    }

    getChatSTTInfo() {
        return {
            url: 'https://muse-internal.themusio.com/api/voice/stt/',
            method: 'POST'
        }
    }
}
export const restApiInfo = new RestApiInfo;
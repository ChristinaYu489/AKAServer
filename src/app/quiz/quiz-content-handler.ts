class QuizContentHandler {
    user = {};

    init(userData) {
        this.user = userData;
        this.currentQuiz = [];
        this.nextQuizList = [];
    }

    getUserData() {
        return this.user;
    }

    quizList = [
        [
            { quiz: "q1_q1.mp3", answer: 2, answer_contents: ["A", "P", "K", "L", "T"] },
            { quiz: "q1_q2.mp3", answer: 2, answer_contents: ["M", "K", "J", "W", "P"] },
            { quiz: "q1_q3.mp3", answer: 4, answer_contents: ["S", "M", "N", "Y", "D"] },
            { quiz: "q1_q4.mp3", answer: 2, answer_contents: ["Q", "F", "G", "H", "R"] },
            { quiz: "q1_q5.mp3", answer: 4, answer_contents: ["M", "K", "J", "H", "P"] },
            { quiz: "q1_q6.mp3", answer: 3, answer_contents: ["C", "K", "J", "D", "Q"] },
            { quiz: "q1_q7.mp3", answer: 1, answer_contents: ["R", "Z", "M", "N", "P"] },
            { quiz: "q1_q8.mp3", answer: 5, answer_contents: ["R", "Y", "C", "Q", "T"] }
        ],
        [
            { quiz: "q2_q1.png", answer: 1, answer_contents: ["A", "P", "K", "L", "T"] },
            { quiz: "q2_q2.png", answer: 3, answer_contents: ["R", "Y", "C", "Q", "T"] },
            { quiz: "q2_q3.png", answer: 4, answer_contents: ["M", "K", "J", "H", "P"] },
            { quiz: "q2_q4.png", answer: 2, answer_contents: ["Z", "E", "K", "J", "O"] },
            { quiz: "q2_q5.png", answer: 4, answer_contents: ["Q", "F", "G", "H", "R"] },
            { quiz: "q2_q6.png", answer: 1, answer_contents: ["S", "M", "N", "Y", "D"] },
            { quiz: "q2_q7.png", answer: 5, answer_contents: ["C", "K", "J", "D", "Q"] },
            { quiz: "q2_q8.png", answer: 2, answer_contents: ["R", "Z", "M", "N", "P"] }
        ],
        [
            { quiz: "q3_q1.png", answer: ["apple"] },
            { quiz: "q3_q2.png", answer: ["green"] },
            { quiz: "q3_q3.png", answer: ["machine"] },
            { quiz: "q3_q4.png", answer: ["so cool", "school"] },
            { quiz: "q3_q5.png", answer: ["insect"] },
            { quiz: "q3_q6.png", answer: ["grape", "gray", "great"] },
            { quiz: "q3_q7.png", answer: ["orange"] },
            { quiz: "q3_q8.png", answer: ["blue"] }
        ],
        [
            { quiz: "q4_q1.png", answer: 3, answer_contents: ["Banana", "Watermelon", "Grape", "Orange"] },
            { quiz: "q4_q2.png", answer: 1, answer_contents: ["Blue", "Purple", "Yellow", "Green"] },
            { quiz: "q4_q3.png", answer: 2, answer_contents: ["Lion", "Chicken", "Dog", "Tiger"] },
            { quiz: "q4_q4.png", answer: 3, answer_contents: ["Needle", "Eraser", "Pencil", "Monitor"] },
            { quiz: "q4_q5.png", answer: 2, answer_contents: ["Red", "Purple", "Blue", "Black"] },
            { quiz: "q4_q6.png", answer: 2, answer_contents: ["Bird", "Bear", "Wolf", "Fox"] },
            { quiz: "q4_q7.png", answer: 4, answer_contents: ["Grape", "Orange", "Melon", "Apple"] },
            { quiz: "q4_q8.png", answer: 4, answer_contents: ["Light", "White", "Green", "Yellow"] }
        ],
        [
            { quiz: "q5_q1.mp3", answer: ["house"] },
            { quiz: "q5_q2.mp3", answer: ["computer"] },
            { quiz: "q5_q3.mp3", answer: ["morning"] },
            { quiz: "q5_q4.mp3", answer: ["afternoon"] },
            { quiz: "q5_q5.mp3", answer: ["clock"] },
            { quiz: "q5_q6.mp3", answer: ["read"] },
            { quiz: "q5_q7.mp3", answer: ["calendar"] },
            { quiz: "q5_q8.mp3", answer: ["television"] }
        ],
        [
            { quiz: "q6_q1.mp3", answer: 3, answer_contents: ["q6_a1_1.png", "q6_a1_2.png", "q6_a1_3.png", "q6_a1_4.png"]},
            { quiz: "q6_q2.mp3", answer: 3, answer_contents: ["q6_a2_1.png", "q6_a2_2.png", "q6_a2_3.png", "q6_a2_4.png"]},
            { quiz: "q6_q3.mp3", answer: 2, answer_contents: ["q6_a3_1.png", "q6_a3_2.png", "q6_a3_3.png", "q6_a3_4.png"]},
            { quiz: "q6_q4.mp3", answer: 3, answer_contents: ["q6_a4_1.png", "q6_a4_2.png", "q6_a4_3.png", "q6_a4_4.png"]},
            { quiz: "q6_q5.mp3", answer: 2, answer_contents: ["q6_a5_1.png", "q6_a5_2.png", "q6_a5_3.png", "q6_a5_4.png"]},
            { quiz: "q6_q6.mp3", answer: 1, answer_contents: ["q6_a6_1.png", "q6_a6_2.png", "q6_a6_3.png", "q6_a6_4.png"]},
            { quiz: "q6_q7.mp3", answer: 4, answer_contents: ["q6_a7_1.png", "q6_a7_2.png", "q6_a7_3.png", "q6_a7_4.png"]},
            { quiz: "q6_q8.mp3", answer: 4, answer_contents: ["q6_a8_1.png", "q6_a8_2.png", "q6_a8_3.png", "q6_a8_4.png"]}
        ],
        [
            { quiz: "How are you today?", answer: ["how are you today"] },
            { quiz: "Good Morning!", answer: ["good morning"] },
            { quiz: "What time is it", answer: ["what time is it"] },
            { quiz: "It was nice meeting you.", answer: ["it was nice meeting you"] },
            { quiz: "Do you have any plans?", answer: ["do you have any plans"] },
            { quiz: "What is your favorite sport?", answer: ["what is your favorite sports"] },
            { quiz: "When should we meet at the park?", answer: ["when should we meet at the park"] },
            { quiz: "How was everything?", answer: ["how was everything"] }
        ],
        [
            { quiz: "Nice to ______ you!", answer:2, answer_contents: ["Meeting", "Meet", "Meat", "Met"] },
            { quiz: "How are you ______ ?", answer:1, answer_contents: ["Today", "Tomorrow", "Next week", "Yesterday"] },
            { quiz: "______ to the music!", answer:3, answer_contents: ["Watch", "See", "Listen", "Taste"] },
            { quiz: "I am ______ a book about Einstein.", answer:4, answer_contents: ["Sleeping", "Playing", "Listening", "Reading"] },
            { quiz: "______ should i do for homework?", answer:2, answer_contents: ["Where", "What", "While", "Who"] },
            { quiz: "I'm ______ than you", answer:4, answer_contents: ["Writer", "Printer", "Fighter", "Stronger"] },
            { quiz: "When i ______ up, i want to be a doctor.", answer:1, answer_contents: ["Grow", "Grew", "Growing", "Grows"] },
            { quiz: "______ games are fun, but it's not healthy.", answer:2, answer_contents: ["Going", "Playing", "Listening", "Reading"] }
        ],
        [
            { quiz: "q9_q1.mp3", answer:"my hobby is playing soccer . ", answer_contents: ["my", "Soccer", "is", "hobby", "playing", "."] },
            { quiz: "q9_q2.mp3", answer:"the weather is warm outside . ", answer_contents: ["weather", "warm", "is", "the", "outside", "."] },
            { quiz: "q9_q3.mp3", answer:"go straight and turn left . ", answer_contents: ["turn", "and", "straight", ".", "go", "left"] },
            { quiz: "q9_q4.mp3", answer:"there are eleven books in the bookshelf. ", answer_contents: ["are", "eleven", "there", "books", "the", "bookshelf.", "in"] },
            { quiz: "q9_q5.mp3", answer:"my favorite fruit is watermelon . ", answer_contents: ["fruit", "my", ".", "favorite", "watermelon", "is"] },
            { quiz: "q9_q6.mp3", answer:"how much is this computer monitor ? ", answer_contents: ["this", "is", "monitor", "much", "how", "computer", "?"] },
            { quiz: "q9_q7.mp3", answer:"when did dinosaurs live on the earth? ", answer_contents: ["dinosaurs", "live", "earth?", "on", "the", "when", "did"] },
            { quiz: "q9_q8.mp3", answer:"when should we meet at ? ", answer_contents: ["meet", "when", "should", "we", "at", "?"] }
        ],
        [
            { quiz: "q10_q1.mp3", answer:2, answer_contents: ["Who are you?", "Nice to meet you too!", "Let's have dinner tonight.", "How is everything?"] },
            { quiz: "q10_q2.mp3", answer: 3, answer_contents: ["What is it", "I don't think so", "Strawberries are my favorite.", "How can i help you?"] },
            { quiz: "q10_q3.mp3", answer: 4, answer_contents: ["I want to play rugby.", "What should i do?", "I want to be a soccer player", "I like basketball"] },
            { quiz: "q10_q4.mp3", answer: 1, answer_contents: ["To school.", "Let's go to school.", "Help me!", "How interesting!"] },
            { quiz: "q10_q5.mp3", answer: 2, answer_contents: ["Time is money.", "It's four o'clock.", "I need to leave soon.", "Long time, no see."] },
            { quiz: "q10_q6.mp3", answer:3, answer_contents: ["How do you think about it?", "I like sunny days.", "It's raining right now.", "I have to go now."] },
            { quiz: "q10_q7.mp3", answer: 1, answer_contents: ["I want green.", "Here it is.", "How do you think?", "Green socks."] },
            { quiz: "q10_q8.mp3", answer:2, answer_contents: ["How do you think?", "How can i help you?", "I should help someone.", "I don't think so."] }
        ]
    ]

    quizLevel = 1;
    onLevelChangedListener = (level)=>{};
    setLevel(level) {
        this.quizLevel = level;
        this.onLevelChangedListener(level);
    }

    setOnLevelChangedListener(listener) {
        this.onLevelChangedListener = listener;
    }

    nextQuizList = [];
    currentQuiz = {};
    onCurrentQuizChangedListener = (quiz)=>{};
    setOnQuizChangedListener(listener) {
        this.onCurrentQuizChangedListener = listener;
    }
    generateQuizList(quizLevel = this.quizLevel) {
        let tempQuizStack = [...this.quizList[quizLevel-1]];
        let quizStack = [];
        for(let i=0; i<5; i++) {
            let randomIndex = Number(Math.random() * quizStack.length);
            let item = tempQuizStack.splice(randomIndex, 1)[0];
            quizStack.push(item);
        }
        this.nextQuizList = quizStack;
        this.currentQuiz = this.nextQuizList.pop();
        this.onCurrentQuizChangedListener(this.currentQuiz);
    }

    quizPass() {
        if(this.nextQuizList.length==0) {
            return false;
        }
        this.currentQuiz = this.nextQuizList.pop();
        this.onCurrentQuizChangedListener(this.currentQuiz);
        return true;
    }

    myAnswers;

    initMyAnswers() {
        this.myAnswers = [];
    }

    submitAnswer(data) {
        let myAnswer = { "answer": data, "quiz": this.currentQuiz };
        let indexA = this.quizLevel - 1;
        let indexB = 4-this.nextQuizList.length;
        if(this.myAnswers == undefined) this.myAnswers = [];
        if(this.myAnswers[indexA] == undefined) this.myAnswers[indexA] = [];
        if(this.myAnswers[indexA][indexB] == undefined) this.myAnswers[indexA][indexB] = {};
        this.myAnswers[indexA][indexB] = myAnswer;
    }

    getMyAnswers() {
        return this.myAnswers;
    }
}

export let quizContentHandler = new QuizContentHandler();
export default class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.timer = null;
    this.timeLimit = 30;
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
}

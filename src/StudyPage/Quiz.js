import React, { Component } from "react";
// import questionsJson from './questions.json' //todo: dummy for now
import "./Quiz.css";
import M from "materialize-css";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currQuestion: {},
      currIndex: 0,
      score: 0,
      quizFinished: false,
      onLoading: true,
      onReady: false,
    };
    this.userAnswered = this.userAnswered.bind(this);
  }

  async componentDidMount() {
    // need to find a better way other than fetch (axios/ajax)
    const response = await fetch(`/v1/questions/?chapterId=${encodeURIComponent(this.props.chapterId)}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const body = await response.json();
    this.setState({
      questions: body,
      currQuestion: body[0],
      onLoading: false,
    });
  }

  userAnswered(event) {
    const { currQuestion, currIndex, questions, score } = this.state;

    if (event.target.innerHTML === currQuestion.answers[0]) {
      this.setState({
        score: score + 1,
      });
      M.toast({
        html: "Correct Answer !",
        classes: "toast-correct",
        displayLength: 1000,
      });
    } else {
      M.toast({
        html: "Wrong Answer !",
        classes: "toast-wrong",
        displayLength: 1000,
      });
    }

    const nextIndex = currIndex + 1;
    if (nextIndex >= questions.length) {
      this.setState({
        quizFinished: true,
      });
    } else {
      this.setState({
        currQuestion: questions[nextIndex],
        currIndex: nextIndex,
      });
    }
  }

  render() {
    const { currQuestion, quizFinished, score, onLoading } = this.state;
    if (quizFinished) {
      return (
        <div className="quiz-container">
          <h5>Quiz is finished</h5>
          <h3>Score: {score}</h3>
        </div>
      );
    }
    if (onLoading) {
      return (
        <div className="quiz-container">
          <h5>Fetching data. Please wait...</h5>
        </div>
      );
    }

    return (
      <div className="quiz-container">
        <h5>{currQuestion.question.question}</h5>
        <div className="choices-container">
          <p onClick={this.userAnswered} className="choice">
            {currQuestion.question.optionA}
          </p>
          <p onClick={this.userAnswered} className="choice">
            {currQuestion.question.optionB}
          </p>
        </div>
        <div className="choices-container">
          <p onClick={this.userAnswered} className="choice">
            {currQuestion.question.optionC}
          </p>
          <p onClick={this.userAnswered} className="choice">
            {currQuestion.question.optionD}
          </p>
        </div>

        <div className="navigation-container">
          <button>Previous</button>
          <button>Next</button>
          <button>Save and Quit</button>
        </div>
      </div>
    );
  }
}

export default Quiz;

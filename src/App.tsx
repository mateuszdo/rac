import React, {useState} from 'react'; 
import './App.css';
import QuestionCard from './components/QuestionCard';
import { fetchQuestions, Difficulty, QuestionState } from './API';
import { GlobalStyle, Wrapper } from './App.styles';
//styles


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}




const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState(0);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const TOTAL_QUESTIONS = 10;

  const startTrivia = async() => {
    setIsLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setIsLoading(false); 
  }
  
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver) {
      // user's answer
      const answer = e.currentTarget.innerText;
      console.log(e);
      
      console.log(answer);
      // correct answer
      const correct = questions[number].correct_answer === answer;
      // add score if answer is correct
      if(correct) {
        setScore(prev => prev + 1)
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer 
      }
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  }
  
  const nextQuestion = () => {
    const nextQ = number + 1;
    if(nextQ === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQ);
    }

  }


  

  
  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <h1>React Quiz</h1>
      {gameOver && <button className="start" onClick={startTrivia}>Start</button>}
      {!gameOver && !isLoading && <p className="score">Score: {score}</p>}
      {isLoading && <div>Loading...</div>}
      {!isLoading && !gameOver &&
        <QuestionCard 
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      }
      {!gameOver && !isLoading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS -1 &&
      <button className="next" onClick={nextQuestion}>Next Question</button>}
    </Wrapper>
    </>
  );
}

export default App;

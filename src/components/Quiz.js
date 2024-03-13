import React, { useEffect, useState } from 'react';
import "./Quiz.css";
import QuestionData from "./question.json";

const Quiz = () => {
  
  const[currentQn, setCurrentQn] = useState(0);
  const[score, setScore] = useState(0);
  const[showScore, setShowScore] = useState(false);
  const[timer, setTimer] = useState(10);

  useEffect(()=>{
    let interval;
    if(timer > 0 && !showScore){
      interval = setInterval(() =>{
        setTimer((prevTimer) => prevTimer-1);
      },1000)
    }
    else{
      clearInterval(interval);
      setShowScore(true);
    }

    return ()=> clearInterval(interval);
  },[timer,showScore]);

  const handleAnswerClick = (selectedOption) =>{
    if(selectedOption === QuestionData[currentQn].correctOption){
      setScore((prevScore) => prevScore+1);
    }

    if(currentQn < QuestionData.length-1){
      setCurrentQn((prevQn) => prevQn+1);
      setTimer(10);
    }
    else{
      setShowScore(true);
    }
  }

  const handleRestartQuiz = () =>{
    setCurrentQn(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
  }

  return (
    <>
    <div className='quiz-container'>
      {showScore ?(
        <div className='score-container' >
          <h2>Your Score : {score}/{QuestionData.length}</h2>
          <button onClick={()=>handleRestartQuiz()}>Restart</button>
        </div>
      ) :(
        <div className='question-container' >
            <h2>Question {currentQn+1}</h2>
            <p>{QuestionData[currentQn].question}</p>
            <div className='option'>
                {QuestionData[currentQn].options.map((option,index) => (<button key={index} onClick={()=>handleAnswerClick(option)}>{option}</button>))}
            </div>
            <div className='timer'>Time Left: <span>{timer}s</span></div>
        </div>
      )}
        
        

        
    </div>
    </>
  )
}

export default Quiz
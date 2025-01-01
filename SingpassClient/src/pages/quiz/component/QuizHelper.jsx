import Countdown from 'react-countdown';
import React, { useMemo } from 'react';
import { MdOutlineTimer } from 'react-icons/md';

const rendererCountDown = ({ hours, minutes, seconds }) => {
    return (
      <>
        <span
          className="text-primary font- bg-opacity-5 p-2 rounded-xl cursor-pointer"
          disabled>
          {hours < 10 ? `0${hours}` : hours}:
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
      </>
    );
};

export default function QuizHelper({
  indexQuestion,
  setIndexQuestion,
  quizList,
  isSubmit,
  onOpen,
  handleSubmitQuiz
}) {
  const durationFromStore = sessionStorage.getItem('duration');
  const calcDurationQuiz = useMemo(() => {
    // Split the duration string into hours, minutes, and seconds
    const [hours, minutes, seconds] = durationFromStore.split(':').map(Number);
    // Calculate the total duration in milliseconds
    const totalMilliseconds =
      hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
    // Get the current date and time
    const now = new Date();

    // Create a new date by adding the total milliseconds
    const futureDate = new Date(now.getTime() + totalMilliseconds);

    return futureDate;
  }, [durationFromStore]);

  return (
    <div className="w-1/4 bg-white rounded-lg flex flex-col h-fit">
      <h2 className=" text-center py-2 rounded-lg bg-gradient-primary text-white text-primary font-bold text-xl">
        Danh sách câu hỏi
      </h2>

      <div className="mt-[30px]">
        <div className="justify-center bg-white bg-primary rounded-lg flex items-center ">
          {!isSubmit && (
            <>
              <MdOutlineTimer fontSize={24} />
              <Countdown
                key={indexQuestion} 
                date={calcDurationQuiz}
                renderer={rendererCountDown}
                onComplete={handleSubmitQuiz}
              />
            </>
          )}
        </div>
      </div>

      <div>
        <div className="rounded-lg mt-2 grid grid-cols-10 text-center p-4 gap-4">
          {quizList.length > 0 &&
            quizList.map((_, index) => (
              <span
                onClick={() => setIndexQuestion(index)}
                key={index}
                className={`d-flex items-center justify-center cursor-pointer w-7 h-7 text-lg rounded-full ${
                  indexQuestion === index
                    ? 'bg-gradient-primary text-white'
                    : 'bg-white text-primary'
                }`}>
                {index + 1}
              </span>
            ))}
        </div>
      </div>

      <div className="mx-auto mb-5">
        <button
          onClick={() => onOpen()}
          className="mt-10 text-xl bg-gradient-primary text-white py-2 px-8  rounded-xl cursor-pointer">
          Nộp bài
        </button>
      </div>
    </div>
  );
}

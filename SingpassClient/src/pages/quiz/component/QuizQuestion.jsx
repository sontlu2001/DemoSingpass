import { FaAngleRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import _ from 'lodash';

export default function QuizQuestion({
  question,
  indexQuestion,
  handleNextQuestion,
  handlePrevQuestion,
  hiddenNextQuestion,
  hiddenPrevQuestion,
  setAnswers,
  answers,
}) {
  const idQuestion = question?.id;

  if (_.isEmpty(question)) return <></>;

  const handleChooseAnswer = (value) => {
    setAnswers((prev) => {
      return {
        ...prev,
        [idQuestion]: value,
      };
    });
  };
  

  return (
    <div className="w-4/6 z-10 px-10 py- shadow-lg rounded-xl text-center">
      <p className="z-10 text-center py-5 px-4 text-xl font-semibold mb-4 bg-white text-primary rounded-full">
        Câu {indexQuestion + 1}: {question?.title}
      </p>

      <div className=" px-20 relative cursor-pointer flex flex-col gap-4 text-left">
        {question?.option_a && (
          <p
            onClick={() => handleChooseAnswer('A')}
            className={`px-2 py-4 border pl-4 rounded-full hover:bg-gradient-primary hover:text-white hover:font-semibold 
            ${
              answers[idQuestion] === 'A'
                ? 'bg-gradient-primary text-white font-semibold'
                : 'bg-white '
            }`}>
            {question?.option_a}
          </p>
        )}

        {question?.option_b && (
          <p
            onClick={() => handleChooseAnswer('B')}
            className={`px-2 py-4 pl-4 rounded-full border hover:bg-gradient-primary hover:text-white hover:font-semibold
            ${
              answers[idQuestion] === 'B'
                ? 'bg-gradient-primary text-white font-semibold'
                : 'bg-white '
            }`}>
            {question?.option_b}
          </p>
        )}

        {question?.option_c && (
          <p
            onClick={() => handleChooseAnswer('C')}
            className={`px-2 py-4 pl-4 rounded-full border hover:bg-gradient-primary hover:text-white hover:font-semibold
            ${
              answers[idQuestion] === 'C'
                ? 'bg-gradient-primary text-white font-semibold'
                : 'bg-white'
            }`}>
            {question?.option_c}
          </p>
        )}

        {question?.option_d && (
          <p
            onClick={() => handleChooseAnswer('D')}
            className={`px-2 py-4 pl-4 rounded-full border hover:bg-gradient-primary hover:text-white hover:font-semibold first-letter
            ${
              answers[idQuestion] === 'D'
                ? 'bg-gradient-primary text-white font-semibold'
                : 'bg-white'
            }`}>
            {question?.option_d}
          </p>
        )}

        {!hiddenNextQuestion && (
          <button
            onClick={() => handleNextQuestion()}
            className="absolute -translate-y-1/2 top-1/2 right-0 w-8 h-8 flex items-center rounded-full shadow-xl bg-white text-center hover:bg-gradient-primary hover:text-white">
            <FaChevronRight className="flex-1" />
          </button>
        )}

        {!hiddenPrevQuestion && (
          <button
            onClick={() => handlePrevQuestion()}
            className="absolute center -translate-y-1/2 top-1/2 left-0 w-8 h-8 flex items-center rounded-full shadow-xl bg-white hover:bg-gradient-primary hover:text-white">
            <FaChevronLeft className="flex-1" />
          </button>
        )}
      </div>
    </div>
  );
}

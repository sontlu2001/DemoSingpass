import { FaAngleRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import _ from 'lodash';
import OptionResult from './OptionResult';

export default function QuestionResult({
  quizResultDetail,
  indexQuestion,
  handleNextQuestion,
  handlePrevQuestion,
  hiddenNextQuestion,
  hiddenPrevQuestion,
}) {
  const { question } = quizResultDetail;

  return (
    <div className="w-4/6 z-10 px-10 py- shadow-lg rounded-xl text-center">
      <p className="z-10 px-3 text-center py-5 font-medium text-2xl mb-4 bg-white text-primary rounded-full">
        Câu {indexQuestion + 1}: {question?.title}
      </p>

      <div className="px-32 relative ml-3 cursor-pointer flex flex-col gap-4 text-left">
        <OptionResult
          option={question?.option_a}
          label="A"
          quizResultDetail={quizResultDetail}
        />
        <OptionResult
          option={question?.option_b}
          label="B"
          quizResultDetail={quizResultDetail}
        />
        <OptionResult
          option={question?.option_c}
          label="C"
          quizResultDetail={quizResultDetail}
        />
        <OptionResult
          option={question?.option_d}
          label="D"
          quizResultDetail={quizResultDetail}
        />

        {!hiddenNextQuestion && (
          <button
            onClick={handleNextQuestion}
            className="absolute top-1/2 right-0 w-8 h-8 flex items-center rounded-full shadow-xl bg-white text-center hover:bg-gradient-primary hover:text-white">
            <FaChevronRight className="flex-1" />
          </button>
        )}

        {!hiddenPrevQuestion && (
          <button
            onClick={() => handlePrevQuestion()}
            className="absolute center top-1/2 left-0 w-8 h-8 flex items-center rounded-full shadow-xl bg-white hover:bg-gradient-primary hover:text-white">
            <FaChevronLeft className="flex-1" />
          </button>
        )}
      </div>
    </div>
  );
}

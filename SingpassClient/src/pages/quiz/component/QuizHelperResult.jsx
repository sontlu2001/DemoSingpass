export default function QuizHelper({
  indexQuestion,
  setIndexQuestion,
  quizList,
}) {

  const isCorrect = (quizDetail) => {
    return quizDetail.question.correct_answer === quizDetail.answer;
  };

  const isCorrectSelectedItem = (quizDetail, index) => {
    return (
      quizDetail.question.correct_answer === quizDetail.answer &&
      index === indexQuestion
    );
  };

  const isWrongSelectedItem = (quizDetail, index) => {
    return (
      quizDetail.question.correct_answer !== quizDetail.answer &&
      index === indexQuestion
    );
  };

  return (
    <div className="w-1/4 flex flex-col justify-between">
      <div className=" bg-white rounded-lg flex flex-col h-fit">
        <h2 className=" text-center py-2 rounded-lg bg-gradient-primary text-white text-primary font-bold text-xl">
          Danh sách câu hỏi
        </h2>

        <div>
          <div className="max-h-[295px] overflow-y-auto rounded-lg mt-2 grid grid-cols-10 text-center p-4 gap-4">
            {quizList.length > 0 &&
              quizList.map((quizDetail, index) => (
                <span
                  onClick={() => setIndexQuestion(index)}
                  key={index}
                  className={`d-flex items-center justify-center cursor-pointer w-7 h-7 text-lg rounded-full ${
                    isCorrect(quizDetail) ? 'text-correct' : 'text-wrong'
                  }
                  ${
                    isCorrectSelectedItem(quizDetail, index)
                      ? 'text-white bg-correct'
                      : isWrongSelectedItem(quizDetail, index)
                      ? 'text-white bg-wrong'
                      : ''
                  }
                  `}>
                  {index + 1}
                </span>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-5 bg-white rounded-lg flex flex-col h-fit">
        <h2 className=" text-center py-2 rounded-lg bg-gradient-primary text-white text-primary font-bold text-xl">
        Giải thích
        </h2>

        <p className="p-4 text-center">
          {quizList[indexQuestion]?.question?.explanation
            ? quizList[indexQuestion].question.explanation
            : 'Chưa có giải thích cho câu hỏi này'}
        </p>
      </div>
    </div>
  );
}

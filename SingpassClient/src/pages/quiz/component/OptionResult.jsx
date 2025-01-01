export default function OptionResult({ option, label, quizResultDetail }) {
  if (!option) return null;

  const isCorrect = quizResultDetail.question?.correct_answer === label;
  const isWrong = quizResultDetail?.answer === label && !isCorrect;

  return (
    <p
      className={`px-2 py-4 rounded-full border pl-4 ${
        isCorrect
          ? 'bg-correct text-white font-semibold'
          : isWrong
          ? 'bg-wrong text-white font-semibold'
          : 'bg-white'
      }`}>
      {option}
    </p>
  );
}

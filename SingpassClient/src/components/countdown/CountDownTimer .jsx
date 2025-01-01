import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';

export default function CountDownTimer({ startDate, quizId, duration }) {
  const navigate = useNavigate();

  const handleNavigateQuiz = () => {
    sessionStorage.setItem('duration', duration);
    navigate(`/quiz/${quizId}`);
  };

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return (
        <button
          onClick={handleNavigateQuiz}
          className="bg-gradient-primary text-white p-2 rounded-xl mt-2 cursor-pointer">
          Bắt đầu thi
        </button>
      );
    } else {
      // Render a countdown
      return (
        <>
          <span>Bắt đầu sau:</span>
          <span
            className="text-primary bg-opacity-5  p-2 rounded-xl cursor-pointer"
            disabled>
            {hours < 10 ? `0${hours}` : hours}:
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </>
      );
    }
  };

  return <Countdown date={new Date(startDate)} renderer={renderer} />;
}

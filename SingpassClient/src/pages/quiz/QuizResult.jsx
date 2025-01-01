import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../apis/httpClient';
import QuestionResult from './component/QuestionResult';
import QuizHelperResult from './component/QuizHelperResult';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function QuizResult(params) {
  const { quizId } = useParams();
  const [quizList, setQuizList] = useState([]);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get(`/quiz-result/${quizId}`);
        if (!res.data.data) {
          console.log('No data found');
          return;
        }
        setQuizList(res?.data?.data);
      } catch (error) {
        if(error.response.status === 401){
          navigate('/');
          toast.error('Bạn không thể xem kết quả bài thi này');
          return;
        }
        console.error(error);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleNextQuestion = () => {
    setIndexQuestion(indexQuestion + 1);
  };

  const handlePrevQuestion = () => {
    setIndexQuestion(indexQuestion - 1);
  };

  return (
    <div className="flex justify-center pt-20 gap-8">
    <QuestionResult
        handleNextQuestion={handleNextQuestion}
        handlePrevQuestion={handlePrevQuestion}
        hiddenNextQuestion={indexQuestion === quizList.length - 1}
        hiddenPrevQuestion={indexQuestion === 0}
        indexQuestion={indexQuestion}
        quizResultDetail={quizList.length > 0 ? quizList[indexQuestion] : {}}
      />
       <QuizHelperResult
        quizList={quizList}
        indexQuestion={indexQuestion}
        setIndexQuestion={setIndexQuestion}
      />
    </div>
  );
}

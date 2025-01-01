import QuizItem from "./QuizItem";

export default function QuizList({data}) {
  return (
    <div className="bg-primary-background bg-cover h-screen">
    <h2 className="text-center text-3xl font-semibold text-white py-9">Danh sách bài thi</h2>
     <div className="flex items-center justify-center">
      <div className="grid grid-cols-3 gap-9 justify-center">
        {
          data && data?.data?.data?.map((quiz) => (
            <QuizItem key={quiz.id} data={quiz} />
          ))
        }
      </div>
    </div>
    </div>
   
  );
}

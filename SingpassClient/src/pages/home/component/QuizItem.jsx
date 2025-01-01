import CountDownTimer from '../../../components/countdown/CountDownTimer ';

const { VITE_STRAPI_BASE_URL_UPLOAD } = import.meta.env;

export default function QuizItem(props) {
  const { id, name, description, start_date, duration, image } = props.data;

  return (
    <div className="p-6 shadow-lg inline-block rounded-xl bg-white z-10">
      <div className="w-[240px]">
        <img
          className="object-cover w-full h-full"
          src={
            image
              ? VITE_STRAPI_BASE_URL_UPLOAD + image?.url
              : 'https://www.servermania.com/kb/images/f_webp,q_auto:best/v1689362113/kb/Featured-3/Featured-3.png?_i=AA'
          }
          alt=""
        />
      </div>
      <h3 className="mt-3 font-semibold text-xl">{name}</h3>
      <p>Mô tả: {description || ''}</p>
      <p>
        Thời gian: <strong> {duration.slice(0, -3)}</strong> phút
      </p>

      <CountDownTimer startDate={start_date} quizId={id} duration={duration} />
    </div>
  );
}

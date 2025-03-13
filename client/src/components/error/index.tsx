type Props = {
  info: string;
  refetch?: () => void;
};

const Error = ({ info, refetch }: Props) => {
  return (
    <div className=" h-screen bg-gray-200  grid place-items-center">
      <div className="bg-red-400 px-20 py-12 rounded-md grid  ">
        <p className="text-2xl text-gray-600 ">
          {info || "Üzgünüz bir hata oluştu"} <span className="font-bold">:(</span>
        </p>
        <button
          onClick={refetch}
          className="bg-slate-100 px-2 py-2 rounded-md mt-10 hover:bg-gray-400 transition hover:text-white "
        >
          Tekrar Dene
        </button>
      </div>
    </div>
  );
};

export default Error;

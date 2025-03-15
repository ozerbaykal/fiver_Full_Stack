type ExtendedError = {
  response?: {
    data?: {
      message?: string;
    };
  };
} & Error;

type Props = {
  info?: ExtendedError;

  refetch?: () => void;
};

const Error = ({ info, refetch }: Props) => {
  console.log(info);
  return (info as ExtendedError)?.response?.data?.message === "Hiç bir hizmet bulunamadı" ? (
    <div className="flex justify-center align-items-center">
      <div className="bg-orange-500/80 py-10 rounded-md px-5 text-white font-semibold text-center text-lg my-20 md:w-1/2 lg:w-2/3  ">
        <h2>Aradığız Koşullara uygun bir hizmet bulunamadı.</h2>
      </div>
    </div>
  ) : (
    <div className=" h-screen bg-gray-200  grid place-items-center">
      <div className="bg-red-400 px-20 py-12 rounded-md grid gap-4   ">
        <p className="text-2xl text-gray-600 ">
          {info?.message || "Üzgünüz bir hata oluştu"} <span className="font-bold">:(</span>
        </p>
        <p>Lütfen daha sonra tekrar deneyin</p>
        <button
          onClick={refetch}
          className="bg-slate-100 px-2 py-2 rounded-md mt-5 hover:bg-gray-400 transition hover:text-white "
        >
          Tekrar Dene
        </button>
      </div>
    </div>
  );
};

export default Error;

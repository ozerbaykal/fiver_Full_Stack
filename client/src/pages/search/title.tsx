type Props = {
  query: string | null;
  category: string | null;
};

const Title = ({ query, category }: Props) => {
  return (
    <div>
      <h1>
        {query ? (
          <p>
            {" "}
            <span className="font-bold items-center text-xl">{query}</span> için arama sonuçları
          </p>
        ) : (
          <p className="items-center">
            <span className="font-bold text-xl  ">{category}</span> categorisi için arama sonuçları
          </p>
        )}
      </h1>
    </div>
  );
};

export default Title;

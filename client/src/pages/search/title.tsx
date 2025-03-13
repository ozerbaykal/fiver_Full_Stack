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
            <span className="font-bold text-3xl">{query}</span> için arama sonuçları
          </p>
        ) : (
          <p>
            <span className="font-bold ">{category}</span> categorisi için arama sonuçları
          </p>
        )}
      </h1>
    </div>
  );
};

export default Title;

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import api from "../../api";
import Title from "./title";
import Loader from "../../components/loader/loader";
import Error from "../../components/error";

const Search = () => {
  // url den parametreleri al

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const category = searchParams.get("category");

  //api 'ye gönderelicek parametreleri oluştur
  const params = {
    category,
    search: query,
  };
  console.log(params);

  //apiden verileri al
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", params],
    queryFn: () =>
      api
        .get("/gigs", {
          params,
        })
        .then((res) => res.data.gigs),
  });
  return (
    <div>
      <Title query={query} category={category} />

      {isLoading ? (
        <Loader designs="my-20" />
      ) : error ? (
        <Error info={error.message} refetch={refetch} />
      ) : (
        <div>{data}</div>
      )}
    </div>
  );
};

export default Search;

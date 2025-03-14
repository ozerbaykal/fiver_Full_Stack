import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "../../api";
import Loader from "../../components/loader/loader";
import Error from "../../components/error";
import GigInfo from "./gigInfo";
import UserInfo from "./userInfo";
import PackageInfo from "./packageInfo";
import { IGigDetail } from "../../types";
import BreadCrumb from "./breadCrumb";

const Detail = () => {
  const { id } = useParams();

  const { isLoading, error, data, refetch } = useQuery<IGigDetail>({
    queryKey: ["gig"],
    queryFn: () => api.get(`/gigs/${id}`).then((res) => res.data.gig),
  });
  console.log(data);
  return (
    <div>
      {isLoading ? (
        <Loader designs="my-20 " />
      ) : error ? (
        <Error info={error.message} refetch={refetch} />
      ) : (
        data && (
          <div className="flex flex-col lg:flex-row gap-10 ">
            <div>
              <BreadCrumb category={data.category} />
              <GigInfo gig={data} />
              <UserInfo user={data.user} />
            </div>
            <PackageInfo data={data} />
          </div>
        )
      )}
    </div>
  );
};

export default Detail;

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "../../api";
import Loader from "../../components/loader/loader";
import Error from "../../components/error";
import GigInfo from "./gigInfo";
import UserInfo from "./userInfo";
import PackageInfo from "./packageInfo";
import { IGig } from "../../types";
import BreadCrumb from "./breadCrumb";

const Detail = () => {
  const { id } = useParams();

  const { isLoading, error, data, refetch } = useQuery<IGig>({
    queryKey: ["gig"],
    queryFn: () => api.get(`/gigs/${id}`).then((res) => res.data.gig),
  });

  return (
    <div>
      {isLoading ? (
        <Loader designs="my-20 " />
      ) : error ? (
        <Error info={error.message} refetch={refetch} />
      ) : (
        data && (
          <div className="flex flex-col lg:flex-row gap-10">
            <div>
              <BreadCrumb category={data.category} />
              <GigInfo gig={data} />
              <UserInfo />
            </div>
            <PackageInfo />
          </div>
        )
      )}
    </div>
  );
};

export default Detail;

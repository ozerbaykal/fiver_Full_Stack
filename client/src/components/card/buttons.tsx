import { useMutation } from "@tanstack/react-query";
import { IGig } from "../../types";
import api from "../../api";

type Props = {
  item: IGig;
};

const Buttons = ({ item }: Props) => {
  const { mutate, isPending } = useMutation({
    mutationFn: () => api.delete(`/gigs/${item._id}`),
  });
  return (
    <div className="flex justify-between ">
      <button className="button bg-blue-400">Düzenle</button>
      <button
        className="button bg-red-400"
        disabled={isPending}
        onClick={() => {
          if (confirm("Silmeyi onaylıyor musunuz ?")) mutate();
        }}
      >
        Sil
      </button>
    </div>
  );
};

export default Buttons;

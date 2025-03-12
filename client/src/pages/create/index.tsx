import Input from "../../components/input";
import Select from "../../components/input/select";
import { categories, inputs } from "../../utils/constants";

const Create = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl mb-5">Hizmet Oluştur</h1>
      <form>
        <div className="grid  grid-cols-1 md:grid-cols-2 gap-x-10">
          {inputs.map((props, key) => (
            <Input key={key} {...props} />
          ))}
          <Select label="Kategori" options={categories} name="category" />
        </div>
        <div className="flex md:justify-center my-5">
          <button className="bg-green-500 px-6 py-2 rounded-md text-white hover:bg-green-600 max-md:w-full w-1/2">
            Oluştur
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;

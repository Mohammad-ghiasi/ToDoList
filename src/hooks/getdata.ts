import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";


export const useGetData = (url: string) => {
  const { data, isPending, error, isError } = useQuery({
    queryKey: ["todos", url],

    queryFn: async (): Promise<any> => {
      let address: string = url;

      const datas = await axios
        .get(address)
        .then((res: AxiosResponse) => {
          return res.data;
        });
      return datas;
    },
    // impoertant part... (chnaging data type)
    select: (datas) => {

      return datas.todos;
    },
  });
  return { data, isPending, error, isError };
};

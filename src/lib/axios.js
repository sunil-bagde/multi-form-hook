import axios from "axios";
import useSWRBase from "swr";
const fetcher = (url) => axios.get(url).then((res) => res.data);


function useSwr(api) {
  const { data, error , mutate } = useSWRBase(api, fetcher);
  return { data, error, mutate};
}
export { axios, useSwr };

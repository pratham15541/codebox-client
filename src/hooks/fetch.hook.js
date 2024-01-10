import axios from "axios";
import { useEffect, useState } from "react";
import { getUsernameFromToken } from "../helpers/helper";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

export default function useFetch(query) {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {

    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));

        const {username} = !query ?  getUsernameFromToken(): ''; 

        const { data, status } = (query) ? await axios.get(`/api${query}`): await axios.get(`/api/user/${username}`);

        if (status == 200) {
          setData((prev) => ({
            ...prev,
            isLoading: false,
            apiData: data,
            status: status,
          }));
        }

        setData((prev) => ({ ...prev, isLoading: false }));
      } catch (error) {
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
      }
    };
    fetchData();
  }, [query]);

  return [getData, setData];
}

import axios, { AxiosError } from "axios";

const fetcher = async (url: string, headers = {}) => {
  try {
    const results = await (
      await axios.get(url, { headers, withCredentials: true })
    ).data;

    return { results };
  } catch (err: any) {
    return { error: err.message, errorStatus: err.response.status };
  }
};

export default fetcher;

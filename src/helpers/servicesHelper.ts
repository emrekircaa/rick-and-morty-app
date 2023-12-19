import ax, { AxiosResponse } from "axios";

export const axios = ax.create({
  baseURL: "https://rickandmortyapi.com/api/",
  headers: {
    "Content-type": "application/json",
  },
});

class APIClient {
  get = async <T>(url: string, params?: any): Promise<AxiosResponse<T>> => {
    let response;

    try {
      const paramKeys: string[] = [];

      if (params) {
        Object.keys(params).forEach((key) => {
          if (
            params[key] &&
            params[key] !== null &&
            params[key] !== undefined
          ) {
            paramKeys.push(`${key}=${params[key]}`);
          }
        });

        const queryString =
          paramKeys && paramKeys.length ? paramKeys.join("&") : "";
        response = await axios.get<T>(`${url}?${queryString}`, params);
      } else {
        response = await axios.get<T>(url, params);
      }

      return response;
    } catch (error) {
      // Hata durumlarına karşı gerekli işlemleri burada yapabilirsiniz
      console.error("Error in API request:", error);
      throw error;
    }
  };
}

axios.interceptors.response.use(
  function (response: any) {
    return response.data ? response.data : response;
  },
  function (err: any) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    console.log("err", err, err.status, err.response);
    switch (err?.response?.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:

      case 403:
      case 409:
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = err;
    }
    return Promise.reject(message);
  }
);
export { APIClient };

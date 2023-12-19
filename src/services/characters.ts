import { APIClient } from "@/helpers/servicesHelper";

const api = new APIClient();

export const getCharacters = (id: string) => {
  const apiUrl = `/character/${id}`;
  return api.get(apiUrl);
};
export const getMultipleCharacters = (list: []) => {
  const apiUrl = `/character/${list}`;
  return api.get(apiUrl);
};

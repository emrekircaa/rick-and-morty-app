import { APIClient } from "@/helpers/servicesHelper";

const api = new APIClient();

export const getLocations = (pageNumber: number) => {
  const apiUrl = `location?page=${pageNumber}
  `;
  return api.get(apiUrl);
};
export const getLocationsCharacters = (id: string) => {
  const apiUrl = `location/${id}
    `;
  return api.get(apiUrl);
};

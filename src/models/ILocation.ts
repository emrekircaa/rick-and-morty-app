import { ICommon } from "./common";

export interface ILocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}

export interface ILocationResponse extends ICommon {
  results: Location[];
}

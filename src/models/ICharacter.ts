import { ICommon } from "./common";

type Origin = {
  name: string;
  url: string;
};

type LocationInfo = {
  name: string;
  url: string;
};

export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: LocationInfo;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharacterResponse extends ICommon {
  results: ICharacter[];
}

import { ICommon } from "./common";

type Origin = {
  name: string;
  url: string;
};

type LocationInfo = {
  name: string;
  url: string;
};

type Episode = {
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
  episode: Episode[];
  url: string;
  created: string;
}

export interface CharacterResponse extends ICommon {
  results: ICharacter[];
}

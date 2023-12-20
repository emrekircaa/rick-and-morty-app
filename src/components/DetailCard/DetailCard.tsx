import React from "react";
import style from "./DetailCard.module.scss";
import Image from "next/image";
import { Heart, StatusDot } from "../Icons/Icons";
enum Color {
  Alive = "green",
  Dead = "red",
  unknown = "#cecece",
}
interface LocationCardProps {
  status: string;
  name: string;
  src: string;
  species: string;
  type: string;
  gender: string;
  origin: string;
}
const DetailCard: React.FC<LocationCardProps> = ({
  status,
  name,
  src,
  species,
  type,
  gender,
  origin,
}) => {
  return (
    <div>
      <div className={style.cardContainer}>
        <div className={style.imgContainer}>
          <div className={style.hearth}>
            <Heart />
          </div>
          <Image
            className={style.img}
            src={src}
            alt=""
            width={160}
            height={160}
            priority
          />
        </div>
        <div className={style.nameText}>{name}</div>
        <div className={style.locationText}>({origin})</div>
        <div className={style.infoContainer}>
          <div className={style.infoText}>
            <StatusDot color={Color[status as unknown as keyof typeof Color]} />
            <span>
              {status} - {species} {type && `- ${type}`}
            </span>
          </div>
          <div>{gender}</div>
        </div>
      </div>
    </div>
  );
};
export default DetailCard;

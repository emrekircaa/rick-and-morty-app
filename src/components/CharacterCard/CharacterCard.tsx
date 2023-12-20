import Image from "next/image";
import style from "./CharacterCard.module.scss";
import React from "react";
import { Heart, StatusDot, ChevronIcon } from "../Icons/Icons";

interface LocationCardProps {
  status: string;
  name: string;
  src: string;
  handleClick: () => void;
}
enum Color {
  Alive = "green",
  Dead = "red",
  unknown = "#cecece",
}

const CharacterCard: React.FC<LocationCardProps> = ({
  status,
  name,
  src,
  handleClick,
}) => {
  return (
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
      <div className={style.infoContainer} onClick={handleClick}>
        <div>
          <div className={style.nameText}>{name}</div>
          <div className={style.infoText}>
            <StatusDot color={Color[status as keyof typeof Color]} />
            {status}
          </div>
        </div>
        <ChevronIcon />
      </div>
    </div>
  );
};

export default CharacterCard;

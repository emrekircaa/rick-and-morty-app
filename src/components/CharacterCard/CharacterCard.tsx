import Image from "next/image";
import style from "./CharacterCard.module.scss";
import React, { useEffect, useState } from "react";
import { Heart, StatusDot, ChevronIcon } from "../Icons/Icons";
import { useAppDistpach, useAppSelector } from "@/hooks/ReduxHook";
import { addRemoveFav } from "@/store/feature/favSlice";
import { ICharacter } from "@/models/ICharacter";

interface LocationCardProps {
  handleClick?: () => void;
  data: ICharacter;
  isDetail?: boolean;
}
enum Color {
  Alive = "green",
  Dead = "red",
  unknown = "#cecece",
}

const CharacterCard: React.FC<LocationCardProps> = ({
  handleClick,
  data,
  isDetail = false,
}) => {
  const dispatch = useAppDistpach();
  const favItems = useAppSelector((state) => state.fav.favItems);
  const check = (id: number) => {
    const found = favItems.findIndex((item) => item.id == id);
    return found;
  };
  return (
    <div className={isDetail ? style.cardContainerFull : style.cardContainer}>
      <div className={style.imgContainer}>
        <div
          className={style.hearth}
          onClick={() => dispatch(addRemoveFav(data))}
        >
          <Heart color={check(data.id) >= 0 ? "red" : "white"} />
        </div>
        <Image
          className={style.img}
          src={data.image}
          alt=""
          width={160}
          height={160}
          priority
        />
      </div>
      <div className={style.infoContainer} onClick={handleClick}>
        <div>
          <div className={style.nameText}>{data.name}</div>
          <div className={isDetail ? style.isDetail : style.infoText}>
            <div className={style.status}>
              <StatusDot color={Color[data.status as keyof typeof Color]} />
              <span>
                {data.status} - {data.species}
              </span>
            </div>
            {isDetail && (
              <div className={style.extraData}>
                <span className={style.locationText}>
                  ({data.location.name})
                </span>
                <span>
                  {data.type && <span>{data.type && `${data.type} -`}</span>}
                  {data.gender}
                </span>
              </div>
            )}
          </div>
        </div>
        <ChevronIcon />
      </div>
    </div>
  );
};

export default CharacterCard;

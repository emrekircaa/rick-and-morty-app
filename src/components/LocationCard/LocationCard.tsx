import React from "react";
import style from "./LocationCard.module.scss";
import { useRouter } from "next/navigation";

interface LocationCardProps {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

const LocationCard: React.FC<LocationCardProps> = ({
  id,
  name,
  type,
  dimension,
  residents,
}) => {
  const router = useRouter();

  return (
    <div
      key={id}
      className={style.cardContainer}
      onClick={() => router.push(`/character/${id}`)}
    >
      <div className={style.title}>{name}</div>
      <ul>
        <li className={style.textContainer}>
          <span className={style.leftText}>Name:</span>
          <span className={style.rightText}>{name}</span>
        </li>
        <li className={style.textContainer}>
          <span className={style.leftText}>Type:</span>
          <span className={style.rightText}>{type}</span>
        </li>
        <li className={style.textContainer}>
          <span className={style.leftText}>Dimension:</span>
          <span className={style.rightText}>{dimension}</span>
        </li>
        <li className={style.textContainer}>
          <span className={style.leftText}>Residents Count:</span>
          <span className={style.rightText}>
            {residents && residents?.length}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default LocationCard;

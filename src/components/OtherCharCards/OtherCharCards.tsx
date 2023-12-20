import Image from "next/image";
import style from "./OtherCharCards.module.scss";
import { ICharacter } from "@/models/ICharacter";

interface OtherCardProps {
  data: ICharacter;
  handeClick: () => void;
}
const OtherCharCards: React.FC<OtherCardProps> = ({ data, handeClick }) => {
  return (
    <div className={style.cardContainer} onClick={handeClick}>
      <Image
        className={style.img}
        src={data.image}
        alt=""
        width={80}
        height={80}
        priority
      />
      <div className={style.infoContainer}>
        <span className={style.nameText}>{data.name}</span>
        <div className={style.nameText}>{data.location.name}</div>
        <div className={style.infoText}>
          <span>
            {data.species}-{data.gender}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OtherCharCards;

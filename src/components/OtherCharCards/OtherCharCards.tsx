import Image from "next/image";
import style from "./OtherCharCards.module.scss";
import { StatusDot } from "../Icons/Icons";
import { ICharacter } from "@/models/ICharacter";
enum Color {
  Alive = "green",
  Dead = "red",
  unknown = "#cecece",
}
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
      {/* name
      dimensional
      human/male
       */}
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

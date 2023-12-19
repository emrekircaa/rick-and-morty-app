import Image from "next/image";
import style from "./OtherCharCards.module.scss";
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
  handeClick: () => void;
}
const OtherCharCards: React.FC<LocationCardProps> = ({
  status,
  name,
  src,
  handeClick,
}) => {
  return (
    <div className={style.cardContainer} onClick={handeClick}>
      <Image
        className={style.img}
        src={src}
        alt=""
        width={80}
        height={80}
        priority
      />
      <div className={style.infoContainer}>
        <span className={style.nameText}>{name}</span>
        <div className={style.infoText}>
          <StatusDot color={Color[status as keyof typeof Color]} />{" "}
          <span>
            {status} - {name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OtherCharCards;

"use client";
import React, { useEffect, useState } from "react";
import style from "./FavoriteView.module.scss";
import { useAppSelector } from "@/hooks/ReduxHook";
import Loading from "@/components/Loading/Loading";
import NoData from "@/components/NoData/NoData";
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import { useRouter } from "next/navigation";

function FavoriteView() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const favItems = useAppSelector((state) => state.fav.favItems);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : favItems && favItems.length > 0 ? (
        <div className={style.container}>
          {favItems.map((item: any) => (
            <CharacterCard
              key={item.id.toString()}
              data={item}
              isDetail={true}
              handleClick={() => router.push(`/character/detail/${item.id}`)}
            />
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
}

export default FavoriteView;

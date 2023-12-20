"use client";
import React, { useEffect, useState } from "react";
import style from "./FavoriteView.module.scss";
import { useAppDistpach, useAppSelector } from "@/hooks/ReduxHook";
import FavoriteCard from "@/components/FavoriteCard/FavoriteCard";
import Loading from "@/components/Loading/Loading";
import NoData from "@/components/NoData/NoData";
import CharacterCard from "@/components/CharacterCard/CharacterCard";

function FavoriteView() {
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
            <CharacterCard data={item} isDetail={true} />
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
}

export default FavoriteView;

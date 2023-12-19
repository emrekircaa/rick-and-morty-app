"use client";
import React, { useEffect, useState } from "react";
import style from "./CharactersDetailView.module.scss";
import { usePathname } from "next/navigation";
import { getCharacters, getMultipleCharacters } from "@/services/characters";
import DetailCard from "@/components/DetailCard/DetailCard";
import { getLocationsCharacters } from "@/services/location";
import { useRouter } from "next/navigation";
import { ICharacter } from "@/models/ICharacter";
import OtherCharCards from "@/components/OtherCharCards/OtherCharCards";
import Loading from "@/components/Loading/Loading";

function CharactersDetailView() {
  const router = useRouter();
  const pathName = usePathname();

  const [currentId, setCurrentId] = useState<string>();
  const [item, setItem] = useState<ICharacter>();
  const [otherData, setOtherData] = useState<[ICharacter[]]>();
  const [loading, setLoading] = useState<boolean>(true);

  const getSonItem = async (str: string) => {
    const items = str.split("/");
    setCurrentId(items[items.length - 1]);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getSonItem(pathName);
      let requestCharId: [] = [];
      let status: string;

      if (currentId) {
        getCharacters(currentId)
          .then((res: any) => {
            setItem(res);
            let items = res.location.url.split("/");
            status = res.status;
            getLocationsCharacters(items[items.length - 1])
              .then((res: any) => {
                requestCharId = res.residents
                  .map((url: any) => url.split("/").pop())
                  .join(",");
              })
              .then(() => {
                getMultipleCharacters(requestCharId).then((res: any) => {
                  const responseData = res.length > 1 ? res : [res];
                  const filteredCharacters =
                    responseData.length > 0 &&
                    responseData?.filter(
                      (character: any) =>
                        character.status === status &&
                        character.id !== currentId
                    );
                  const shuffledCharacters = filteredCharacters.sort(
                    () => Math.random() - 0.5
                  );
                  setOtherData(shuffledCharacters);
                });
              });
          })
          .then(() => setLoading(false));
      }
    };

    setTimeout(fetchData, 500);
  }, [pathName, currentId]);

  return (
    <div className={style.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {item ? (
            <DetailCard
              status={item.status}
              name={item.name}
              src={item.image}
              species={item.species}
              type={item.type}
              gender={item.gender}
              origin={item.origin.name}
            />
          ) : (
            <p>No data available for this character.</p>
          )}
          <div className={style.otherContainer}>
            <h2 className={style.title}>Other Characters</h2>
            {otherData && otherData.length > 0 ? (
              otherData.slice(0, 3).map((otherItem: any) => (
                <OtherCharCards
                  key={otherItem.id}
                  handeClick={() => {
                    router.push(`${otherItem.id}`);
                  }}
                  status={otherItem.status}
                  name={otherItem.name}
                  src={otherItem.image}
                />
              ))
            ) : (
              <p>No other characters available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default CharactersDetailView;

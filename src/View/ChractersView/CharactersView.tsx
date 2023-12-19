"use client";
import Image from "next/image";
import style from "./CharactersView.module.scss";
import PagePagination from "@/components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { StatusDot } from "@/components/Icons/Icons";
import { usePathname, useRouter } from "next/navigation";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "@/components/Buttons/Button";
import { useIsMobile } from "@/hooks/ScreenSizeHook";
import { getLocations, getLocationsCharacters } from "@/services/location";
import { getMultipleCharacters } from "@/services/characters";
import { ILocation } from "@/models/ILocation";
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import Loading from "@/components/Loading/Loading";

interface Location {
  name: string;
  url: string;
  residents: string[];
}

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
enum Color {
  Alive = "green",
  Dead = "red",
  unknown = "#cecece",
}

export default function CharactersView() {
  const router = useRouter();
  const pathName = usePathname();
  const isMobile = useIsMobile();
  const itemsPerPage = 4;

  const [currentId, setCurrentId] = useState<string>();
  const [data, setData] = useState<Character[]>();
  const [filteredData, setFilteredData] = useState<Character[]>();
  const [status, setStatus] = useState<string>();
  const [locationData, setLocationData] = useState<ILocation>();
  const [pageCount, setPageCount] = useState<number>();
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const getLastItem = async (str: string) => {
    const items = str.split("/");
    setCurrentId(items[items.length - 1]);
  };

  const handlePageClick = (event: any) => {
    if (locationData) {
      const newOffset =
        (event.selected * itemsPerPage) % locationData.residents.length;
      setItemOffset(newOffset);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getLastItem(pathName);
      let requestCharId: [] = [];
      if (currentId) {
        getLocationsCharacters(currentId)
          .then((res: any) => {
            setLocationData(res);
            requestCharId = res.residents
              .map((url: any) => url.split("/").pop())
              .join(",");
          })
          .then(() => {
            if (requestCharId) {
              getMultipleCharacters(requestCharId).then((res: any) =>
                res.length > 1 ? setData(res) : setData([res])
              );
            }
          })
          .then(() => setLoading(false));
      }
    };

    setTimeout(fetchData, 500);
  }, [currentId, pathName]);

  useEffect(() => {
    if (data) {
      const endOffset = itemOffset + itemsPerPage;
      setFilteredData(
        status
          ? data
              ?.filter((char) => char.status === status)
              ?.slice(itemOffset, endOffset)
          : data.slice(itemOffset, endOffset)
      );
      setPageCount(
        Math.ceil(
          status
            ? data?.filter((char) => char.status === status).length /
                itemsPerPage
            : data.length / itemsPerPage
        )
      );
    }
  }, [data, itemOffset, itemsPerPage, status]);
  return (
    <div className={style.CharactersViewContainer}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {filteredData && filteredData.length > 0 ? (
            <>
              {/* title name */}
              <h2>
                {filteredData &&
                  filteredData.length > 0 &&
                  filteredData[0]?.location?.name}
              </h2>
              {/* filter Button section */}
              <div className={style.filterContainer}>
                <Button
                  active={status == "Dead"}
                  title="Dead"
                  onClick={() => {
                    status == "Dead" ? setStatus("") : setStatus("Dead");
                  }}
                />
                <Button
                  active={status == "Alive"}
                  title="Alive"
                  onClick={() =>
                    status == "Alive" ? setStatus("") : setStatus("Alive")
                  }
                />
                <Button
                  active={status == "unknown"}
                  title="Unknown"
                  onClick={() =>
                    status == "unknown" ? setStatus("") : setStatus("unknown")
                  }
                />
              </div>
              {/* Content Section*/}
              <div className={style.gridContainer}>
                {!isMobile ? (
                  filteredData && filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <CharacterCard
                        key={item.id?.toString()}
                        name={item.name}
                        src={item.image}
                        status={item.status}
                        handleClick={() =>
                          router.push(`/character/detail/${item.id}`)
                        }
                      />
                    ))
                  ) : (
                    <div>Data not available</div>
                  )
                ) : (
                  // Mobil Swiper
                  <Swiper
                    slidesPerView={1}
                    centeredSlides
                    modules={[Navigation, Pagination]}
                    navigation
                  >
                    {filteredData && filteredData.length > 0 ? (
                      filteredData.map((item) => (
                        <SwiperSlide key={item.id.toString()}>
                          <div className={style.otherContent}>
                            <Image
                              className={style.img}
                              src={item.image}
                              alt=""
                              width={600}
                              height={600}
                            />
                            <div className={style.content}>
                              <div className={style.nameText}>{item.name}</div>
                              <div className={style.infText}>
                                <StatusDot
                                  color={
                                    Color[item?.status as keyof typeof Color]
                                  }
                                />
                                {item?.status}
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))
                    ) : (
                      <div>Data not available</div>
                    )}
                  </Swiper>
                )}
              </div>
              <PagePagination
                handlePageClick={handlePageClick}
                pageCount={pageCount}
              />
            </>
          ) : (
            <div>asdasd</div>
          )}
        </>
      )}
    </div>
  );
}

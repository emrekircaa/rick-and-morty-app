"use client";
import Image from "next/image";
import style from "./CharactersView.module.scss";
import PagePagination from "@/components/Pagination/Pagination";
import { useEffect, useState } from "react";
import { ChevronIcon, Heart, StatusDot } from "@/components/Icons/Icons";
import { usePathname, useRouter } from "next/navigation";
import { useAppDistpach, useAppSelector } from "@/hooks/ReduxHook";
import { addRemoveFav } from "@/store/feature/favSlice";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "@/components/Buttons/Button";
import { useIsMobile } from "@/hooks/ScreenSizeHook";
import { getLocationsCharacters } from "@/services/location";
import { getMultipleCharacters } from "@/services/characters";
import { ILocation } from "@/models/ILocation";
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import Loading from "@/components/Loading/Loading";
import NoData from "@/components/NoData/NoData";
import Link from "next/link";

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
  const dispatch = useAppDistpach();
  const favItems = useAppSelector((state) => state.fav.favItems);
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

  const check = (id: number) => {
    const found = favItems.findIndex((item) => item.id == id);
    return found;
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
          {/* title name */}

          <div className={style.titleContainer}>
            <div className={style.filterText}>{data && `Filter by status`}</div>
            <div className={style.myFavText}>
              <Link href="/favorite">My Favorite</Link>
            </div>
          </div>
          {/* filter Button section */}
          {data && (
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
          )}
          {/* Content Section*/}
          {filteredData && filteredData?.length > 0 ? (
            <>
              <div className={style.gridContainer}>
                {!isMobile ? (
                  filteredData && filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <CharacterCard
                        key={item.id?.toString()}
                        data={item}
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
                          <CharacterCard
                            handleClick={() =>
                              router.push(`/character/detail/${item.id}`)
                            }
                            data={item}
                          ></CharacterCard>
                        </SwiperSlide>
                      ))
                    ) : (
                      <NoData />
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
            <NoData />
          )}
        </>
      )}
    </div>
  );
}

"use client";
import style from "./LocationView.module.scss";
import LocationCard from "@/components/LocationCard/LocationCard";
import PagePagination from "@/components/Pagination/Pagination";
import { useState, useEffect } from "react";
import { getLocations } from "@/services/location";
import { ILocationResponse } from "@/models/ILocation";

export default function LocationView() {
  const [pageCount, setPageCount] = useState<number>();
  const [data, setData] = useState<ILocationResponse[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [nextPage, setNextPage] = useState<number>(1);

  const handlePageClick = (event: any) => {
    let number = event.selected + 1;
    setNextPage(number);
  };

  useEffect(() => {
    const fetchData = () => {
      getLocations(nextPage)
        .then((res: any) => {
          setPageCount(res.info.pages);
          setData(res.results);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        })
        .then(() => setLoading(false));
    };
    setTimeout(fetchData, 500);
  }, [nextPage]);

  return (
    <>
      {loading ? (
        <div>Loading....</div>
      ) : (
        <>
          <div className={style.gridContainer}>
            {data &&
              data.length > 0 &&
              data?.map((item: any) => (
                <LocationCard
                  key={item.id.toString()}
                  id={item.id}
                  name={item.name}
                  type={item.type}
                  dimension={item.dimension}
                  residents={item?.residents}
                />
              ))}
          </div>

          <PagePagination
            handlePageClick={handlePageClick}
            pageCount={pageCount}
          />
        </>
      )}
    </>
  );
}

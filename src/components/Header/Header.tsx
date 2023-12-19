"use client";
import React from "react";
import style from "./Header.module.scss";
import { useRouter, usePathname } from "next/navigation";
import { BackIcon } from "../Icons/Icons";
function Navbar() {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <div className={style.headerContainer}>
      <div className={style.headerItem}>
        {pathName !== "/" ? (
          <div className={style.backButton} onClick={() => router.back()}>
            <BackIcon />
          </div>
        ) : null}
      </div>
      <div className={style.headerItem}>
        <h3>Rick & Morthy</h3>
      </div>
      <div className={style.headerItem}></div>
    </div>
  );
}

export default Navbar;

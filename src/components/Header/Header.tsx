"use client";
import React from "react";
import style from "./Header.module.scss";
import { useRouter } from "next/navigation";
function Navbar() {
  const router = useRouter();
  return (
    <div className={style.headerContainer}>
      <button className={style.button} onClick={() => router.back()}>
        Click here to go back
      </button>
      <h3>Rick & Morthy</h3>
    </div>
  );
}

export default Navbar;

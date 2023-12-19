"use client";
import CharactersDetailView from "@/View/CharactersDetailView/CharactersDetailView";
import React from "react";

function page({ params }: any) {
  return (
    <div>
      <CharactersDetailView />
    </div>
  );
}

export default page;

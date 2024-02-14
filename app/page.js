"use client";
import React, {useState} from 'react'
import GoogleMapSection from "@/components/Home/GoogleMapSection";
import SearchSection from "@/components/Home/SearchSection";

export default function Home() {
  const [selectPosition, setSelectPosition] = useState(null);
  console.log()
  console.log(selectPosition);
  return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <SearchSection selectPosition={selectPosition} setSelectPosition={setSelectPosition}/>
        </div>
        <div className="col-span-2" style={{height: "100vh"}}>
          <GoogleMapSection selectPosition={selectPosition}/>
        </div>
      </div>
  );
}

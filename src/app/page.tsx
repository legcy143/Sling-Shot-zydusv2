"use client";
import BgImage from "@/component/BgImage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import style from "./home.module.css"
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Throttle from "@/lib/Throttle";

export default function Home() {

  return (
    <div
      className="flex flex-col gap-10 items-center justify-center h-full w-full
     md:flex-row p-5 bg-red-50"
    >

      {/* <BgImage /> */}
      {/* <div className='absolute md:relative' >
        <img src="/logo.png" className='w-[90%] max-w-[40rem]' alt="img" />
      </div> */}
      <StartForm />

      {/* Home is
      <Link href="/gameboard">gameboard</Link>
      <Link href="/playscreen">playscreen</Link> */}
    </div>
  );
}

const StartForm = () => {
  const router = useRouter();
  const [player, setplayer] = useState("");
  const [mode, setmode] = useState("slow");
  const [time, setTime] = useState("60");
  const [showTimer, setshowTimer] = useState(false)
  const [timeEr, settimeEr] = useState(3)
  // useEffect(() => {
  //   let interval = setInterval(()=>{settimeEr((e)=>e+1)}, 1000);
  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [])

  let playerList = [
    // { _id: 1, value: "prince" },
    // { _id: 2, value: "sid" },
    // { _id: 3, value: "falana dihmkana" }
    "slow",
    "medium",
    "fast",
  ];
  const handleStart = () => {
    try {
      if (time.length > 0) {
        setshowTimer(true)
        setInterval(() => { settimeEr((e) => e - 1) }, 1000);
        setTimeout(() => {
          router.push(`/gameboard?mode=${mode}&time=${+time}`);
        }, 3000);
      }
    } catch (error) {
      window.location.reload();
    }
  }

  return (
    <>
      {showTimer ? <div className={style.popupNumber}>{timeEr}</div> : ""}
      <main className="z-10 w-full max-w-[28rem] p-4 py-10 md:p-10 bg-opacity-20 backdrop-blur-md rounded bg-black flex flex-col gap-8 items-center justify-center text-xl md:bg-white md:bg-opacity-100 shadow-xl relative">
        <p className="text-3xl font-semibold">Start Game </p>
        <select
          className="bg-gray-100 w-full text-gray-800 border-0 rounded-md p-5 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 capitalize"
          id="product"
          onChange={(e) => {
            setmode(e.target.value);
          }}
        >
          {/* <option value="None" className='hidden'>Choose speed</option> */}
          {playerList?.map((e) => (
            <option className="capitalize" key={e} value={e}>
              {e}
              {e == "slow" && " (default)"}
            </option>
          ))}
        </select>
        {/* <input placeholder="Player Name" className="bg-gray-100 text-gray-800 border-0 rounded-md p-5 w-full focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="text" onChange={(e) => {
        setplayer(e.target.value)
      }} /> */}
        <input
          placeholder="Time in second (s)"
          className="bg-gray-100 text-gray-800 border-0 rounded-md p-5 w-full focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          type="number"
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
          }}
        />
        <p className="text-red-500 w-[100%] p-2 capitalize bg-white rounded bg-opacity-90">
          <br /> * time is must be in number <br />* time is in second
        </p>

        <button
          className="start-btn"
          onClick={Throttle(handleStart , 3000)}
        >
          start
        </button>
      </main>
    </>
  );
};

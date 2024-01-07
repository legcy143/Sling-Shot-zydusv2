"use client";
import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.css";
import { gsap } from "gsap";
import { useRouter, useSearchParams } from "next/navigation";
import BgImage from "@/component/BgImage";
import Confetti from "react-confetti";

export default function Scorecard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const score = searchParams.get("score");
  const time = searchParams.get("time");
  const name = searchParams.get("name");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [showConfetti, setShowConfetti] = useState(false);
  const clapSound = useRef<any>(new Audio("/music/clapp.mp3"));

  useEffect(() => {
    if (score && Number(score) > 0) {
      clapSound.current.play();
      setShowConfetti(true)
    }
  },[])

  return (
    <main className="flex flex-col items-center justify-center h-[100vh]">
      {/* <audio
        src="/music/clapp.mp3"
        className="opacity-0 fixed"
        autoPlay
        controls
      ></audio> */}
      {
        showConfetti && <Confetti
          width={windowWidth}
          height={windowHeight}
          recycle={false}
          numberOfPieces={showConfetti ? 200 : 0}
          onConfettiComplete={() => {
            setShowConfetti(false);
          }}
        />
      }
      <BgImage />
      {/* <p className={style.textT}>
        To Treat anemia <br /> without side effects
      </p> */}
      <div className={style.Tcontainer}>
        <img className={style.img1} src="/logo.png" alt="logo" />
        {/* <img className={style.img2} src="/medicine/syrup.png" alt="syrup" /> */}
      </div>
      <section className={style.cardBodyT}>
        <div className={style.scoreCardT}>
          <h1 className="text-xl capitalize font-semibold">
            {name} You Scored
          </h1>
          <h1 className="text-5xl capitalize font-semibold">{score}</h1>
          <img src="/virus/shootIcon.png" alt="shoot" />
          <div className={style.btns}>
            <button
              className={style.retry}
              onClick={() => {
                // window.location.reload()
                // router.push("/");
                window.location.href = "/";
              }}
            >
              Go to Home
            </button>
            {/* <button className={style.retry} onClick={() => {
                            router.back();
                        }}
                        >Retry</button> */}
            {/* <button className={`${style.retry} px-5`}>home</button> */}
          </div>
        </div>
      </section>
    </main>
  );
}

"use client"
import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { gsap } from 'gsap';
import styles from "./style.module.css";

const MovingDiv = forwardRef(
  (
    {
      x1 = 0,
      y1 = 0,
      x2 = 0,
      y2 = 0,
      x3 = 0,
      y3 = 0,
      x4 = 0,
      y4 = 0,
      text = "text",
      isBrust = false,
      duration = 2,
      initx = 0,
      inity = 0,
      alt = "img",
      imgSrc = "https://static.vecteezy.com/system/resources/previews/013/760/383/original/virus-isolated-transparent-free-png.png"
    }: any,
    ref: any
  ) => {
    const movingElementRef = useRef<any>(null);

    const [isBursting, setBursting] = useState(isBrust);

    useEffect(() => {
      movingElementRef.current.handleIsBrust = () => {
        setBursting(false);
      };
    }, []);

    useEffect(() => {
      gsap.set(movingElementRef.current, {
        position: 'absolute',
        top: `${initx}%`,
        left: `${inity}%`,
      });

      const tl = gsap.timeline({ repeat: -1, yoyo: true });

      tl.to(movingElementRef.current, {
        top: `${x1}%`,
        left: `${y1}%`,
        duration: duration,
        ease: 'none',
      })
        .to(movingElementRef.current, {
          top: `${x2}%`,
          left: `${y2}%`,
          duration: duration,
          ease: 'none',
        })
        .to(movingElementRef.current, {
          top: `${x3}%`,
          left: `${y3}%`,
          duration: duration,
          ease: 'none',
        })
        .to(movingElementRef.current, {
          top: `${x4}%`,
          left: `${y4}%`,
          duration: duration,
          ease: 'none',
        });
    }, [x1, y1, x2, y2, x3, y3, x4, y4, duration]);

    // Forwarding the ref to the underlying div element
    useEffect(() => {
      if (ref) {
        ref.current = movingElementRef.current;
      }
    }, [ref]);

    return (
      <div
        ref={movingElementRef}
        className={`${styles.moving_div} ${styles.square_div} ${isBursting ? styles.burst_animation : ''
          }`}
      >
        <div className=' relative flex items-center justify-center'>
          {/* <p style={{
          }} className='text-white absolute text-2xl font-bold'>
            {text}
          </p> */}
          <img style={{
            width: text === "palpitation" ? "500px" : "10rem",
          }} className='' src={imgSrc} alt={alt} />
        </div>
      </div>
    );
  }
);

export default MovingDiv;

export const Posarr = [
  {
    alt: "lulibet",
    imgSrc: "/virus/lulibet.png",
    initX: 50,
    inity: 50,
    duration: 4,
    x1: 10,
    y1: 90,
    x2: 50,
    y2: 50,
    x3: 90,
    y3: 90,
    x4: 0,
    y4: 10,
    isBrust: false,
    score: 600,
  },
  {
    alt: "lulican",
    imgSrc: "/virus/lulican.png",
    initX: 20,
    inity: 50,
    duration: 3,
    x1: 100,
    y1: 10,
    x2: 50,
    y2: 50,
    x3: 100,
    y3: 20,
    x4: 0,
    y4: 100,
    isBrust: false,
    score: 400,
  },
  {
    alt: "lulifin",
    imgSrc: "/virus/lulifin.png",
    initX: 90,
    inity: 80,
    duration: 3,
    x1: 10,
    y1: 10,
    x2: 150,
    y2: 50,
    x3: 60,
    y3: 20,
    x4: 10,
    y4: 10,
    isBrust: false,
    score: 300,
  },
  {
    alt: "nafbor",
    imgSrc: "/virus/nafbor.png",
    duration: 4,
    x1: 20,
    y1: 10,
    x2: 60,
    y2: 80,
    x3: 60,
    y3: 60,
    x4: 60,
    y4: 10,
    isBrust: false,
    score: 300,
  },
  {
    alt: "nafticross",
    imgSrc: "/virus/nafticross.png",
    duration: 4,
    x1: 0,
    y1: 10,
    x2: 20,
    y2: 20,
    x3: 50,
    y3: 50,
    x4: 60,
    y4: 70,
    isBrust: false,
    score: 400,
  },
  {
    alt:"ninaf",
    imgSrc: "/virus/ninaf.png",
    initX: 50,
    inity: 50,
    duration: 5,
    x1: 20,
    y1: 10,
    x2: 60,
    y2: 80,
    x3: 60,
    y3: 60,
    x4: 60,
    y4: 10,
    isBrust: false,
    score: 200,
  },
  // {
  //   imgSrc: "/virus/3.png",
  //   initX: 50,
  //   inity: 50,
  //   duration: 2,
  //   x1: 40,
  //   y1: 60,
  //   x2: 20,
  //   y2: 30,
  //   x3: 50,
  //   y3: 50,
  //   x4: 20,
  //   y4: 40,
  //   isBrust: false,
  //   score: 5,
  // },
  // {
  //   imgSrc: "/virus/6.png",
  //   initX: 50,
  //   inity: 50,
  //   duration: 2,
  //   x1: 10,
  //   y1: 0,
  //   x2: 20,
  //   y2: 30,
  //   x3: 40,
  //   y3: 50,
  //   x4: 50,
  //   y4: 10,
  //   isBrust: false,
  //   score: 5,
  // }
]

"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import ShootButton from "./ShootButton";
import BgImage from "@/component/BgImage";
import socket from "socket.io-client";
import { setData } from "./redis";
import axios from "axios";
const io = socket("api.gokapturehub.com", {
  transports: ["websocket"],
});

// kv.

const PlayScreen = () => {
  const [GyroscopeData, setGyroscopeData] = useState({});

  // useEffect(() => {
  //   const handleOrientation = (event: any) => {
  //     setGyroscopeData({
  //       alpha: event.alpha,
  //       beta: event.beta,
  //       gamma: event.gamma,
  //     });
  //   };

  //   if (window.DeviceOrientationEvent) {
  //     window.addEventListener("deviceorientation", handleOrientation, true);
  //   } else {
  //     console.log("Device orientation not supported");
  //   }

  //   return () => {
  //     window.removeEventListener("deviceorientation", handleOrientation, true);
  //   };
  // }, []);

  // shake
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (isShaking) {
      io.emit("message", "game1", {
        shoot: true,
      });
      setTimeout(() => {
        setIsShaking(false);
      }, 1000);
    }
  }, [isShaking]);

  useEffect(() => {
    let shakeThreshold = 10; // Adjust this value as needed for sensitivity
    let lastX: any = null;
    let lastY: any = null;
    let lastZ: any = null;

    const handleMotion = (event: any) => {
      let acceleration = event.accelerationIncludingGravity;
      if (acceleration) {
        let { x, y, z } = acceleration;

        if (lastX !== null) {
          let deltaX = Math.abs(lastX - x);
          let deltaY = Math.abs(lastY - y);
          let deltaZ = Math.abs(lastZ - z);

          if (
            deltaX > shakeThreshold ||
            deltaY > shakeThreshold ||
            deltaZ > shakeThreshold
          ) {
            setIsShaking(true);
          }
        }

        lastX = x;
        lastY = y;
        lastZ = z;
      }
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener("devicemotion", handleMotion, true);
    } else {
      console.log("Device motion not supported");
    }

    return () => {
      window.removeEventListener("devicemotion", handleMotion, true);
    };
  }, []);

  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  useEffect(() => {
    console.log("joining game");
    io.emit("join", "game");
  }, []);

  const [details, setDetails] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [isJoined, setIsJoined] = useState(false);

  // useEffect(() => {
  //   if (window.DeviceMotionEvent) {
  //     window.addEventListener('deviceorientationabsolute', handleMotion);

  //     return () => {
  //       window.removeEventListener("deviceorientationabsolute", handleMotion);
  //     };
  //   } else {
  //     console.log("DeviceMotionEvent not supported");
  //   }
  // }, []);

  // const handleMotion = (event: any) => {
  //   // const { accelerationIncludingGravity } = event;
  //   const { alpha, beta, gamma } = event;
  //   setAcceleration({
  //     z: alpha,
  //     x: beta,
  //     y: gamma,
  //   });
  //   io.emit("message", "game", {
  //     x: beta,
  //     y: gamma,
  //   });
  // };

  useEffect(() => {
    io.on("message", (data: any) => {
      if (data.score) {
        alert(`Wow ${details.name}, You scored ${data.score} points`);
        isJoined && setIsJoined(false);
      }
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-[80%] max-w-[50rem] m-auto space-y-2">
      <BgImage />
      <img src="/logo.png" className="max-h-[10rem]" alt="logo" />
      {!isJoined && (
        <>
          <input
            type="text"
            className="z-50 w-[90%] h-10 rounded-md border border-gray-600 px-2"
            placeholder="Name"
            value={details.name}
            onChange={(e) => setDetails({ ...details, name: e.target.value })}
          />
          <input
            type="text"
            className="z-50 w-[90%] h-10 rounded-md border border-gray-600 px-2"
            placeholder="Phone Number"
            value={details.phone}
            onChange={(e) => setDetails({ ...details, phone: e.target.value })}
          />
          <input
            type="text"
            className="z-50 w-[90%] h-10 rounded-md border border-gray-600 px-2"
            placeholder="Email"
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
          />
          <button
            onClick={async () => {
              if (details.name && details.phone && details.email) {
                io.emit("join", "game", {
                  name: details.name,
                  shoot: false,
                });
                await axios.post(
                  "https://api.gokapturehub.com/apexfer/add",
                  details
                );
                setIsJoined(true);
              } else {
                alert("Please fill all the fields");
              }
            }}
            className="z-50 w-[80%] h-10 rounded-md bg-pink-500 text-white"
          >
            Join
          </button>
        </>
      )}
      {isJoined && (
        <div className="flex flex-col justify-center items-center space-y-2 z-50">
          <h1 className="text-4xl text-black font-black">
            Welcome to the Game,
          </h1>
          <h1 className="text-3xl text-black font-bold">{details.name}</h1>
          <button
            onClick={() => {
              io.emit("message", "game", {
                shoot: false,
                exit: true,
              });
              setIsJoined(false);
            }}
            className="w-[80%] h-10 rounded-md bg-red-500 text-white text-lg font-bold"
          >
            Exit
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayScreen;

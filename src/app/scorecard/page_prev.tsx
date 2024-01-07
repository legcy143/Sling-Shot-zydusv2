"use client"
import BgImage from '@/component/BgImage'
import React from 'react'
import styles from "./style.module.css"
import { IoIosStar as StarIcon, IoIosTimer as TimerIcon } from "react-icons/io"
import { useParams, useRouter, useSearchParams } from 'next/navigation'


export default function ScoreCard() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const mode = searchParams.get('mode')
    const score = searchParams.get('score')
    const time = searchParams.get('time')
    return (
        <main className='flex h-full w-full select-none'>
            <BgImage />
            <img src="virus/1.png"
                className='fixed top-1 right-1'
                alt="img"
            />
            <img src="virus/2.png"
                className='fixed top-[20%] right-[20%]'
                alt="img"
            />
            <img src="virus/3.png"
                className='fixed top-[30%] right-[80%]'
                alt="img"
            />
            <img src="virus/4.png"
                className='fixed top-[70%] right-[10%]'
                alt="img"
            />
            <img src="virus/5.png"
                className='fixed top-[0%] right-[50%]'
                alt="img"
            />
            <section className='w-full h-full flex bg-black bg-opacity-50 z-10 p-2'>
                <section className={styles.scoreCard}>
                    {/* <div className={styles.stars}>
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                    </div> */}
                    {/* <p className={styles.header}>{player}</p> */}
                    {/* <p className='truncate w-full text-center'>{player}</p> */}
                    <p className='flex items-center font-bold text-4xl p-4'>
                        <TimerIcon />
                        {time ?? 0}s ({mode})
                    </p>
                    <div className={styles.scorePoint}>
                        <p>you scored</p>
                        <b>{score ?? 0}</b>
                    </div>
                    <div className={styles.btns}>
                        <button className={styles.retry} onClick={() => {
                            router.push("/");
                        }}
                        >Home</button>
                        <button className={styles.retry} onClick={() => {
                            router.back();
                        }}
                        >Retry</button>
                    </div>
                </section>
            </section>
        </main>
    )
}



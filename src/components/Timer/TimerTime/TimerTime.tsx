import React from "react";
import styles from "./TimerTime.module.css"

type TimerTimeProps = {
    isTotalTimer: boolean
    time: number
}

export const TimerTime = (props: TimerTimeProps) => {

    const getHHMMSSTime = () => {
        const hours = Math.floor(props.time / 3600)
        const minutes = Math.floor((props.time % 3600) / 60)
        const seconds = Math.floor(props.time % 60)
        return {hours, minutes, seconds}
    }

    const {hours, minutes, seconds} = getHHMMSSTime()

    return (
        <div className={styles.timerTimeBody}>
            <span className={styles.timerTimeTitle}>
                {props.isTotalTimer ? "Total Time" : "Current time"}
            </span>
            <span className={styles.timerTimeClock}>
                {hours}h {minutes}m {seconds}s
            </span>
        </div>
    )
}
import React from "react";
import styles from "./TimerTime.module.css"

type TimerTimeProps = {
    isTotalTimer: boolean
    time: number
}

export const TimerTime = (props: TimerTimeProps) => {
    return (
        <div className={styles.timerTimeBody}>
            <span className={styles.timerTimeTitle}>
                {props.isTotalTimer ? "Total Time" : "Current time"}
            </span>
            <span className={styles.timerTimeClock}>
                {props.time}
            </span>
        </div>
    )
}
import React from "react";
import styles from "./Timer.module.css"
import {TimerTime} from "./TimerTime/TimerTime";
import {Button} from "../Button/Button";
import {ITimer} from "../../appTypes/appTypes";

type TimerProps = {
    timers: ITimer[]
    timerStart: any
    timerPause: any
    timerReset: any
}

export const Timer = (props: TimerProps) => {
    const printTimers = () => {
        return (
            props.timers.map((timer) => (
                <div key={timer.timerId}
                     className={styles.timerBody}
                >
                    <span className={styles.timerTitle}>{timer.title}</span>
                    <div className={styles.timerClocks}>
                        <TimerTime isTotalTimer={false} time={timer.currentTime}/>
                        <TimerTime isTotalTimer={true} time={timer.totalTime}/>
                    </div>
                    <div className={styles.timerControls}>
                        <Button textContent={"START"}
                                clickHandle={()=>{props.timerStart(timer.timerId)}}
                        />
                        <Button textContent={"PAUSE"}
                                clickHandle={()=>{props.timerPause(timer.timerId)}}
                        />
                        <Button textContent={"RESET"}
                                clickHandle={()=>{props.timerReset(timer.timerId)}}
                        />
                    </div>
                </div>
            ))
        )
    }

    return (
        <>
            {props.timers.length ? printTimers() : "YOUR TIMERS WILL BE HERE"}
        </>

    )
}
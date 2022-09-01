import {useState} from "react";
import {ITimer} from "../appTypes/appTypes";

export const useTimer = () => {
    // @ts-ignore
    const initialTimer = JSON.parse(localStorage.getItem("timers")) || []
    const [timers, setTimers] = useState<Array<ITimer>>(initialTimer)

    const findTimer = (id: number) => {
        return timers.filter(timer => timer.timerId === id)
    }

    const addTimer = (title: string, time: number) => {
        const newTimers = [
            {
                title: title,
                currentTime: 0,
                totalTime: time,
                isPaused: true,
                timerId: Math.random(),
                timerInterval: null
            },
            ...timers
        ]
        setTimers(newTimers)
        localStorage.setItem("timers", JSON.stringify(newTimers))
    }
    const timerReset = (timerId: number) => {
        timerPause(timerId)
        const resetTimers = () => timers.map(timer => {
            if (timer.timerId === timerId) {
                timer.currentTime = 0
                return timer
            } else return timer
        })
        setTimers(resetTimers())
        localStorage.setItem("timers", JSON.stringify(timers))
    }
    const timerPause = (timerId: number) => {
        const timerToPause = findTimer(timerId)
        const newTimers = () => timers.map(timer => {
            if (timer.timerId === timerId) {
                timer.isPaused = true
                return timer
            } else return timer
        })
        setTimers(newTimers())
        localStorage.setItem("timers",JSON.stringify(newTimers()))
        clearInterval(timerToPause[0].timerInterval)
    }
    const timerStart = (timerId: number) => {
        const timerToStart = findTimer(timerId)
        if (timerToStart[0].isPaused) {
            timerToStart[0].isPaused = false
            timerToStart[0].timerInterval = setInterval(() => {
                setTimers(timers => timers.map(timer => {
                        if (timer.timerId === timerId && timer.currentTime !== timer.totalTime) {
                            timer.currentTime += 1
                            if (timer.currentTime === timer.totalTime) {
                                timerPause(timerId)
                            }
                            return timer
                        } else return timer
                    })
                )
                localStorage.setItem("timers", JSON.stringify(timers))
            }, 1000)
        }
    }

    return {timers, addTimer, timerStart, timerPause, timerReset}
}
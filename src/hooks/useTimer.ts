import {useState} from "react";
import {ITimer} from "../appTypes/appTypes";

export const useTimer = () => {
    const initialTimer = {
        title: "< Example Timer Title >",
        currentTime: 0,
        totalTime: 5,
        isPaused: true,
        timerId: 1,
    }
    const [timers, setTimers] = useState<Array<ITimer>>([initialTimer])

    const findTimer = (id: number) => {
        return timers.filter(timer => timer.timerId === id)
    }

    const addTimer = (title: string, time: number) => {
        setTimers([
            {
                title: title,
                currentTime: 0,
                totalTime: time,
                isPaused: true,
                timerId: Math.random(),
                timerInterval: null
            },
            ...timers
        ])
    }
    const timerReset = (timerId: number) => {
        timerPause(timerId)
        setTimers(timers => timers.map(timer => {
                if (timer.timerId === timerId) {
                    timer.currentTime = 0
                    return timer
                } else return timer
            })
        )
        timers[0].currentTime = 0
    }
    const timerPause = (timerId: number) => {
        const timerToPause = findTimer(timerId)
        setTimers((timers) => timers.map(timer => {
                if (timer.timerId === timerId) {
                    timer.isPaused = true
                    return timer
                } else return timer
            })
        )
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
            }, 1000)
        }
    }

    return {timers, addTimer, timerStart, timerPause, timerReset}
}
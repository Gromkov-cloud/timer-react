import {useState} from "react";
import {ITimer} from "../appTypes/appTypes";

export const useTimer = () => {

    const getStorageItem = (storageItemName: string) => {
        const itemData = localStorage.getItem(storageItemName)
        if (itemData) {
            return JSON.parse(itemData)
        } else return itemData
    }
    const setTimersGlobal = (modifiedTimers: ITimer[]) => {
        setTimers(modifiedTimers)
        localStorage.setItem("timers", JSON.stringify(modifiedTimers))
    }

    const initialTimers = getStorageItem("timers") || []
    const [timers, setTimers] = useState<Array<ITimer>>(initialTimers)

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
        setTimersGlobal(newTimers)
    }

    const timerReset = (timerId: number) => {
        const modifiedTimers = () => timers.map(timer => {
            if (timer.timerId === timerId) {
                timer.currentTime = 0
                timer.isPaused = true
                clearInterval(timer.timerInterval)
                timer.timerInterval = null
                return timer
            } else return timer
        })
        setTimersGlobal(modifiedTimers())
    }
    const timerPause = (timerId: number) => {
        const modifiedTimers = () => timers.map(timer => {
            if (timer.timerId === timerId) {
                timer.isPaused = true
                clearInterval(timer.timerInterval)
                timer.timerInterval = null
                return timer
            } else return timer
        })
        setTimersGlobal(modifiedTimers())
    }
    const timerStart = (timerId: number) => {
        const timerToStart = timers.filter(timer => timer.timerId === timerId)[0]
        if (timerToStart.isPaused) {
            timerToStart.isPaused = false
            timerToStart.timerInterval = setInterval(() => {
                const modifiedTimers = () => {
                    return timers.map(timer => {
                        if (timer.timerId === timerId && timer.currentTime !== timer.totalTime) {
                            timer.currentTime += 1
                            if (timer.currentTime === timer.totalTime) {
                                timerPause(timerId)
                            }
                            return timer
                        } else return timer
                    })
                }
                setTimersGlobal(modifiedTimers())
            }, 1000)
        }
    }

    return {timers, addTimer, timerStart, timerPause, timerReset}
}
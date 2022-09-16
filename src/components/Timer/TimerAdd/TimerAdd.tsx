import React, {useState} from "react";
import styles from "./TimerAdd.module.css"
import {Button} from "../../Button/Button";

type TimerAddProps = {
    addTimer: (title: string, time: number) => void
}


export const TimerAdd = (props: TimerAddProps) => {

    const [todoTitle, setTodoTitle] = useState<string>("")
    const [hours, setHours] = useState<number |string>("")
    const [minutes, setMinutes] = useState<number | string>("")
    const [seconds, setSeconds] = useState<number | string>("")
    const [isTitleValid, setIsTitleValid] = useState<boolean>(true)
    const [isTimeValid, setIsTimeValid] = useState<boolean>(true)

    const handleTitleChange = (e: any) => {
        setTodoTitle(e.target.value)
        if (!e.target.value) {
            setIsTitleValid(false)
        } else setIsTitleValid(true)
    }
    const handleHoursChange = (e: any) => {
        const newHours = e.target.value
        setHours(newHours)
        if (+newHours || +minutes || +seconds) {
            setIsTimeValid(true)
        } else {
            setIsTimeValid(false)
        }
    }
    const handleMinutesChange = (e: any) => {
        const newMinutes = e.target.value
        setMinutes(newMinutes)
        if (+hours || +newMinutes || +seconds) {
            setIsTimeValid(true)
        } else {
            setIsTimeValid(false)
        }
    }
    const handleSecondsChange = (e: any) => {
        console.log(e.target.value)
        const newSeconds = e.target.value
        setSeconds(newSeconds)
        if (+hours || +minutes || +newSeconds) {
            setIsTimeValid(true)
        } else {
            setIsTimeValid(false)
        }
    }


    const handleHoursFocus = (e: any) => {
        if (e.target.value === "0") {
            setHours("")
        }
    }
    const handleMinutesFocus = (e: any) => {
        if (e.target.value === "0") {
            setMinutes("")
        }
    }
    const handleSecondsFocus = (e: any) => {
        if (e.target.value === "0") {
            setSeconds("")
        }
    }

    const resetFields = () => {
        setHours(0)
        setMinutes(0)
        setSeconds(0)
        setTodoTitle("")
    }
    const isFormValid = () => {
        let isAllFieldsValid
        let isFieldValid = []

        if (hours || minutes || seconds) {
            setIsTitleValid(true)
        } else {
            setIsTimeValid(false)
            isFieldValid.push(false)
        }

        if (!todoTitle.length) {
            setIsTitleValid(false)
            isFieldValid.push(false)
        }


        if (isFieldValid.includes(false)) {
            isAllFieldsValid = false
        } else {
            isAllFieldsValid = true
            resetFields()
        }

        return isAllFieldsValid
    }

    const handleClick = () => {
        if (isFormValid()) {
            const totalSeconds = +hours * 3600 + +minutes * 60 + +seconds
            console.log()
            props.addTimer(todoTitle, totalSeconds)
            console.log("title: " + todoTitle + " time: " + hours + "h " + minutes + "m " + seconds + "s")
        }
    }

    return (
        <div className={styles.timerAddContainer}>
            <h2>Timer title</h2>
            <label>
                <input type="text"
                       className={isTitleValid ? "" : styles.timerAddInvalid}
                       value={todoTitle}
                       onChange={(e) => {
                           handleTitleChange(e)
                       }}
                       placeholder={"Title"}
                />
            </label>
            {
                isTitleValid ? null :
                    <span className={styles.timerAddErr}><span>&#9888;</span>Fill timer title</span>
            }
            <div className={styles.timer_add__time_container}>
                <h2>Timer time</h2>
                <div className={styles.timer_add__time}>
                    <label>
                        Hours
                        <input type="number"
                               className={isTimeValid && hours >= 0 ? "" : styles.timerAddInvalid}
                               value={hours}
                               onChange={(e) => {
                                   handleHoursChange(e)
                               }}
                               onFocus={(e)=>{handleHoursFocus(e)}}
                               placeholder={"Hours"}
                               min={"0"}
                        />
                    </label>
                    <label>
                        Minutes
                        <input type="number"
                               className={isTimeValid && minutes >= 0 ? "" : styles.timerAddInvalid}
                               value={minutes}
                               onChange={(e) => {
                                   handleMinutesChange(e)
                               }}
                               onFocus={(e)=>{handleMinutesFocus(e)}}
                               placeholder={"Minutes"}
                               min={"0"}
                        />
                    </label>
                    <label>
                        Seconds
                        <input type="number"
                               className={isTimeValid && seconds >= 0 ? "" : styles.timerAddInvalid}
                               value={seconds}
                               onChange={(e) => {
                                   handleSecondsChange(e)
                               }}
                               onFocus={(e)=>{handleSecondsFocus(e)}}
                               placeholder={"Seconds"}
                               min={"0"}
                        />
                    </label>
                </div>
                {
                    isTimeValid ? null :
                        <span className={styles.timerAddErr}><span>&#9888;</span>Fill timer time</span>
                }
            </div>
            <div className={styles.timerAddBtn}>
                <Button textContent={"ADD TIMER"}
                        clickHandle={handleClick}
                />
            </div>
        </div>
    )
}
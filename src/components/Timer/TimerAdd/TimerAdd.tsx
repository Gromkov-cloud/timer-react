import React, {useState} from "react";
import styles from "./TimerAdd.module.css"
import {Button} from "../../Button/Button";

type TimerAddProps = {
    addTimer: any
}

export const TimerAdd = (props: TimerAddProps) => {

    const [todoTitle, setTodoTitle] = useState<string>("")
    const [todoTime, setTodoTime] = useState<number | "">("")
    const [isValid, setIsValid] = useState<boolean>(true)

    const handleTitleChange = (e: any) => {
        setTodoTitle(e.target.value)
    }
    const handleTimeChange = (e: any) => {
        setTodoTime(e.target.value)
    }

    const handleClick = () => {
        if (todoTitle.length && todoTime) {
            setTodoTitle("")
            setTodoTime("")
            props.addTimer(todoTitle,todoTime)
            setIsValid(true)
        } else  {
            setIsValid(false)
        }
    }

    return (
        <div className={styles.timerAddContainer}>
            <label>
                <input type="text"
                       className={isValid || todoTitle.length ? "" : styles.timerAddInvalid}
                       value={todoTitle}
                       onChange={(e) => {
                           handleTitleChange(e)
                       }}
                       placeholder={"Timer title"}
                />
            </label>
            <label>
                <input type="number"
                       className={isValid || todoTime ? "" : styles.timerAddInvalid}
                       value={todoTime}
                       onChange={(e) => {
                           handleTimeChange(e)
                       }}
                       placeholder={"Timer total time"}
                       min={"1"}
                />
            </label>
            {isValid ? null : <span className={styles.timerAddErr}>	<span>&#9888;</span> Fill in all the fields</span>}
            <div className={styles.timerAddBtn}>
                <Button textContent={"ADD TIMER"}
                    clickHandle={handleClick}
                />
            </div>
        </div>
    )
}
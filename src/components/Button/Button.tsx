import React from "react";
import styles from "./Button.module.css"

type ButtonProps = {
    textContent: string
    clickHandle?: any
}

export const Button = (props: ButtonProps) => {
    return (
        <button className={styles.button}
                onClick={props.clickHandle}
        >
            {props.textContent}
        </button>
    )
}
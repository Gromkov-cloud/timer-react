import React from "react";
import styles from "./Header.module.css"
import {LoginLink} from "../Login/LoginLink";

export const Header = () => {
    return (
        <header className={styles.header}>
            <a className={styles.logo}>TIMER</a>
            <LoginLink />
        </header>
    )
}
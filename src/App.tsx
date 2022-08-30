import React from 'react';
import "./App.css"
import {Header} from "./components/Header/Header";
import {Timer} from "./components/Timer/Timer";
import {TimerAdd} from "./components/Timer/TimerAdd/TimerAdd" ;
import {useTimer} from "./hooks/useTimer";

function App() {

    const {timers, addTimer, timerStart, timerPause, timerReset} = useTimer()

    return (
        <>
            <div className="appContainer">
                <Header/>
                <TimerAdd addTimer={addTimer}/>
                <Timer
                    timers={timers}
                    timerStart={timerStart}
                    timerPause={timerPause}
                    timerReset={timerReset}
                />
            </div>
        </>
    );
}

export default App;

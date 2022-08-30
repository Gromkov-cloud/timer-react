export type ITimer = {
    title: string,
    currentTime: number,
    totalTime: number,
    isPaused: boolean,
    timerId: number,
    timerInterval?: any
}

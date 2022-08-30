import React, {useState} from "react";


export const Todo = () => {

    const [todoTitle, setTodoTitle] = useState<string>("")
    const [todoList, setTodoList] = useState<Array<string>>([])

    const handleChange = (e: any) => {
        setTodoTitle(e.target.value)
    }
    const handleClick = () => {

        setTodoList([todoTitle, ...todoList])
        setTodoList((todoList) => {
            let todos = [...todoList]
            todos.push(todoTitle)
            return todos
        })
        setTodoTitle("")
    }

    const printTodos = () => {
        return (
            todoList.map((todo) => (
                <p key={Math.random()}>{todo}</p>
            ))
        )
    }

    return (
        <>
            <input type="text"
                   value={todoTitle}
                   onChange={(e) => {
                       handleChange(e)
                   }}
            />
            <button onClick={handleClick}>Add todo</button>
            {todoList.length ? printTodos() : <p>your todos will be here</p>}
        </>
    )
}
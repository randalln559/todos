import './ToDoUser.css';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import handleChange from '../actions/handleChange';

export default function ToDoUser() {

    const [todo, setTodo] = useState({
        todoItem: '',
        finished: false,
    });
    const [user, setUser] = useState([]);
    const [todoList, setTodoList] = useState([]);
    const { _id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/${_id}`)
            .then(res => {
                setUser(res.data)
                setTodoList(res.data.todosList)
            })
            .catch(err => console.log(err))
    }, [_id]);

    const changeHandler = (e) => setTodo(handleChange(todo, e));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!todo.todoItem) return;
        axios.put(`http://localhost:8080/api/${_id}`, todo)
            .then(res => setTodoList(res.data.todosList))
            .catch(err => console.log(err))
        setTodo({
            todoItem: '',
            finished: false,
        });
    }

    const handleLogOut = () => setUser([]);

    const handleDoneTodo = (e, index) => {
        if (e.target.className === 'close') return;
        let [updatedTodo] = todoList.filter((item, i) => {
            return i === index ? (item.finished = !item.finished, item) : null;
        });
        todoList.splice(index, 1, updatedTodo);
        axios.put(`http://localhost:8080/api/todoList/${_id}`, todoList)
            .then(res => setTodoList(res.data))
            .catch(err => console.log(err))
    }

    const checked = () => {
        const checked = {
            'background': ' #888',
            'color': '#fff',
            'textDecoration': 'line-through',
        }
        return checked;
    }

    const handleDelete = (index) => {
        let updatedTodo = todoList.filter((item, i) => i !== index);
        axios.put(`http://localhost:8080/delete/${_id}`, updatedTodo)
            .then(res => setTodoList(res.data))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div className='userHeader'>
                <h2>{user.first}'s To Do List</h2>
                <div className='toDoContainer'>
                    <input
                        value={todo.todoItem || ''}
                        onChange={changeHandler}
                        name='todoItem'
                        className='toDoInput'
                        type='text'
                        placeholder='Title...'
                    />
                    <span className='addBtn' onClick={handleSubmit}>Add</span>
                </div>
            </div>
            <ul className='todoUl'>
                {
                    todoList.map((todo, index) => (
                        <li
                            key={index}
                            onClick={(e) => handleDoneTodo(e, index)}
                            style={todo.finished ? checked() : null}
                            className={todo.finished ? 'checked' : ''}
                        >
                            {todo.todoItem}
                            <span className='close' onClick={() => handleDelete(index)}>×</span>
                        </li>
                    ))
                }
            </ul>
            <div className='logOut'>
                <Link to='/'>
                    <button className='logOutBtn' onClick={handleLogOut}>Log Out</button>
                </Link>
            </div>
        </div>
    )
}
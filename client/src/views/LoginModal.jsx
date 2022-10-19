import './LoginModal.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import handleChange from '../actions/handleChange';

export default function LoginModal({ handleModalChange }) {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({});

    const changeHandler = (e) => setInputs(handleChange(inputs, e));

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get('http://localhost:8080/api/login', { params: inputs })
            .then(res => {
                res.data.message === "Login Successfull" ? navigate(`/toDoUser${res.data.data._id}`)
                    : res.data.message === 'Login Failed' ? setInputs(values => ({ ...values, psw: '' }))
                        : setInputs({});
            })
            .catch(err => console.log('err', err))
    }

    return (
        <div className='loginModal'>
            <form className='animateMdl' onSubmit={handleSubmit}>
                <span className='closeMdl' title="loginModal" onClick={handleModalChange}>&times;</span>
                <div className='loginMdlHeader'>
                    <h1>Login to your To Do List</h1>
                </div>
                <div className='loginContainer'>
                    <label htmlFor="email"><b>Email</b></label>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        name="email"
                        value={inputs.email || ''}
                        onChange={changeHandler}
                        required
                    />
                    <label htmlFor="psw"><b>Password</b></label>
                    <input
                        id='userPsw'
                        type="password"
                        placeholder="Enter Password"
                        name="psw"
                        value={inputs.psw || ''}
                        onChange={changeHandler}
                        required
                    />
                </div>
                <div className='loginFooter'>
                    <input type='submit' value='Login' className='loginBtn' />
                </div>
            </form>
        </div>
    )
};
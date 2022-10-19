import './Login.css';
import LoginModal from './LoginModal';
import CreateUserModal from './CreateUserModal';
import { useState } from 'react';

export default function Login() {

    const [loginMdl, setLoginMdl] = useState(false);
    const [createUserMdl, setCreateUserMdl] = useState(false);

    window.onclick = function (e) {
        if (e.target.className === 'userModal') setCreateUserMdl(p => !p);
        if (e.target.className === 'loginModal') setLoginMdl(p => !p);
    }

    const handleModalChange = (e) => {
        if (e.target.title === 'loginModal') setLoginMdl(p => !p);
        if (e.target.title === 'createUserMdl') setCreateUserMdl(p => !p);
        if (e.target.title === 'submitUser') setCreateUserMdl(p => !p);
    }

    return (
        <div className='container'>
            {createUserMdl && <CreateUserModal handleModalChange={handleModalChange} />}
            {loginMdl && <LoginModal handleModalChange={handleModalChange} />}

            <div className='display'>
                <span>To Do List</span>
                <p>Creating your todo list is as easy as signing in.</p>
                <button title='loginModal' onClick={handleModalChange}>Login</button>
                <p onClick={handleModalChange} className='newAccBtn' title='createUserMdl'>Create a new account</p>
            </div>
        </div>
    )
}
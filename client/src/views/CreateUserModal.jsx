import './CreateUserModal.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PswMessage from './PswMessage';
import handleChange from '../actions/handleChange';
import EmailTaken from './emailTaken';

export default function CreateUserModal({ handleModalChange }) {

    const [inputs, setInputs] = useState({});
    const [pswMessage, setPswMessage] = useState(false);
    const [password, setPassword] = useState(false);
    const [taken, setTaken] = useState(false);

    let validPsw = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(inputs.psw);

    const handlePswMessage = () => setPswMessage(p => !p);

    const passwordHandler = () => setPassword(true);

    const navigate = useNavigate();

    const changeHandler = (e) => setInputs(handleChange(inputs, e));

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/create`, inputs)
            .then(res => {
                if (res.data.code === 11000) {
                    setInputs(values => ({ ...values, email: '' }))
                    setTaken(p => !p)
                } else {
                    navigate(`/toDoUser${res.data._id}`)
                }
            })
            .catch(err => console.log(err))
        handleModalChange(e);
    }

    const emailStyle = () => {
        return {
            'width': '100%',
            'padding': '12px',
            'border': '1px solid #ccc',
            'borderRadius': '4px',
            'boxSizing': 'borderBox',
            'marginTop': '6px',
            'marginBottom': '0',
        }
    }

    return (
        <div className='userModal'>
            <form className='animateMdl' onSubmit={handleSubmit}>
                <div className='userMdlHeader'>
                    <h2>Create Your Account</h2>
                </div>
                <div className='userLoginMdl'>
                    <label htmlFor='userFirstName'>First Name</label>
                    <input
                        type='text'
                        id='userFirstName'
                        name='first'
                        value={inputs.first || ''}
                        onChange={changeHandler}
                        required
                    />
                    <label htmlFor='userLastName'>Last Name</label>
                    <input
                        type='text'
                        id='last'
                        name='last'
                        value={inputs.last || ''}
                        onChange={changeHandler}
                        required
                    />
                    <label htmlFor='username'>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        style={taken ? emailStyle() : null}
                        value={inputs.email || ''}
                        onChange={changeHandler}
                        onFocus={setTaken(p => p ? !p : null)}
                        required
                    />
                    {taken && <EmailTaken />}
                    <label htmlFor='psw'>Password</label>
                    <input
                        type='password'
                        name='psw'
                        id='psw'
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
                        value={inputs.psw || ''}
                        onChange={changeHandler}
                        onFocus={handlePswMessage}
                        onBlur={handlePswMessage}
                        required
                    />
                    {
                        pswMessage &&
                        <PswMessage
                            psw={inputs.psw || ''}
                            password={password}
                            passwordHandler={passwordHandler}
                            validPsw={validPsw}
                        />
                    }
                    {
                        validPsw &&
                        <input
                            type='submit'
                            value='Submit'
                            title='submitUser'
                        />
                    }
                </div>
            </form>
        </div>
    )
};
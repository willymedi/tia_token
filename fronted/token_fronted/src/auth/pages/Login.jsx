/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../../api/loginUser';

export const Login = (props) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
    }

    
    const {login} = useContext(AuthContext)

    const navigate = useNavigate();

    const onLogin = async() => {
        if (username.trim().length == 0){
            return;
        }
        const sucess = await loginUser(username);
        if (sucess) {
            login(username)
            navigate('/token', {
                replace: true
            });
        }
    }

    return (
        <div className="auth-form-container">
            <h2>Iniciar sesion</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Nombre de usuario</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nombre de usuario" id="username" name="username" />
                <button type="submit" onClick={onLogin}>Inicia sesion</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>No tienes una cuenta? Registrate.</button>
        </div>
    )
}
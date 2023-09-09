/* eslint-disable react/prop-types */
import { useState } from "react";
import { registerUser } from "../../api/registerUser";

export const Register = (props) => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name);
    }
    const onRegister = async() => {
        if (username.trim().length == 0 || name.trim().length == 0){
            return;
        }
        await registerUser(username, name);
        setUsername("")
        setName("")
    }


    return (
        <div className="auth-form-container">
            <h2>Registrarse</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Nombre de usuario</label>
            <input value={username} name="username" onChange={(e) => setUsername(e.target.value)} id="username" placeholder="username" />
            <label htmlFor="name">Nombre</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" id="name" name="email" />
            <button onClick={onRegister} type="submit">Registrate</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Ya tienes cuenta? Inicia sesión aqui.</button>
    </div>
    )
}
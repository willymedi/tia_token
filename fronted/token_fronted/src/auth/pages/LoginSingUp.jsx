import { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';
import './LoginSingUp.css'
export const LoginSignup = () => {

    const [currentForm, setCurrentForm] = useState('login');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
      }
    

    return (
        <div className="App">
          {
            currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
          }
        </div>
      );
}
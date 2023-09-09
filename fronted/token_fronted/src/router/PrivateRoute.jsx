import {Navigate} from 'react-router-dom'
import { useContext } from "react"
import { AuthContext } from "../auth/context/AuthContext"


// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({children}) => {
    const {logged} = useContext(AuthContext)
  return (logged) ? children : <Navigate to="/auth"/>
}

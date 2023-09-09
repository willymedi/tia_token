import {Routes, Route} from 'react-router-dom'
import { LoginSignup } from '../auth/pages/LoginSingUp'
import { TokenRoutes } from '../routes/TokenRoutes'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path='/auth' element={
                <PublicRoute>
                    <LoginSignup/>
                </PublicRoute>
            }/>
            <Route path='/*' element={
                <PrivateRoute>
                    <TokenRoutes/>
                </PrivateRoute>
            }/>            
        </Routes>
    </>
  )
}

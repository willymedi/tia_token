import {Routes, Route, Navigate} from 'react-router-dom'
import { TokenPage } from '../token/pages/TokenPage'
import { TokenUsagePage } from '../tokenUsage/pages/TokenUsagePage'
import { Navbar } from '../ui/components'


export const TokenRoutes = () => {
    return (
        <>
            <Navbar/>
            <div className="container">
            <Routes>
                <Route path='token' element={<TokenPage/>}></Route>
                <Route path='tokenUsage' element={<TokenUsagePage/>}></Route> 
                <Route path='/' element={<Navigate to="/token"/>}></Route>        
            </Routes>
            </div>
        </>
      )
}

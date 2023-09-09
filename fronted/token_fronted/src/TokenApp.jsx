import { AuthProvider } from "./auth/context/AuthProvider"
import { AppRouter } from "./router/AppRouter"

export const TokenApp = () => {
    return(
        <>
            <AuthProvider> 
                <AppRouter/>
            </AuthProvider>
        </>
    )
}
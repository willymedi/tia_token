import { useContext, useState } from "react"
import { AuthContext } from "../../auth/context/AuthContext"
import { generarToken } from "../../api/generarToken";
import Swal from 'sweetalert2';
import { useTokenOpt } from "../../api/useTokenOpt";
import Countdown from "../components/Countdown";

export const TokenPage = () => {

    const [showCountDown, setShowCountDown] = useState(false);
    const [tokenValue, setTokenValue] = useState("000000");
    const [initialTime, setInitialTime] = useState(0)

    const { user } = useContext(AuthContext);

    const getToken = async () => {
        const token = await generarToken(user.name);
        if (!token) {
            return;
        }
        console.log(token)
        const currentTime = new Date();
        const expiredTime = new Date(token.expired_at);
        const durationToken = Math.floor((expiredTime - currentTime) / 1000);
        setTokenValue(token.token_value)
        setInitialTime(durationToken)
        setShowCountDown(true)
        console.log(`Diferencia en segundos: ${durationToken}`);
    }

    const useToken = async () => {
        const token = await useTokenOpt(user.name, tokenValue)
        if (!token) {
            return;
        }
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: "Token usado correctamente",
        });
    }
    return (
        <>
            <div className="container">
                <div className="header mt-2">
                    <div className="row">
                        <div className="col-md-6">
                            <button onClick={getToken} className="btn btn-primary">Mostrar token</button>
                        </div>
                        <div className="col-md-6">
                            <button disabled={!showCountDown} onClick={useToken} className="btn btn-primary">Usar token</button>
                        </div>
                    </div>
                </div>

                {showCountDown && (

                    <Countdown initialTime={initialTime} token={tokenValue} getToken={getToken} />
                )}

            </div>

        </>
    )
}

import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from './apiUrl';

export const useTokenOpt = async (username, token_value) => {
    try {
        const token = await axios.get(`${API_URL}/token/usarToken/`, {params:{cliente:username, token:token_value}});
        return token.data
      } catch (error) {
        const errorMessage = error.response && error.response.data && error.response.data.error
        ? error.response.data.error
        : 'Error desconocido';

        Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        });
      }
}
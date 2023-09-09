import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from './apiUrl';

export const loginUser = async (username) => {
    try {
        await axios.post(`${API_URL}/user/login`, {
          username: username
        });
        return true
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
      return false;
}
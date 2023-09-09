import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from './apiUrl';

export const registerUser = async (username, first_name) => {
    try {
        await axios.post(`${API_URL}/user/`, {
          username: username, first_name: first_name
        });
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: "Usuario registrado correctamente",
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
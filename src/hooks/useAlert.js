import Swal from 'sweetalert2/src/sweetalert2.js';
import { ref } from 'vue';

const useAlert = () => {
  const showConfirmation = ref(true);

  async function warningAlert (customOptions = { title: 'Content', text: 'Text' }) { 
    const options = Object.assign({
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      iconColor: '#e74c3c',
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#19191A'
    }, customOptions);
  
    const { value: response } = showConfirmation.value ? await Swal.fire(options) : { value: true };
    
    if (response !== undefined) {
      if (response) {
        showConfirmation.value = false;
      }
      return true;
    }

    return false;
  }
  
  return {
    showConfirmation,
    warningAlert
  }
}

export default useAlert;
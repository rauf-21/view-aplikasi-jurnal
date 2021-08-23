import firebase from 'firebase/app';
import 'firebase/firestore';

// Hooks
import useAlert from '@/hooks/useAlert';

const useFirestore = () => {
  async function addDocument (collectionName, data) {
    
  }

  return {
    addDocument
  }
}

export default useFirestore;
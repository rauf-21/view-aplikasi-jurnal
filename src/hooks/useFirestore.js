import firebase from 'firebase/app';
import 'firebase/firestore';

// Hooks
import useAlert from '@/hooks/useAlert';

const useFirestore = () => {
  async function addDocument (collectionName, data) {
    return firebase.firestore()
      .collection(collectionName)
      .doc(`${data.metadata.author}(${data.metadata.date})`)
      .set(data)
      .then(() => ({
        success: true,
        message: 'Document added successfully'
      }))
      .catch(err => ({
        success: false,
        message: 'Failed to add document'
      }));  
  }
  return {
    addDocument
  }
}

export default useFirestore;
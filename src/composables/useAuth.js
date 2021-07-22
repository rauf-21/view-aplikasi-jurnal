import firebase from 'firebase';
import 'firebase/auth';
import store from '@/store';

const useAuth = () => {

  async function isAuthenticated () {
    return new Promise((resolve) => {
      firebase
        .auth()
        .onAuthStateChanged( user => {
          if (user) {
            store.setUser({
              email: user.email,
              sync: false
            });
            store.setIsAuthenticated(true);
          }
          else store.setIsAuthenticated(false);          
          resolve(store.state.isAuthenticated);
        })
    });
  }

  return {
    isAuthenticated
  }
}

export default useAuth;

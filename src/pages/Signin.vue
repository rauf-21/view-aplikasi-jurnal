<template>
  <div class="signin">
    <h1 class="signin__title">Sign in</h1>
    <label class="label">Email</label>
    <input 
      class="input" 
      type="text"
      v-model="user.email"
    >
    <label class="label">Password</label>
    <input 
      class="input" 
      type="password"
      v-model="user.password"
    >
    <ButtonAction 
      :action="signin"
      text="Sign in"
    />
    <div class="to-signup">
      <p class="label">Don't have an account ?</p>
      <router-link
        class="link"
        :to="{ name: 'signup' }"
      >
        Sign up
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import firebase from 'firebase/app';
import { useRouter } from 'vue-router';
import ButtonAction from '@/components/ButtonAction.vue';
import { useToast } from 'vue-toastification';
import toastConfig from '@/config/toast';
import 'firebase/auth';
import store from '@/store';

export default {
  components: {
    ButtonAction
  },
  setup () {
    const user = ref({
      email: '',
      password: ''
    });

    const toast = useToast();

    const router = useRouter();

    async function signin () {
      let result = { success: false };
      
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(
            user.value.email,
            user.value.password
          );

        if (!response.additionalUserInfo.isNewUser) { 
          result.success = true;
          router.push({ name: 'journal' });
          store.setUser({
            email: user.value.email,
            sync: false
          });
        }

      }
      catch (error) {
        toast.clear();
        toast.error(error.message, toastConfig.error);
        result.success = false;
      }

      return result.success;
    }

    return {
      user,
      signin    
    }  
  }  
}

</script>
<template>
  <div class="signup">
    <h1 class="signup__title">Sign up</h1>
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
    <button 
      class="button button--primary" 
      @click="signup"
    >
      Sign up
    </button>
    <div class="to-signin">
      <p class="label">Already have an account ?</p>
      <router-link
        class="link"
        :to="{ name: 'signin' }"
      >
        Sign in
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import firebase from 'firebase/app';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import toastConfig from '@/config/toast';
import 'firebase/auth';

export default {
  setup () {
    const user = ref({
      email: '',
      password: ''
    });

    const toast = useToast();

    const router = useRouter();

    async function signup () {
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            user.value.email,
            user.value.password
          );

        if (response.additionalUserInfo.isNewUser) {
          toast.clear();
          toast.success('Signup success', toastConfig.long);
          router.push({ name: 'signin' });
        }
      }
      catch (error) {
        toast.clear();
        toast.error(error.message, toastConfig.error);
      }
    }

    return {
      user,
      signup

    }
  }
}

</script>
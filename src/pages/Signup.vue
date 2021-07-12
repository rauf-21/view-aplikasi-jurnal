<template>
  <div class="signup">
    <label class="label">Username</label>
    <input 
      class="input" 
      type="text"
      v-model="signupData.userUniqueName"
    >
    <label class="label">Password</label>
    <input 
      class="input" 
      type="password"
      v-model="signupData.password"
    >
    <button 
      class="button button--primary" 
      @click="handleSignup"
    >
      Sign up
    </button>
    <div class="to-signin">
      <p class="label">Already have an account ?</p>
      <a 
        class="link" 
        href=""
      >
        Sign in
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const signupData = ref({
  userUniqueName: '',
  userName: '',
  password: ''
})

function handleSignup () {
  fetch ('http://localhost:5500/user/signup', {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(signupData.value)
  })
    .then( result => console.log(result))
    .catch( err => console.error(err));
}

</script>
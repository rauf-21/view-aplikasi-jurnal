<template>
  <div class="signin">
    <label class="label">Username</label>
    <input 
      class="input" 
      type="text"
      v-model="signinData.userUniqueName"
    >
    <label class="label">Password</label>
    <input 
      class="input" 
      type="password"
      v-model="signinData.password"
    >
    <button 
      class="button button--primary" 
      @click="handleSignin"
    >
      Sign in
    </button>
    <div class="to-signup">
      <p class="label">Don't have an account ?</p>
      <a 
        class="link" 
        href=""
      >
        Sign up
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const signinData = ref({
  userUniqueName: '',
  password: ''
});

function handleSignin () {
  fetch ('http://localhost:5500/user/signin', {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(signinData.value)
  })
    .then( res => res.json())
    .then( data => console.log(data))
    .catch( err => console.error(err));
}

</script>
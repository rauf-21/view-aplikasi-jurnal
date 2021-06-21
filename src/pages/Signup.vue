<template>
  <input 
    type="text"
    v-model="signupData.userUniqueName"
  >
  <input 
    type="text"
    v-model="signupData.userName"
  >
  <input 
    type="password"
    v-model="signupData.password"
  >
  <button @click="handleSignup">Sign up</button>
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
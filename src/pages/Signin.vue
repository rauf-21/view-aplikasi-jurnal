<template>
  <input 
    type="text"
    v-model="signinData.userUniqueName"
  >
  <input 
    type="password"
    v-model="signinData.password"
  >
  <button @click="handleSignin">Sign in</button>
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
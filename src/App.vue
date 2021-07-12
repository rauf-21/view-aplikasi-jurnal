<template>
  <Suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
</template>

<script>
import Journal from '@/pages/Journal.vue'; 
import Signup from './pages/Signup.vue';
import Signin from './pages/Signin.vue';

export default {
  components: { Journal, Signup, Signin }
}

</script>

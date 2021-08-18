<template>
  <NavigationBar />
  <router-view v-slot="{ Component }">
    <transition name="slide-fade">
      <component :is="Component" /> 
    </transition>
  </router-view>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';

export default {
  components: { 
    NavigationBar 
  }
}

</script>
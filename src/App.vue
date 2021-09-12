<template>
  <n-config-provider :theme="darkTheme">
    <NavigationBar />
    <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <component :is="Component" /> 
      </transition>
    </router-view>
  </n-config-provider>
</template>

<script>
import { NConfigProvider, darkTheme } from 'naive-ui';
import NavigationBar from '@/components/NavigationBar.vue';

export default {
  components: { 
    NavigationBar,
    NConfigProvider
  },
  setup () {
    return {
      darkTheme
    }
  }
}

</script>
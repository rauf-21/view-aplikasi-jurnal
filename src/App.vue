<template>
  <Suspense>
    <template #default>
      <div>
        <NavigationBar />
        <router-view v-slot="{ Component }">
          <transition name="slide-fade">
            <component :is="Component" /> 
          </transition>
        </router-view>
      </div>
    </template>
    <template #fallback>
      <div class="fallback">
        <p class="fallback__text" style="">Loading...</p>
      </div>
    </template>
  </Suspense>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';

export default {
  components: { 
    NavigationBar 
  }
}

</script>
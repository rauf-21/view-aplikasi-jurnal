<template>
  <button
    class="button button--primary button--center"
    @click="handleClick"
  >
    <span v-if="!isLoading">{{ text }}</span>
    <Spinner 
      v-else
      :size="20"
      :color="'#2ecc71'"
    />    
  </button>
</template>

<script>
import { ref, toRefs } from 'vue';
import Spinner from 'epic-spinners/src/components/lib/HalfCircleSpinner.vue'

export default {
  components: {
    Spinner
  },
  props: {
    action: {
      type: Function,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  setup (props, { emit }) {
    const { action, text } = toRefs(props);

    const isLoading = ref(false);

    async function handleClick () {      
      isLoading.value = true;
      
      try {
        const response = await action.value();
        
        if (response) {
          emit('actionDone', response);
        }
      }
      catch (error) {
        console.error(error);
      }
      
      isLoading.value = false;
    }

    return {
      text,
      handleClick,
      isLoading
    }
  }
}
</script>
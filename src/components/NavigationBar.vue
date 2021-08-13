<template>
  <nav class="navigation">
    <router-link
      class="link home"
      :to="{ name: 'journal' }"
    >
      <FAIcon 
        class="icon"
        icon="home"
      />
    </router-link>
    <div class="navigation-action">
      <button :class="`button button--dark button--${ user.sync ? 'primary' : 'warning' }`">
        <FAIcon
          class="icon"
          icon="sync-alt"
        />
        <span>{{ user.sync ? 'Sync' : 'Not sync' }}</span>
      </button>
      <router-link 
        class="link"
        :to="{ name: 'signin' }"
      >
         <button :class="`button button--dark button--${ user.email ? 'primary' : 'warning' }`">
            <FAIcon
              class="icon" 
              icon="user-circle" 
            />    
            <span>{{ user.email ? user.email : 'Not logged in' }}</span>
        </button>
      </router-link>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import useAuth from '@/composables/useAuth';
import store from '@/store';

export default {
  setup () {
    const user = ref({
      email: null,
      sync: false
    });

    const { isAuthenticated } = useAuth();

    watch(store.state, (prevValue, value) => {
      user.value.email = value.user.email;
    });

    onMounted ( async () => {
      const response = await isAuthenticated();
        
      if (response) {
        user.value.email = store.state.user.email,
        user.value.sync = store.state.user.sync
      }
    });

    return {
      user
    }
  }
}
</script>
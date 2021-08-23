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
      <button 
        :class="`button button--dark button--${ user.sync ? 'primary' : 'warning' }`"
        @click="syncData"
      >
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

// Config
import toastConfig from '@/config/toast';

// Hooks
import useAuth from '@/hooks/useAuth';
import useDiary from '@/hooks/useDiary';
import useFirestore from '@/hooks/useFirestore';
import { useToast } from 'vue-toastification'; 

// Store
import store from '@/store';

export default {
  setup () {
    const { isAuthenticated } = useAuth();
    const { toast } = useToast();
    const { getAllDiary } = useDiary(store.state.date ?? new Date()); 
    const { addDocument } = useFirestore();

    const user = ref({
      email: null,
      sync: false
    });

    watch(store.state, async (prevValue, value) => {
      const diaries = await getAllDiary();
      const isAnonymousDiary = (el => el.metadata.author === 'anonymous');

      user.value.email = value.user.email;
      user.value.sync = value.user.sync;

      if ((diaries.some(el => isAnonymousDiary(el))))  {
        const newDiaries = diaries.map(el => ({
          metadata: {
            author: user.value.email,
            data: el.metadata.date,
            score: el.metadata.score
          },
          activities: [ ...el.activities ]
        }))
        
      }
    });

    onMounted ( async () => {
      const response = await isAuthenticated();
        
      if (response) {
        user.value.email = store.state.user.email,
        user.value.sync = store.state.user.sync
      }
    });

    async function syncData () {
      if (user.value.sync) {
        toast.info('No need to! Data is already synced');
        return;
      } 

      // console.log(store.state.date);
      // store.setDate();
      addDocument('journals', await getAllDiary());
    }

    return {
      user,
      syncData
    }
  }
}
</script>
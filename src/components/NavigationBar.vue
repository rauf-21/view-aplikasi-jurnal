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
        class="button button--dark button--primary"
        v-if="user.email"
        @click="loadData"
      >
        <FAIcon
          class="icon"
          icon="cloud-download-alt"
        />
        <span>Load data</span>  
      </button>
      <button 
        :class="`button button--dark button--${ user.sync ? 'primary' : 'warning' }`"
        @click="syncData"
      >
        <FAIcon
          class="icon"
          icon="cloud-upload-alt"
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
import { ref, onMounted, watch, getCurrentInstance } from 'vue';

// Config
import toastConfig from '@/config/toast';

// Hooks
import useAuth from '@/hooks/useAuth';
import useDiary from '@/hooks/useDiary';
import useFirestore from '@/hooks/useFirestore';
import { useToast } from 'vue-toastification'; 

// Store
import store from '@/store';

// Firebase
import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  setup () {
    const { isAuthenticated } = useAuth();
    const toast = useToast();
    const { setDiaries, getAllDiary } = useDiary(store.state.date ?? new Date()); 
    const { addDocument } = useFirestore();
    const instance = getCurrentInstance();

    const user = ref({
      email: null,
      sync: false
    });

    watch(store.state, async (prevValue, value) => {
      const diaries = await getAllDiary();
      const isAnonymousDiary = (el) => el.metadata.author === 'anonymous';

      try {
        console.log(diaries);  
        diaries.some(isAnonymousDiary)      
      }
      catch (err) {
        console.error('Error here : ' + err);
      }

      user.value.email = value.user.email;
      user.value.sync = value.user.sync;

      if (diaries.some(isAnonymousDiary) && value.isAuthenticated) {
        const newDiaries = diaries.map(diary => ({
          metadata: {
            author: value.user.email,
            date: diary.metadata.date,
            score: diary.metadata.score
          },
          activities: [...diary.activities]
        }));

        const result = await setDiaries(newDiaries);
        
        if (result.success) {
          toast.success('New changes are made. Please refresh the page.', toastConfig.infinite);          
        }        
      }
    });

    onMounted ( async () => {
      const response = await isAuthenticated();
        
      if (response) {
        user.value.email = store.state.user.email,
        user.value.sync = store.state.user.sync
      }

      // if (store.state.user.email !== null) {
      //   syncData();
      // }
    });

    async function syncData () {
      if (user.value.sync) {
        toast.info('No need to! Journal is already synced to cloud', toastConfig.short);
        return;
      } 
      const diaries = await getAllDiary();

      for (const diary of diaries) {        
        try {
          const result = await addDocument('journals', diary);
        }
        catch (err) {
          console.log(err)
          store.state.user.sync = false;   
        }
      }

      store.state.user.sync = true; 
    }

    async function loadData () {
      let data = [];
      firebase.firestore()
        .collection('journals')
        .where('metadata.author', '==', store.state.user.email)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
        })
        .then(() => {
          setDiaries(data);
          toast.success('New changes are made. Please refresh the page.', toastConfig.infinite);
        })
        .catch(err => {
          console.error(err);
        });
    } 

    return {
      user,
      syncData,
      loadData
    }
  }
}
</script>
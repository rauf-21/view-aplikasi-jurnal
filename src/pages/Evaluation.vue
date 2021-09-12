<template>
  <div class="evaluation" style="padding: 1rem;">
    <n-h1>List journal</n-h1>
    <n-space vertical size="large">
      <n-layout>
        <n-layout-content content-style="padding: 24px;" v-for="(journal, index) in journals" :key="index">
          <p><b>Author</b> : {{ journal.metadata.author }}</p>
          <p><b>Date</b> : {{ journal.metadata.date }}</p>
          <p><b>Activity</b></p>
          <p v-for="(activity, index) in journal.activities">
            <span><b>{{ activity.start }} - {{ activity.end }}</b> : {{ activity.task }}</span>
          </p>
          <hr>          
        </n-layout-content>
      </n-layout>
    </n-space>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

import { useRouter } from 'vue-router';

import { NH1, NSpace, NLayout, NLayoutContent, NLayoutFooter } from 'naive-ui';

import store from '@/store';

import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  components: {
    NH1,
    NSpace,
    NLayout,
    NLayoutContent,
    NLayoutFooter
  },
  setup () {
    const journals = ref([]);

    const router = useRouter();

    onMounted(() => {
      let admin = false;

      firebase.firestore().collection("admins")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.id === store.state.user.email) admin = true;
          })
        })
        .then(() => {
          if (admin) {
            firebase.firestore().collection("journals")
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  journals.value.push(doc.data());
                });
              })
              .catch((error) => {
                console.log("Error getting documents: ", error);
              });
          } else {
            router.push({ name: 'home' });
          }
        })
    });

    return {
      journals
    }
  }
}
</script>
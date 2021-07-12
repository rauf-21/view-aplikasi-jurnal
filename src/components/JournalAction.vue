<template>
  <div class="journal-actions">
    <p class="label">Time schedule</p>
    <div class="journal-actions__time">
      <input 
        class="input" 
        type="time"
        v-model="start"
      >
      <input  
        class="input" 
        type="time"
        v-model="end"
      >
    </div>
    <p class="label">Activity</p>
    <textarea 
      class="textarea"
      placeholder="What are doing today ?" 
      v-model="task"
      spellcheck="false" 
    ></textarea>
    <div class="journal-actions__button">
      <button 
        class="button button--primary"
        @click="addNewActivity"
      >Add New Activity</button>
      <!-- <button class="button button--primary">Update Journal</button> -->
      <!-- <button class="button button--danger">Clear Activities</button> -->
      <!-- <button class="button button--primary">Update All</button> -->
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

export default {
  setup (_, { emit }) {
    const toast = useToast();

    const start = ref('');

    const end = ref('');
    
    const task = ref('');

    const addNewActivity = () => {
      if (
        start.value !== '' &&
        end.value !== '' &&
        task.value !== ''
      ) {
        emit('newActivityAdd', { 
          start: start.value, 
          end: end.value, 
          task: task.value 
        });

        toast.clear();

        toast.success('Saved successfully', {
          timeout: 5000
        });
       
        start.value = '';
        end.value = '';
        task.value = '';

        return;
      }

      toast.clear();

      toast.error('All column (start time, end time and task) must be filled', {
        timeout: 10000
      })
    }

    return {
      start,
      end,
      task,
      addNewActivity
    }
  }
}

</script>
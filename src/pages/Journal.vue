<template>
  <div v-if="diary !== null">
    <div class="journal">
      <div class="journal__actions">
        <JournalDatePicker
          :date="selectedDay"
          @dateChange="changeDate"
        />
        <JournalAction 
          @newActivityAdd="addNewActivity"
        />
      </div>
      <div class="journal__details">
        <JournalMetadata 
          :name="diary.metadata.name"
          :author="diary.metadata.author"
          :date="diary.metadata.date"
        />
        <JournalActivity 
          :activities="diary.activities"
          @activityUpdate="updateActivity"
        />
      </div>
    </div>
  </div>
  <div 
    class="fallback" 
    v-else
  >
    <p class="fallback__content">Loading...</p>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';

// Components
import JournalDatePicker from '@/components/JournalDatePicker.vue';
import JournalMetadata from '@/components/JournalMetadata.vue';
import JournalActivity from '@/components/JournalActivity.vue';
import JournalAction from '@/components/JournalAction.vue';

// Helper
import { formattedDate } from '@/helper';

// Hooks
import useDiary from '@/hooks/useDiary';
import { useToast } from 'vue-toastification'; 

// Config
import toastConfig from '@/config/toast';

// Store
import store from '@/store';

export default {
  components: { 
    JournalDatePicker, 
    JournalMetadata, 
    JournalActivity,
    JournalAction
  },

  setup () {
    const toast = useToast();
    
    const selectedDay = ref(new Date());    

    const { 
      diary, 
      getAllDiary,
      navigateDiary, 
      addDiaryActivity,
      updateDiaryActivity 
    } = useDiary(selectedDay.value);

    watch (selectedDay, async (selectedDay, prevSelectedDay) => {
      await navigateDiary(selectedDay);
      store.setDate(selectedDay);
    });
  
    (() => {
      // window.addEventListener('beforeunload', () => {
      //   alert(window.performance);
      // });
      console.log()
    })();

    function changeDate (date) { 
      selectedDay.value = date; 
    }

    async function addNewActivity (newActivity) {
      const response = await addDiaryActivity(selectedDay.value, newActivity);

      if (!response.success) {
        toast.clear();
        toast.error(response.message, toastConfig.error);
        
        return;
      }

      toast.clear();
      toast.success(response.message, toastConfig.success);
    }

    async function updateActivity (newActivity) {
      const response = await updateDiaryActivity(selectedDay.value, newActivity);

      if (!response.success) {
        toast.clear();
        toast.error(response.message, toastConfig.error);
        
        return;
      }

      toast.clear();
      toast.success(response.message, toastConfig.short);
    }

    return {
      selectedDay,
      diary,
      changeDate,
      addNewActivity,
      updateActivity
    }
  } 
}

</script>
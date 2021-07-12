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
          :author="diary.metadata.author"
          :date="diary.metadata.date"
          :score="diary.metadata.score"
        />
        <JournalActivity 
          :activities="diary.activities"
          @activityUpdate="updateActivity"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import JournalDatePicker from '@/components/JournalDatePicker.vue';
import JournalMetadata from '@/components/JournalMetadata.vue';
import JournalActivity from '@/components/JournalActivity.vue';
import JournalAction from '@/components/JournalAction.vue';
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification'; 
import useDiary from '@/composables/useDiary';

export default {
  components: { 
    JournalDatePicker, 
    JournalMetadata, 
    JournalActivity,
    JournalAction
  },

  async setup () {

    const selectedDay = ref(new Date());    

    const { 
      diary, 
      navigateDiary, 
      addDiaryActivity,
      updateDiaryActivity 
    } = await useDiary(selectedDay.value);

    watch (selectedDay, async (selectedDay, prevSelectedDay) => {
      await navigateDiary(selectedDay);
    });

    function changeDate (date) { selectedDay.value = date; }

    async function addNewActivity (newActivity) {
      await addDiaryActivity(selectedDay.value, newActivity);
    }

    async function updateActivity (newActivity) {
      await updateDiaryActivity(selectedDay.value, newActivity);
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
import { ref, watch, onMounted } from 'vue';

// Helper
import { formattedDate, copyObject } from '@/helper';

// Hooks
import useAuth from '@/hooks/useAuth';

// Local DB
import { diaryCollection } from '@/db';

// Store
import store from '@/store';

const { isAuthenticated }  = useAuth(); 

const useDiary = (targetDate) => {
  const date = ref(targetDate);
  const diary = ref(null);
  const diaries = ref([]);

  onMounted ( async () => {
    await navigateDiary(date.value);
  });

  async function getAllDiary () {
    let data = [];

    return diaryCollection.iterate( value => { 
      data.push(value);
    })
      .then(() => data);
  }

  async function navigateDiary (targetDate) {
    const key = formattedDate(targetDate);
    const data = await diaryCollection.getItem(key);

    if (data === null) {
      const emptyDiary = {
        metadata: {
          author: await isAuthenticated() ? store.state.user.email : 'anonymous',
          date: formattedDate(targetDate),
          score: 0
        },
        activities: []
      }

      try {
        diary.value = await diaryCollection.setItem(key, emptyDiary);     
      }
      catch (err) {
        console.error(`Failed to put new diary on local database : ${ err }`);
      }

      return;
    }

    diary.value = data;
  }

  async function addDiaryActivity (targetDate, newActivity) {
    try {
      const key = formattedDate(targetDate);
      
      diary.value.activities = [...diary.value.activities, newActivity];

      await diaryCollection.setItem(key, copyObject(diary.value));
    
      return { 
        success: true ,
        message: 'Activity added successfully' 
      };
    }
    catch (err) {
    
      return { 
        success: false, 
        message: 'Failed to add diary activity' 
      }
    }
  } 

  async function updateDiaryActivity (targetDate, newActivities) {
    try {
      const key = formattedDate(targetDate);

      diary.value.activities = [...newActivities];

      await diaryCollection.setItem(key, copyObject(diary.value));

      return {
        success: true,
        message: 'Diary activity updated successfully'
      }
    }
    catch (err) {
      console.error(`Failed to update diary activity :\n${ err }`);

      return {
        success: false,
        message: 'Failed to update diary activity'
      }
    }
  }

  return {
    diary,
    getAllDiary,
    navigateDiary,
    addDiaryActivity,
    updateDiaryActivity
  }
}

export default useDiary;
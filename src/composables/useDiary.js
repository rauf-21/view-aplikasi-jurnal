import { ref, watch, onMounted } from 'vue';
import { formattedDate, copyObject } from '@/helper';
import { diaryCollection } from '@/db';

const useDiary = (targetDate) => {

  const date = ref(targetDate);

  const diary = ref(null);

  const diaries = ref([]);

  onMounted ( async () => {
    await navigateDiary(date.value);
  });

  async function navigateDiary (targetDate) {
    const key = formattedDate(targetDate);

    const data = await diaryCollection.getItem(key);

    if (data === null) {
      const emptyDiary = {
        metadata: {
          author: 'anonymous',
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
    const key = formattedDate(targetDate);

    diary.value.activities = [...diary.value.activities, newActivity];

    try {
      await diaryCollection.setItem(key, copyObject(diary.value));
    }
    catch (err) {
      console.error(`Failed to update diary activity :\n${ err }`);
    }
  } 

  async function updateDiaryActivity (targetDate, newActivity) {
    console.log(copyObject(newActivity));
  }

  return {
    diary,
    navigateDiary,
    addDiaryActivity,
    updateDiaryActivity
  }
}

export default useDiary;
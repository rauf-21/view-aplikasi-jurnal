<template>
  <div 
    class="diary" 
    v-if="diaryList !== null && currentDiary !== null"
  >    
    <DatePicker 
      class="diary__calendar"
      v-model="selectedDate"
      color="green"
      :is-dark="true"
    />
    <div class="diary__details">
      <p class="diary__label">Date</p>
      <p class="diary__date">{{ currentDiary.date }}</p>
      <p class="diary__label">Score</p>
      <input 
        type="number"
        class="diary__score" 
        v-model="currentDiary.score"
        @change="handleScoreChangeLimit"
        @blur="handleScoreChange"
        @keyup.enter="handleScoreChange"
      > / 10
      <p class="diary__label">Activities</p>
      <div class="diary__activity">
        <div 
          class="diary__activity__each"
          v-show="currentDiary.activities.length > 0"
          v-for="activity in  currentDiary.activities"
        >
          <p class="diary__activity__time">{{ activity.start }} - {{ activity.end }}</p>
          <p class="diary__activity__task">{{ activity.task }}</p>
        </div>
        <div v-show="currentDiary.activities.length <= 0">
          <p>No activity</p>
        </div>
      </div>
    </div>
    <div class="diary__actions">
      <div class="diary__actions__time">
        <input 
          type="time"
          v-model="newActivity.start"
        >
        -
        <input 
          type="time"
          v-model="newActivity.end"
        >
      </div>
      <textarea 
        class="diary__actions__task" 
        cols="30" 
        rows="10"
        v-model="newActivity.task"
        placeholder="What are you doing today ?" 
      ></textarea>
      <div class="diary__actions__button">
        <button 
          class="button button--primary"
          @click="handleAddNewActivity"
        >
          Add a new activity
        </button>
        <button 
          class="button button--primary"
          @click="handleUpdateDiary"
        >
          Update diary
        </button>
        <button
          class="button button--danger"
          @click="handleClearActivities"
        >
          Clear activities
        </button>
      </div> 
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
  import { ref, watch, watchEffect, onMounted, onBeforeMount } from 'vue';
  import { DatePicker } from 'v-calendar';
  import { useToast } from 'vue-toastification';

  const formatDate = date => `${ date.getMonth() + 1 }-${ date.getDate() }-${ date.getFullYear() }`

  const formatId = date => `${ date.getMonth() + 1 }${ date.getDate() }${ date.getFullYear() }`;

  const selectedDate = ref(new Date());

  const diaryList = ref(null);

  // Toast component

  const toast = useToast();

  // Mark if currentDiary is in database or not

  const isInDB = ref(false);

  // Diary section

  const findDiary = (date) => {

    let matchedDiary;

    const emptyDiary = {
      id: formatId(date),
      date: formatDate(date),
      score: 0,
      activities: []
    }

    isInDB.value = false;

    diaryList.value.forEach( diary => {
      if (diary.date === formatDate(date)) {
        matchedDiary = diary;
        isInDB.value = true;
        return;
      }
    });

    return matchedDiary !== undefined ? matchedDiary : emptyDiary;
  }

  const currentDiary = ref(null);


  // New Activity Section

  const newActivity = ref({
    start: '',
    end: '',
    task: ''
  });

  const updateDiaryOnDB = async () => {
    if (isInDB.value) {
      const request = await fetch (`https://rest-api-aplikasi-jurnal.herokuapp.com/journals/update/${ currentDiary.value.id }`, {
        mode: 'cors',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentDiary.value)
      });

      const response = await request.json();

      toast.success('Saved succesfully', {
        timeout: 3000
      });

    }
    else if (!isInDB.value) {
      const request = await fetch (`https://rest-api-aplikasi-jurnal.herokuapp.com/journals/create`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(currentDiary.value)
      });

      const response = await request.json();

      isInDB.value = true;

      toast.success('Saved successfully', {
        timeout: 3000
      })
    }
  }

  // Function to handle event

  const handleAddNewActivity = async () => {
    if (newActivity.value.start === '' || newActivity.value.end === '' || newActivity.value.task === '') {
      toast.warning('All column (start time, end time and task) must be filled', {
        timeout: 10000
      })
      return;
    }
    
    currentDiary.value.activities.push(newActivity.value);

    updateDiaryOnDB();

    newActivity.value = {
      start: '',
      end: '',
      task: ''
    }
  }

  const handleUpdateDiary = () => updateDiaryOnDB();

  const handleClearActivities = () => {
    currentDiary.value.activities = [];

    updateDiaryOnDB();
  }

  const handleScoreChangeLimit = () => {
    if (currentDiary.value.score > 10) {
      currentDiary.value.score = 10;
      toast.warning('Maximum score is 10', {
        timeout: 5000
      })
    }
    else if (currentDiary.value.score < 0) {
      currentDiary.value.score = 0;
      toast.warning('Minimum score is 0', {
        timeout: 5000
      })
    }
  }

  const handleScoreChange = () => {
    updateDiaryOnDB();
  }

  watch( selectedDate, () => {
    if (selectedDate.value !== null) {
      currentDiary.value = findDiary(selectedDate.value);
    }
  });

  onMounted( async () => {
    const response = await fetch ('https://rest-api-aplikasi-jurnal.herokuapp.com/journals/', {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        }
    })
    const data = await response.json();
    diaryList.value = data;
    currentDiary.value = findDiary(selectedDate.value);
  });

</script>

<style lang="scss">
  @font-face {
    font-family: SegoeUI;
    src:
        local("Segoe UI Light"),
        url(c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.woff2) format("woff2"),
        url(c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.woff) format("woff"),
        url(c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.ttf) format("truetype");
    font-weight: 100;
  }

  @font-face {
    font-family: SegoeUI;
    src:
        local("Segoe UI Semilight"),
        url(c.s-microsoft.com/static/fonts/segoe-ui/west-european/semilight/latest.woff2) format("woff2"),
        url(c.s-microsoft.com/static/fonts/segoe-ui/west-european/semilight/latest.woff) format("woff"),
        url(c.s-microsoft.com/static/fonts/segoe-ui/west-european/semilight/latest.ttf) format("truetype");
    font-weight: 200;
  }

  @font-face {
    font-family: SegoeUI;
    src:
        local("Segoe UI"),
        url(c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff2) format("woff2"),
        url(c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.woff) format("woff"),
        url(c.s-microsoft.com/static/fonts/segoe-ui/west-european/normal/latest.ttf) format("truetype");
    font-weight: 400;
  }

  @font-face {
    font-family: SegoeUI;
    src:
        local("Segoe UI Bold"),
        url(c.s-microsoft.com/static/fonts/segoe-ui/west-european/bold/latest.woff2) format("woff2"),
        url(c.s-microsoft.com/static/fonts/segoe-ui/west-european/bold/latest.woff) format("woff"),
        url(c.s-microsoft.com/static/fonts/segoe-ui/west-european/bold/latest.ttf) format("truetype");
    font-weight: 600;
  }

  @font-face {
    font-family: SegoeUI;
    src:
        local("Segoe UI Semibold"),
        url(c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.woff2) format("woff2"),
        url(c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.woff) format("woff"),
        url(c.s-microsoft.com/static/fonts/segoe-ui/west-european/semibold/latest.ttf) format("truetype");
    font-weight: 700;
  }

  $dark: #1A202C;
  $grey: #4A5568;
  $primary: #2ecc71;
  $danger: #e74c3c;

  /**
    * Remove increment & decrement from input type number
    */
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  input[type="time"]::-webkit-calendar-picker-indicator{
    filter: invert(98%) sepia(89%) saturate(31%) hue-rotate(13deg) brightness(107%) contrast(100%);
  }

  body {
    width: 100vw;
    height: 100vh;
    font-family: "Segoe UI";
    overflow-x: hidden;
    background-color: $dark;
    color: white;
  }

  .diary {
    width: 100vw;
    height: 90vh;
    display: grid;
    grid-template-areas: 
      "calendar details"
      "actions details";
    grid-gap: 1rem;

    & > * {
      padding: 1rem;
      width: 50vw;
      height: 100%;
      box-sizing: border-box;
    }

    &__calendar {
      grid-area: calendar;
    }

    &__details {
      grid-area: details;
      border: 1px solid $grey;
    }

    &__actions {
      box-sizing: border-box;
      grid-area: actions;
      border: 1px solid $grey;
      display: flex;
      flex-direction: column;

      &__time {
        margin-bottom: 1rem;

        & > * {
          outline: none;
          background-color: $dark;
          color: inherit;
          border: 1px solid $grey;
        }
      }

      &__task {
        outline: none;
        padding: 1rem 0.5rem;
        font-family: inherit;
        font-size: 0.8rem;
        letter-spacing: 1px;
        background-color: $dark;
        outline: none;
        border: 1px solid $grey;
        color: inherit;
        margin-bottom: 1rem;
      }

      &__button {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }

    &__details {

    }

    &__activity {

      &__each {
        display: flex;
        flex-direction: row;
      }

      &__time {
        font-weight: bold;
        margin-right: 1rem;
      }
    }

    &__label {
      font-weight: bold;
    }

    &__score {
      font-family: inherit;
      font-size: 1rem;
      background-color: $grey;
      outline: none;
      border: none;
      padding: 0.5rem 1rem;
      color: inherit;
      width: 3%;
      text-align: center;
    }

  }

  .button {
    padding: 0.3rem 0.8rem;
    font-family: inherit;
    font-weight: bold;
    background-color: $dark;
    color: inherit;
    border: 1px solid $grey;
    cursor: pointer;

    &:hover {
      border: 1px solid $primary;
      color: $primary;
    }

    &--danger {

      &:hover {
        color: $danger;
        border: 1px solid $danger;
      }
    }
  }
</style>
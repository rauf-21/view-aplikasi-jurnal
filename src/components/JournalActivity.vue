<template>
  <table 
    class="table" 
    v-if="activities.length > 0" 
    spellcheck="false"
  >
    <thead class="table__head-container">
      <th class="table__head">No</th>
      <th class="table__head">Time schedule</th>
      <th class="table__head">Activity</th>
    </thead>
    <tbody class="table__row-container" draggable="true">
      <tr
        class="table__row" 
        v-for="(activity, index) in activities"
      >
        <td class="table__data">{{ index + 1 }}</td>
        <td 
          class="table__data"
          @dblclick="changeTimeSchedule(index)"
          @blur="updateActivity"
          :ref="el => { if (el) element.time[index] = el }"
          :contenteditable="contenteditable" 
        >
          {{ activity.start }}-{{ activity.end }}
        </td>
        <td 
          class="table__data"
          @dblclick="changeActivity(index)"
          @blur="updateActivity"
          :ref="el => { if (el) element.task[index] = el }"
          :contenteditable="contenteditable" 
        >
          {{ activity.task }}
        </td>
      </tr>
    </tbody>
  </table>
  <div
    class="empty" 
    v-else
  >
    <p class="title">No activity</p>
  </div>
</template>

<script>
import { ref, reactive, toRefs, watchEffect, onBeforeUpdate } from 'vue';

export default {
  props: {
    activities: {
      type: Array,
      required: true
    }
  },
  setup (props, { emit }) {

    const { activities } = toRefs(props);

    const contenteditable = ref(false);

    const element = ref({
      time: [],
      task: []
    });

    const changeTimeSchedule = (index) => {
      contenteditable.value = true;
    }

    const changeActivity = (index) => {
      contenteditable.value = true;
    }

    onBeforeUpdate(() => {
      element.value.time = [];
      element.value.task = [];
    });

    function updateActivity () {
      emit('activityUpdate', activities.value);
    }

    return {
      activities,
      changeTimeSchedule,
      changeActivity,
      element,
      contenteditable,
      updateActivity
    }
  }
}

</script>
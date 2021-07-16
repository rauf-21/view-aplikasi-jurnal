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
      <th 
        class="table__head"
        v-show="editMode"
      >
        Action
      </th>
    </thead>
    <tbody class="table__row-container">
      <tr
        class="table__row" 
        v-for="(activity, index) in activities"
      >
        <td class="table__data">{{ index + 1 }}</td>
        <td class="table__data">
          <input 
            :class="`input ${ !editMode ? 'input--readonly' : '' }`" 
            @dblclick="enableEditMode"
            @keyup.esc="disableEditMode"
            @blur="updateActivity(activities)"
            type="time"
            v-model="activity.start"
            :readonly="!editMode" 
          >
          -
          <input 
            :class="`input ${ !editMode ? 'input--readonly' : '' }`" 
            @dblclick="enableEditMode"
            @keyup.esc="disableEditMode"
            @blur="updateActivity(activities)"
            type="time" 
            v-model="activity.end"
            :readonly="!editMode" 
          >
        </td>
        <td class="table__data">
          <input
            :class="`input ${ !editMode ? 'input--readonly' : '' }`" 
            @dblclick="enableEditMode"
            @keyup.esc="disableEditMode"
            @blur="updateActivity(activities)"
            type="text" 
            v-model="activity.task"
            :readonly="!editMode"
          >
        </td>
        <td 
          class="table__data"
          v-show="editMode"
        >
          <button
            class="button button--danger"
            @click="deleteActivity(activity, index)"
          >
            Delete
          </button>
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
import { ref, toRefs } from 'vue';
import useAlert from '@/composables/useAlert';

export default {
  props: {
    activities: {
      type: Array,
      required: true
    }
  },
  setup (props, { emit }) {
    const { warningAlert } = useAlert();
    const { activities } = toRefs(props);
    const editMode = ref(false);

    function enableEditMode () { editMode.value = true; }

    function disableEditMode () { editMode.value = false; }

    function updateActivity (activities) { emit('activityUpdate', activities); }

    async function deleteActivity (activity, targetIndex) {
      const newActivities = activities.value.filter((_, index) => index !== targetIndex);
      const confirmation = await warningAlert({
        title: 'Delete this ?',
        text: `Time: ${ activity.start } - ${ activity.end } \n Task: ${ activity.task }`,
        input: 'checkbox',
        inputValue: 0,
        inputPlaceholder: 'Don\'t ask again'
      });

      if (confirmation) updateActivity(newActivities);
    }

    return {
      activities,
      editMode,
      enableEditMode,
      disableEditMode,
      updateActivity,
      deleteActivity
    }
  }
}

</script>
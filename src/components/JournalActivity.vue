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
        <td class="table__data">
          <input 
            :class="`input ${ readonly ? 'input--readonly' : '' }`" 
            @dblclick="toggleReadonly"
            @blur="updateActivity"
            type="time"
            v-model="activity.start"
            :readonly="readonly" 
          >
          -
          <input 
            :class="`input ${ readonly ? 'input--readonly' : '' }`" 
            @dblclick="toggleReadonly"
            @blur="updateActivity"
            type="time" 
            v-model="activity.end"
            :readonly="readonly" 
          >
        </td>
        <td class="table__data">
          <input
            :class="`input ${ readonly ? 'input--readonly' : '' }`" 
            @dblclick="toggleReadonly"
            @blur="updateActivity"
            type="text" 
            v-model="activity.task"
            :readonly="readonly"
          >
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
import { ref, toRefs, watchEffect, onBeforeUpdate } from 'vue';

export default {
  props: {
    activities: {
      type: Array,
      required: true
    }
  },
  setup (props, { emit }) {

    const { activities } = toRefs(props);

    const readonly = ref(true);

    const element = ref({
      start: [],
      end: [],
      task: []
    });

    onBeforeUpdate(() => {
      element.value.time = [];
      element.value.task = [];
    });
    
    function toggleReadonly () { readonly.value = !readonly.value };

    function updateActivity (e) {
      if (!readonly.value) emit('activityUpdate', activities.value);
    }

    return {
      activities,
      element,
      readonly,
      toggleReadonly,
      updateActivity
    }
  }
}

</script>
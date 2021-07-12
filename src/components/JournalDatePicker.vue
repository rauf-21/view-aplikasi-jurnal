<template>
  <DatePicker 
    class="journal__date"
    v-model="date"
    color="green"
    :is-dark="true"
  />
</template>

<script>
import { DatePicker } from 'v-calendar';
import { ref, watch } from 'vue';

export default {
  components: { DatePicker },
  props: {
    date: {
      type: Date,
      required: true
    }
  },
  setup (props, { emit }) {
    const date = ref(props.date);

    watch (date, (date, prevDate) => {
      if (date !== null) emit('dateChange', date);
    });

    return {
      date
    }
  } 
}

</script>
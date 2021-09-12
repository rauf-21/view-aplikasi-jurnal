<template>
  <table class="table">
    <thead class="table__head-container">
      <th class="table__head">Author</th>
      <th class="table__head">Date</th>
    </thead>
    <tbody class="table__row-container">
      <tr class="table__row">
        <td class="table__data">{{ author }}</td>
        <td class="table__data">{{ date }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { toRefs, computed } from 'vue';

export default {
  props: {
    author: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const { author, date } = toRefs(props);

    return {
      author,
      date
    }
  }
}

</script>
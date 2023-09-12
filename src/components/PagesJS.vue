<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "PagesJS",
  props: ['value'],
  data() {
    return {
      users: ['1', '2', '3'], // Példa felhasználók
    };
  },
  mounted() {

  },
  watch: {
  }
})
</script>

<template>
  <div>
    <router-link v-for="user in users" :key="user" :to="'/javascript/' + user">{{ user }}</router-link>
    <input
    type="text"
    :value="value"
    @input="$emit('update:value', $event.target.value)"
    />
  </div>
</template>

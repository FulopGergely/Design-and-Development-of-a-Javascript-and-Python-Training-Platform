<template>
  <div>
    <RouterView />
  </div>
</template>

<script>

import '@/assets/main.css';

export default {

  name: "App",
  created() {
    this.$store.dispatch('initTasksJs')
    this.$store.dispatch('initTasksPy')
  }
}

</script>



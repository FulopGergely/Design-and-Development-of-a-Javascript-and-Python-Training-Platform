<template>
  <div>
    <RouterView />
  </div>
</template>

<script>

import config from "@/assets/js_alapok";

config.tasks = config.tasks.map( (v,i) => v={ id:i+1, ...v } )
export default {

  name: "App",
  created() {
    this.$store.dispatch('initTasks', config.tasks)
  }
}

</script>



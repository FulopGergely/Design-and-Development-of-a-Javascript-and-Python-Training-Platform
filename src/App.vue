<script>
import '@/assets/main.css'

//import components
import GoogleLogin from './components/GoogleLogin.vue'
import Admin from './components/Admin.vue'
import QuestionsComp from './components/QuestionsComp.vue'




export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: { GoogleLogin , Admin, QuestionsComp },

}


  

</script>

<template>

  <div v-if="this.$store.state.auth.email == undefined"> 
    <GoogleLogin/>
  </div>
  <div v-else-if="this.$store.state.auth.email != 'kvizmester42@gmail.com'">
    <GoogleLogin/>
    <QuestionsComp/>
  </div>

  <div v-else-if="this.$store.state.auth.email == 'kvizmester42@gmail.com'">
    <GoogleLogin/>
    <Admin/>
  </div>
  
</template>



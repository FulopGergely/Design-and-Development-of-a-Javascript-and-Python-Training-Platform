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
      users: [],
    }
  },
  components: { GoogleLogin , Admin, QuestionsComp },
  mounted(){
    //this.getUsers() //init users ()
    //this.isAdmin()
    //console.log(auth)
  },
  methods: {
    asd(){
        console.log(this.$store.state.auth.email )
    }
  }

}


  

</script>

<template>

  <div v-if="this.$store.state.auth == undefined"> 
    <GoogleLogin/>
    asd
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



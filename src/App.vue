<script setup>
/*
import { defineAsyncComponent } from 'vue'

const NavBar = defineAsyncComponent({
  loader: () => import('@/components/home/NavBar.vue'),
});*/
import { ref, onMounted } from "vue";
import NavBar from '@/components/home/NavBar.vue'
import { usePython } from 'usepython';


const py = usePython();

async function init() {
  await py.load();
  py.run(`1+1`).then(result => {
    console.log(result.results)
  }).catch(error => {
    console.error('Hiba történt:', error.error)
  });
}

onMounted(() => {
  //init()
});

</script>

<template>
  <NavBar></NavBar>
</template>



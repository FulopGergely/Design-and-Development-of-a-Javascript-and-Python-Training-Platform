<script setup>
import store from '@/store/store.js';
import { ref, onMounted } from 'vue';
//components
import NavBar from '@/components/home/NavBar.vue'



onMounted(() => {

});
function asd() {
    //console.log(store.getters)
    store.commit('AddTask', {
        index: 0,
        text: 'feladat 1', //feladat szövege
        programmingLanguageName: 'js',
        code: 'console.log',
        result: '2',
        testResult: '3',
        score: 1,
    });
    store.commit('AddTask', {
        index: 1,
        text: 'feladat 2', //feladat szövege
        programmingLanguageName: 'py',
        code: 'console.log',
        result: '32',
        testResult: '5',
        score: 1,
    })
    console.log(store.getters)
}


</script>
<template>
    <NavBar></NavBar>
    <div>



    </div>
</template>
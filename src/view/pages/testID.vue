<script setup>
import { ref, onMounted, computed, watch, inject } from 'vue';
import store from '@/store/store.js';
import { getAllTest } from '@/firebase/test.js';
import { useRoute } from "vue-router";
//PrimeVue

//hljs
import 'highlight.js/lib/common';
import hljs from 'highlight.js/lib/core';
const py = inject('py');

//components
import NavBar from '@/components/home/NavBar.vue'
import Terminal from '@/components/maker/Terminal.vue'
import Step from '@/components/test/Step.vue'
import CasesTable from '@/components/test/CasesTable.vue'
import StepSide from '../../components/maker/StepSide.vue';
import CodeRunner from '../../components/test/CodeRunnerTestFiller.vue';

//const emit = defineEmits(['update:taskCode'])

const testSheet = ref(store.getters.getTestSheet); //testID testlap összes mezője
const initPyCode = `def my_function(x):\n return x`
const initJsCode = `function myFunction( p1 ) { \nreturn p1\n}`
const logs = ref([]);
const result = ref(null)
const params = ref(null)
const code = ref('');
const user = 'testFiller'

const userId = ref('');
onMounted(() => {
    initTest() //szerverről lekérjük az adatot
    //const route = useRoute();
    //console.log('Test ID:', route.params.testID);
});

async function initTest() {
    const router = useRoute() //címsorba beírt testID
    const tests = await getAllTest() //létező összes tesztet lekéri a szerverről
    //többszöri frissítés miatt, megnézzük hogy már be van-e töltve ez a tesztlap:
    console.log(store.getters.getTestSheet)
    if (!store.getters.getTestSheet) { //falsy
        if (testSheet.value.tid == router.params.testID) {
            console.log('be van töltve a: ' + testSheet.value.tid)
        } else {
            console.log('másik tesztfeladatlpot kitöltése')
        }
    } else {
        console.log('üres, még nem volt betöltve semmi')
        tests.forEach(test => { //megkeressük a testID-jü tesztlapot
            if (test.tid == router.params.testID) {
                store.commit('addTestSheet', test)
                //testSheet.value = test
            }
        });
    }
    store.commit('setLoading', true)
    console.log(store.getters.getTestSheet)

}
</script>

<template>
    <NavBar :user="user" />
    <div v-if="store.getters.getLoading">
        <!--This is a comment. Comments are not displayed in the browser-->
        <!-- {{ this.$route.params.testID }}  -->
        <StepSide :tasks="store.getters.getTestSheet.task" currentSide="setCurrentTestSide" />
        <div v-for="task in store.getters.getTestSheet.task" :key="task.side">
            <div v-if="task.side == store.getters.getCurrentTestSide" class="flex justify-content-center flex-wrap ">
                <div class=" border-round border-1 surface-border mt-5 mb-3 p-4 w-full">
                    <div>
                        <div class="flex justify-content-between flex-wrap">
                            <h2>{{ task.side }}. Oldal</h2>
                        </div>
                        <div
                            class="fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-5 mb-3 p-4 ">
                            <div class="m-5" v-html="task.text"></div>
                            <CodeRunner
                                v-if="task.programmingLanguageName.value == 'javascript' || task.programmingLanguageName.value == 'python'"
                                v-model:taskCode="task.code" :selectLanguage="task.programmingLanguageName.value" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="flex justify-content-center flex-wrap ">
            <div class=" border-round border-1 surface-border mt-5 mb-3 p-4 w-full">
                <CasesTable />
            </div>

        </div>
    </div>
    <div v-else>
        <div class="card">
            <div class="border-round border-1 surface-border p-4 surface-card">
                <div class="flex mb-3">
                    <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
                    <div>
                        <Skeleton width="10rem" class="mb-2"></Skeleton>
                        <Skeleton width="5rem" class="mb-2"></Skeleton>
                        <Skeleton height=".5rem"></Skeleton>
                    </div>
                </div>
                <Skeleton width="100%" height="150px"></Skeleton>
                <div class="flex justify-content-between mt-3">
                    <Skeleton width="4rem" height="2rem"></Skeleton>
                    <Skeleton width="4rem" height="2rem"></Skeleton>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-area {
    overflow: auto;

}
</style>




   

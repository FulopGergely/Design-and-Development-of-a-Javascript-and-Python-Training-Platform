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
import Terminal from '@/components/maker/Terminal.vue'
import Step from '@/components/test/Step.vue'
import CasesTable from '@/components/test/CasesTable.vue'

//const emit = defineEmits(['update:taskCode'])

const testSheet = ref(store.getters.getTestSheet); //testID testlap összes mezője
const initPyCode = `def my_function(x):\n return x`
const initJsCode = `function myFunction( p1 ) { \nreturn p1\n}`
const logs = ref([]);
const result = ref(null)
const params = ref(null)
const code = ref('');

function codeChange(e) {
    //emit('update:taskCode', e)
    code.value = e
}
async function runcode(params) {
    //console.log(py)

    const oldConsoleLog = console.log;
    console.log = function (message) { //felülírjük a console.log működését
        logs.value.push(message); //logs a javascriptCode.vue -> Terminal.vue ba jelenik meg
    }

    if (store.getters.getTestSheet[store.getters.getCurrentSheet].programmingLanguageName.value == 'javascript') {
        //console.log(params.value)
        //console.log(store.getters.getParamsByCurrentSide)
        try {
            params.map(param => { //hogy a textarea jól jelenítse meg, futtatás előtt parsolás, futtatás után stringify
                if (param.type.name == 'JSON') {
                    param.value = JSON.parse(param.value)
                }
            })

            const dynamicFunction = new Function('return ' + code.value)();
            result.value = dynamicFunction(...params.map(param => param.value));
            params.map(param => {
                if (param.type.name == 'JSON') {
                    param.value = JSON.stringify(param.value, undefined, 4);
                }
            })

            console.log(result.value)
            //console.log(store.getters.getParamsByCurrentSide.map(param => param.type.name))
            //console.log(store.getters.getParamsByCurrentSide.map(param => param.value))
            //store.getters.getParamsByCurrentSide.map(param => param.value = JSON.stringify(param.value))
        } catch (error) {
            params.map(param => {
                if (param.type.name == 'JSON') {
                    param.value = JSON.stringify(param.value, undefined, 4);
                }
            })
            console.log(error)
        }
        //console.log(store.getters.getParamsByCurrentSide[0].value)
        console.log = oldConsoleLog;

    }
    if (store.getters.getTestSheet[store.getters.getCurrentSheet].programmingLanguageName.value == 'python') {
        try {
            const res = await py.run(code.value);
            for (const output of py.log.value.stdOut) {
                console.log(output);
            }
            if (res.error != null) {
                //console.log(res.error.split('\n').slice(8).join('\n').substring(16)); // delete the beginning of an error message
                console.log(res.error)
            } else {
                result.value = res.results
                console.log(result.value);
            }
        } catch (error) {
            console.error('Error:', error);
        }


        console.log = oldConsoleLog;

    }
    console.log = oldConsoleLog;
    //console.log(result)
}
function clearTerminal() {
    logs.value = []
}

onMounted(() => {

    initTest() //szerverről lekérjük az adatot



});

async function initTest() {
    const router = useRoute() //címsorba beírt testID
    const tests = await getAllTest() //létező összes tesztet lekéri a szerverről
    //többszöri frissítés miatt, megnézzük hogy már be van-e töltve ez a tesztlap:
    console.log(store.getters.getTestSheet)
    if (!testSheet.value) { //falsy
        if (testSheet.value.tid == router.params.testID) {
            console.log('be van töltve a: ' + testSheet.value.tid)
        } {
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
    // tárolni vuexben azt kell amit beír majd a diák
    // oldal firssítéskor lekérjük a megfelelő tesztlapot szerverről a testSheet.value -ba.
    // store.getters.getCurrentSheet a jelenlegi oldal ahol állunk, ezt vuexba kell tárolni, hogy firssítéskor megmaradjon az értéke
    store.commit('setLoading', true)
    console.log(store.getters.getTestSheet)

}

</script>
<template>
    <div v-if="store.getters.getLoading">
        <Step />
        <div v-for="task in store.getters.getTestSheet.task" :key="task.side">
            <div v-if="task.side == store.getters.getCurrentTestSide" class="flex justify-content-center flex-wrap ">
                <div class=" border-round border-1 surface-border mt-5 mb-3 p-4" style="width: 1700px">
                    <div>
                        <div class="flex justify-content-between flex-wrap">
                            <h2>{{ task.side }}. Oldal</h2>
                        </div>
                        <div
                            class="fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-5 mb-3 p-4 ">
                            <div class="m-2" v-html="task.text"></div>
                            <div
                                class="mt-2 mr-2 ml-2 p-3 bg-gray-200 border border-gray-200 rounded-md not-prose dark:bg-black dark:border-neutral-800">
                                <code-editor class="custom-area"
                                    v-tooltip.top="'A függvénytörzsben írd meg a megoldás kódját'" :hljs="hljs" :code="code"
                                    :lang="store.getters.getTestSheet.task[store.getters.getCurrentTestSide - 1].programmingLanguageName.value"
                                    @edit="codeChange($event)">
                                </code-editor>
                            </div>
                            <div class="col mt-2">
                                <Terminal :logs-name="logs" @clearTerminal="clearTerminal" />
                            </div>
                            <Button @click="runcode()" class="m-2">Futtatás</Button>
                        </div>



                    </div>
                </div>

            </div>
        </div>
        <div class="flex justify-content-center flex-wrap ">
            <div class=" border-round border-1 surface-border mt-5 mb-3 p-4" style="width: 1700px">
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
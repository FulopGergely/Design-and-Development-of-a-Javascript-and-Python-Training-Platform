<script setup>
import { ref, onMounted, computed } from 'vue';
import store from '@/store/store.js';
import { getAllTest } from '@/firebase/test.js';
import { useRoute } from "vue-router";
//PrimeVue
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const show = () => {
    if(store.getters.getScoreEarned[store.getters.getCurrentTestSide -1] == undefined){ //hogy ne fusson le akkor is amikor visszalépek egy megoldott feladatra
        toast.add({ severity: 'success', summary: 'Helyes válasz!', detail: '', life: 3000 });
    }
};



//hljs
import 'highlight.js/lib/common';

//components
import NavBar from '@/components/home/NavBar.vue'
import CasesTable from '@/components/test/CasesTable.vue'
import StepSide from '../../components/maker/StepSide.vue';
import CodeRunnerTestFiller from '../../components/test/CodeRunnerTestFiller.vue';
import FootSteps from '../../components/test/FootSteps.vue';
import Score from '@/components/test/Score.vue'

//const emit = defineEmits(['update:taskCode'])

const testSheet = ref(store.getters.getTestSheet); //testID testlap összes mezője
const user = 'testFiller'
const totalScore = ref(0)
const finished = computed(() => {
    return store.getters.getTestDurationMinutes - store.getters.getTimer <= 0;
});
const hasCurrentUser = computed(() => !!store.getters.getCurrentUser.uid); //falsy
onMounted(() => {
    
    initTest().then(() => { //előbb szerverről lekérjük az adatot, aztán init a többi szükséges adatokat
        let score = 0
        store.getters.getTestSheet.task.forEach(task => {
            score = score + task.score
        })
        totalScore.value = score
        store.commit('setLoading', true)
    }); 
    console.log(store.getters.getTestSheet.testDurationMinutes)
    
    //store.commit('setTestDurationMinutes', store.getters.getTestDurationMinutes)
    store.commit('setTimer', store.getters.getTimer + 1) //frissíténél 1 másodperc büntetés
    console.log(store.getters.getTestDurationMinutes)
    
});
const scoreAchieved = computed(() => {
    let sum = 0
    store.getters.getScoreEarned.forEach(score => {
        sum += score
    })
    return sum == null ? 0 : sum
});


async function initTest() {
    // Inicializálás
    console.log(store.getters)
    store.commit('setLoading', false)
    const router = useRoute() // Az aktuális útvonal paraméterei
    const testID = router.params.testID
    const tests = await getAllTest() // Lekérjük az összes tesztet
    if (store.getters.getTestSheet.task && store.getters.getTestSheet.task.length > 0) {
        if (testSheet.value?.tid === testID) {
            //console.log('Ez a tesztlap már be van töltve: ' + testSheet.value.tid)
        } else {
            //console.log('Másik tesztlap van kiválasztva')
        }
    } else {
        //console.log('Még nincs tesztlap betöltve')

        // Megkeressük az aktuális tesztet az összes teszt között
        const currentTest = tests.find(test => test.tid === testID)

        if (currentTest) {
            // Ha találtunk ilyen tesztet, akkor módosítjuk és mentjük
            modyfiCode(currentTest.task) // A teszt feladatainak módosítása
            store.commit('setTestDurationMinutes', currentTest.testDurationMinutes * 60) // Időzítő beállítása
            store.commit('addTestSheet', currentTest) //itt mentjük a módosításokat
            testSheet.value = currentTest
       } else {
            console.warn(`Nem található tesztlap ezzel az ID-val: ${testID}`)
        }
    }

    // Betöltési állapot befejezése
    store.commit('setLoading', true)
}

// Kód módosítási példa (felhasználási hely szerint)

function modyfiCode(codes) { //modosítjuk, hogy a teszkitöltő csak a függvény törzset lássa. Betöltés után modosítjuk az egészet, így könnyebb lesz később a kezelése.
    
    codes.forEach(code => {
        try {
            code.output = [] //itt fogjuk tárolni a kimeneti eredményeket feladatonként.
            code.displayTest = false //segédváltozó, a tesztesetek ne látszódjon csak futtatás után. isTest a tárolt érték ami azt tárolja hogy látszódjon a tesztesetek. 
            if (code.programmingLanguageName && code.programmingLanguageName.value == 'javascript' && code.code) { //js kód, és van kód beírva
                const functionName = code.code.replace(/^(function|\s+function)\s+/, '').match(/\w+/)[0];
                const paramsName = code.code.match(/\(.*\)/)[0]
                code.code = 'function ' + functionName + paramsName + '{\nreturn 0\n}'
                code.functionName = functionName //tároljuk a functionName-t
            }
            if (code.programmingLanguageName && code.programmingLanguageName.value == 'python' && code.code) {
                const functionName = code.code.replace(/^(def|\s+def)\s+/, '').match(/\w+/)[0];
                const paramsName = code.code.match(/\(.*\)/)[0]
                code.code = 'def ' + functionName + paramsName + ':\n  return 0'
                code.functionName = functionName //tároljuk a functionName-t
            }
        } catch {
            console.log('hiba a kód átírása közben')
        }
    })
}

</script>

<template>
    <Toast/>
    {{store.getters.getTestSheet}}
    <div v-if="hasCurrentUser">
        <div v-if="store.getters.getLoading">
            <NavBar :user="user" :time="store.getters.getTestSheet.testDurationMinutes*60" />
            <div v-if="finished">
                <Score :scoreAchieved="scoreAchieved" :totalScore="totalScore"/>
            
            </div>
            <div v-else>
                <!--This is a comment. Comments are not displayed in the browser-->
            <!-- {{ this.$route.params.testID }}  --> 

            <StepSide :tasks="store.getters.getTestSheet.task" currentSide="setCurrentTestSide" />
                <div v-for="task in store.getters.getTestSheet.task" :key="task.side">
                    <div v-if="task.side == store.getters.getCurrentTestSide" class="flex justify-content-center flex-wrap ">
                        <div class=" border-round surface-border mt-5 mb-3 p-4 w-full">
                            <div>
                                <div class="flex justify-content-between flex-wrap">
                                    <h2>{{ task.side }}. Oldal</h2>
                                </div>
                                <div
                                    class="fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-5 mb-3 p-4 ">
                                    <div class="flex justify-content-end flex-wrap mr-5">{{store.getters.getScoreBySide}} pont ( {{scoreAchieved}} / {{ totalScore }} )</div>
                                    <div class="m-5" v-html="task.text"></div> 
                                    <div v-if="task.programmingLanguageName">
                                        <CodeRunnerTestFiller
                                            v-if="task.programmingLanguageName.value == 'javascript' || task.programmingLanguageName.value == 'python'"
                                            v-model:taskCode="task.code" :selectLanguage="task.programmingLanguageName.value"
                                            :tests="task.tests" />
                                    </div>
                                    <div v-if="store.getters.getDisplayTest" class="flex justify-content-center flex-wrap ">
                                    <div class=" border-round surface-border mt-5 mb-3 p-4 w-full">
                                        <CasesTable  @showToast="show" />
                                    </div>

                                </div>

                                </div>
                                <div
                                    class="fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-8 mb-3 p-4 ">
                                    <FootSteps :scoreAchieved="scoreAchieved" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
        <div v-else>
             <div class="card">
                <Skeleton class=" mt-8 mb-8" ></Skeleton>
                <div class="flex mb-3 mt-8">
                        <div>
                            <Skeleton width="6rem" height="25px" class="mt-7 mb-6 ml-4"></Skeleton>
                        </div>
                    </div>
                <div class="border-round border-1 surface-border mt-2 ml-4 mr-4 p-4">
                    <Skeleton width="90%" class="m-1"></Skeleton>
                    <Skeleton width="90%" class="m-1"></Skeleton>
                    <Skeleton width="90%" class="m-1"></Skeleton>
                    <Skeleton width="90%" class="mb-5"></Skeleton>
                    
                    <Skeleton width="100%" height="600px"></Skeleton>
                    <div class="flex justify-content-between mt-3">
                        <Skeleton width="4rem" height="2rem"></Skeleton>
                        <Skeleton width="4rem" height="2rem"></Skeleton>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div v-else>
        <NavBar/>
        <Message :closable="false" >A teszt indításához jelentkezzen be!</Message>
    </div>
   

    
    

    
       
       
        
    
</template>

<style scoped>
.custom-area {
    overflow: auto;

}
</style>

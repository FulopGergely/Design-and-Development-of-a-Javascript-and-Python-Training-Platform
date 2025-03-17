<script setup>
import { ref, onMounted, computed } from 'vue';
import store from '@/store/store.js';
//PrimeVue

//hljs
import hljs from 'highlight.js';

//components
import NavBar from '@/components/home/NavBar.vue'
import CodeRunner from '../../components/maker/CodeRunner.vue';
import TestCasesTable from '../../components/maker/TestCasesTable.vue';
import SelectProgramLanguage from '../../components/maker/SelectProgramLanguage.vue';
import StepSide from '../../components/maker/StepSide.vue';
import ButtonGroup from '../../components/maker/ButtonGroup.vue';



const user = 'testCreator'
onMounted(() => {
    
});

const myQuillEditor = ref('')
const visible = ref(false);

const options = ref({
    modules: {
        syntax: {
            highlight: text => hljs.highlightAuto(text).value
        },
        toolbar: [
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline'],
            [{ 'color': [] }, { 'background': [] }],
            ['clean'],
            [{ 'align': [] }],

            [{ 'list': 'ordered' }, { 'list': 'bullet' }],


            ['code-block'],
            ['image'],
            ['link'],

        ]

    },
});
const hasCurrentUser = computed(() => !!store.getters.getCurrentUser.uid); //falsy
</script>
<template>
    <NavBar :user="user" />
    <Toast />
    <div v-if="hasCurrentUser">

        
        <div v-if="store.getters.getLoading">
            <StepSide :tasks="store.getters.getTask" :currentSide="'setCurrentSide'" />
            <div v-for="task in store.getters.getTask" :key="task.side">
                <div v-if="task.side == store.getters.getCurrentSide" class="flex justify-content-center flex-wrap ">
                    <div class=" border-round border-1 surface-border mt-5 mb-3 p-4 w-full">
                        <div>
                            <div class="flex justify-content-between flex-wrap">
                                <h2>{{ task.side }}. Oldal</h2>
                                <ButtonGroup />
                            </div>
                            <div class="flex align-items-center justify-content-center  border-round mt-8">Fogalmazza meg a feladat, vagy a lecke szövegét</div> 
                            <div
                                class="fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-5 mb-3 p-4 ">
                                <div class="flex justify-content-between flex-wrap">
                                    <div></div>
                                    <div class="flex align-items-center justify-content-center  border-round "><i
                                            v-tooltip.left="'Példakódot is használhat, amely automatikusan felismeri a programozási nyelvet, és szintaxis kiemeléssel jeleníti meg.'"
                                            class="flex justify-content-end m-2 pi pi-question-circle"></i>
                                    </div>
                                </div>
                                <QuillEditor ref="myQuillEditor" theme="snow" :options="options" contentType="html"
                                    v-model:content="task.text" />
                            </div>
                            <!--  <div class="ql-editor" v-html="task.text"></div>   -->
                            <div class="flex align-items-center justify-content-center  border-round mt-8">Válasszon futtatási környezetet (opcionális), nézze meg a videót: <Button class="ml-3 p-button-secondary" label="lejátszás" icon="pi pi-play" @click="visible = true" /></div> 
                            
                                <Dialog v-model:visible="visible" modal header="Hogyan hozzak létre feladatot?" >
                                    
                                    <iframe width="1000" height="500" src="https://www.youtube.com/embed/WZIfCM35Fsk?si=RvTBCB7Ta5TSojep" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                    <div  style="max-width: 1000px; margin: 5px">Video tartalma: A sandbox segít a megoldás kialakításában. Írjon egy függvényt, de annak belső tartalma nem fog látszódni a teszt kitöltésnél. A feladat a bemeneti paraméterek és a kimenet értékei alapján lesz ellenőrizve, melyek a teszteseteknél láthatók.
                                        Ha hozzáad egy paramétert, annak értékét és típusát megadhatja, viszont a sandbox-ban a függvény paraméterlistájában fel kell tüntetnie. Az első paraméter lesz az első a listában. A sandboxban megadott függvénynév és paraméternevek tárolódnak, és ezeket a tesztkitöltő is látni fogja.</div>
                                </Dialog>


                            <div
                                class="fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-5 mb-8 p-4 ">
                                <div class="flex justify-content-between flex-wrap">
                                    <SelectProgramLanguage v-model="task.programmingLanguageName" v-model:taskCode="task.code" />
                                    
                                    <div class="flex align-items-center justify-content-center  border-round "><i
                                            v-tooltip.left="'Ha nem választ futtatási környezetet, akkor csak a feladat/lecke szövege fog megjelenni ezen az oldalon'"
                                            class="flex justify-content-end m-2 pi pi-question-circle"></i>
                                    </div>
                                </div>
                                
                                
                                <div v-if="task.programmingLanguageName">
                                    <CodeRunner
                                        v-if="task.programmingLanguageName.value == 'javascript' || task.programmingLanguageName.value == 'python'"
                                        v-model:taskCode="task.code" :selectLanguage="task.programmingLanguageName.value" />
                                </div>
                            </div>
                            <div v-if="task.programmingLanguageName"
                                class="fadein animation-duration-500 border-round border-1 surface-border mt-8 mb-8 p-4 ">
                                <TestCasesTable :code="task.code" :selectLanguage="task.programmingLanguageName.value" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="flex justify-content-center flex-wrap">
                <ProgressSpinner />
            </div>
        </div>
    </div>
    <div v-else>
        <Message :closable="false" >bejelentkezés szükséges</Message>
    </div>
    
</template>

<style scoped></style>
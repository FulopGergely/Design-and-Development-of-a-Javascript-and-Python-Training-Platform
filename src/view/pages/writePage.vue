<script setup>
import { getAllDocument } from '@/firebase/google.js';
import { getAllTest } from '@/firebase/test.js';
import { ref, onMounted, computed } from 'vue';
import store from '@/store/store.js';
//Component
import NavBar from '@/components/home/NavBar.vue'
//PrimeVue
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const show = () => {
      toast.add({ severity: 'error', summary: 'Teszt indításához be kell jelentkezni', life: 3000 });
};

const hasCurrentUser = computed(() => !!store.getters.getCurrentUser.uid); //falsy




const availableTests = ref([])
const allUsers = ref([])
const visible = ref(false);
const detail = ref({});

onMounted(() => {
    init()

});

async function init() {
    store.commit('setLoading', false)
    let allTest = await getAllTest()
    allTest.forEach(item => { //elérhető tesztek
        if (item.available) {
            availableTests.value.push(item)
        }
    });
    allUsers.value = await getAllDocument('users')
    store.commit('setLoading', true)
}

const columns = [
    { field: 'testID', header: 'Teszt neve' },
    { field: 'time', header: 'Teszt ideje' },
    { field: 'programLanguage', header: 'Nyelv' },
    { field: 'difficulty', header: 'Nehézségi szint' },
];
const displayOnTable = computed(() => {

    if (availableTests.value) {
        return availableTests.value.map(item => {
            return {
                testID: item.tid,
                time: item.testDurationMinutes + ' perc',
                programLanguage: [...new Set(item.task.map(task => task.programmingLanguageName?.value))].join(', '),
                likes: item.rating ? Object.values(item.rating).reduce((acc, value) => acc + value, 0) : 0,
                difficulty: item.difficulty?.name

            }
        });
    } else {
        return [];
    }
});
async function startTest (test) { //start kattintás
    if (hasCurrentUser.value) {
        store.commit('resetStates') //pl nullázzuk az időzítést.
        window.open('/' + test.data.testID, '_blank')
        const match = test.data.time.match(/^\d+/); //számmal indul e a string?
        let time = match ? parseInt(match[0], 10) : 0; //teszt ideje
        store.commit('setTestDurationMinutes', time)
        console.log(store.getters)
        
        } else {
            show()
        }
}

// <i v-if="slotProps.data.likes > 0" class="pi pi-thumbs-up" />


/*
<template #body="slotProps">
                                        {{ col.field == 'likes' ? 'a' : slotProps.data[col.field] }}
                                    </template>
                                    */
function dialog (slotProps) {
visible.value = true
console.log(slotProps.data.testID);
detail.value = availableTests.value.filter(test => test.tid === slotProps.data.testID);
let authName = allUsers.value.filter(user => user.uid === detail.value[0].uid)[0].displayName 

console.log(authName);

console.log(detail.value[0]);
console.log(detail.value[0].uid);
console.log(detail.value[0].task.length);
console.log(detail.value[0].details);
console.log(detail.value[0].review);

}
</script>
<template>



    <NavBar></NavBar>
       <Toast position="bottom-right"/>
    
    <div >
        <div v-if="store.getters.getLoading">
        



        <div class="flex justify-content-center flex-wrap ">
                <div class=" border-round border-1 surface-border mt-5 mb-3 p-4 w-full">
                    <div class="card">

                        <div>
                            <div class="flex justify-content-center flex-wrap">
                                <h2> Tesztek</h2>

                            </div>
                        </div>
                        
                        <div
                            class="fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-5 mb-3 p-4 ">
                            <DataTable :value="displayOnTable" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" >
                                <Column sortable v-for="col of columns" :key="col.field" :field="col.field"
                                                    :header="col.header">
                                                    
                                </Column>

                                <Column header="Értékelés" :sortable="true" field="likes">
                                    <template #body="slotProps">
                                        <i v-if="slotProps.data.likes > 0" style="color: green" class="pi pi-thumbs-up-fill" />
                                        <i v-if="slotProps.data.likes < 0" style="color: red" class="pi pi-thumbs-down-fill" /> {{ slotProps.data.likes }} 
                                    </template>
                                </Column>

                                <Column>
                                    <template #body="slotProps">
                                    <Button icon="pi pi-file-edit" label="Teszt indítása"
                                        @click="startTest(slotProps)" /> 
                                    </template>
                                </Column>
                                <Column>
                                    <template #body="slotProps">
                                    <Button icon="pi pi-question-circle"  class=" p-button-secondary"
                                        @click="dialog(slotProps)"
                                        /> 
                                    </template>
                                </Column>
                            </DataTable>
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

   
        
  

    

    <Dialog v-model:visible="visible" maximizable modal header="Teszt részletei" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
  <div class="p-4">
    <h2 class="mb-2">Teszt információk </h2>
    <ul class="p-2 m-2">
      <li class="mb-1">Létrehozó: {{ allUsers.filter(user => user.uid === detail[0].uid)[0].displayName }}</li>
      <li class="mb-1">Feladatok száma: {{ detail[0].task.length }}</li>
      <li class="mb-1">Leírás: {{ detail[0].details }}</li>
    </ul>
    <h2 class="mb-2 mt-4">Vélemények </h2>
    <div v-for="review in detail[0].review" :key="review">
  <Card class="m-2">
    <template #content>
      <p class="m-0">{{ review }}</p>
    </template>
  </Card>
</div>
  </div>
</Dialog>
    
    



</template>
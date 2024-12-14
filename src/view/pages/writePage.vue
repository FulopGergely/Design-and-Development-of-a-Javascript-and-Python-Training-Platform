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

onMounted(() => {
    init()

});

async function init() {
    store.commit('setLoading', false)
    let allTest = await getAllTest()
    allTest.forEach(item => { //saját tesztek
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
    { field: 'established', header: 'Teszt létrehozója' },
];
const displayOnTable = computed(() => {

    if (availableTests.value) {
        return availableTests.value.map(item => {
            return {
                testID: item.tid,
                time: item.testDurationMinutes + ' perc',
                    established: allUsers.value.find(user => user.uid == item.uid)?.displayName || 'ismeretlen'
            }
        });
    } else {
        return [];
    }
});
function startTest (test) { //start kattintás
    if (hasCurrentUser.value) {
        store.commit('resetStates') //pl nullázzuk az időzítést.
        window.open('/' + test.data.testID, '_blank')
        const match = test.data.time.match(/^\d+/); //számmal indul e a string?
        let time = match ? parseInt(match[0], 10) : 0; //teszt ideje
        store.commit('setTestDurationMinutes', time)
        } else {
            show()
        }
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
                                <Column>
                                    <template #body="slotProps">
                                        <Button icon="pi pi-file-edit" label="Teszt indítása"
                                            @click="startTest(slotProps)" /> 
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

   
        
  


    
    



</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import store from '@/store/store.js';
import { getAllTest, addTest, setAvailable, deleteTest } from '@/firebase/test.js';
import NavBar from '@/components/home/NavBar.vue'

onMounted(() => {
    //console.log(store.getters.getTestSheet)
    init()

});
const allTests = ref(null)
const myTests = ref([])
const selectedTest = ref();
const dates = ref();

async function init() {
    store.commit('setLoading', true)
    allTests.value = await getAllTest()
    allTests.value.forEach(item => { //saját tesztek 
        if (store.getters.getCurrentUser.uid === item.uid) {
            myTests.value.push(item)
        }
        //console.log(item.uid)
    });
    //console.log(myTests.value)
    store.commit('setLoading', false)

    //console.log(setTest('ee'))
}

const columns = [
    { field: 'testID', header: 'Teszt neve' },
    { field: 'time', header: 'Teszt ideje' },
];
const options = computed(() => {
    if (myTests.value) {
        return myTests.value.map(item => {
            return {
                testID: item.tid,
            }
        });
    } else {
        return [];
    }
});


</script>
<template>
    <NavBar></NavBar>



    <div v-if="!store.getters.getLoading">

        <div class="flex justify-content-center flex-wrap ">
            <div class=" border-round border-1 surface-border mt-5 mb-3 p-4 w-full">
                <div class="card">

                    <div>
                        <div class="flex justify-content-center flex-wrap">
                            <h2> Eredmények</h2>
                        </div>
                    </div>






                    <div
                        class="p-d-flex p-jc-between p-ai-center fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-5 mb-3 p-4">
                        <label for="buttondisplay" class="font-bold block mt-4 mb-1"> Teszt neve: </label>
                        <Dropdown v-model="selectedTest" :options="options" optionLabel="testID" placeholder="Tesztek"
                            class="w-full md:w-14rem" />
                        <label for="buttondisplay" class="font-bold block mt-4 mb-1"> Időintervallum: </label>
                        <div>
                            <Calendar v-model="dates" showIcon selectionMode="range" :manualInput="false" />
                        </div>

                    </div>

                    <div
                        class="fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-5 mb-3 p-4 ">

                    </div>

                    <div
                        class="fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-5 mb-3 p-4 ">
                        <DataTable size="small" stripedRows :value="displayOnTable" tableStyle="min-width: 50rem"
                            class="mb-2">
                            <Column sortable v-for="col of columns" :key="col.field" :field="col.field"
                                :header="col.header">

                            </Column>
                        </DataTable>
                    </div>


                </div>
            </div>

        </div>

    </div>
    <div v-else>
        <BlockUI :blocked="!store.getters.getLoading" fullScreen />
        <div class="flex justify-content-center flex-wrap">
            <ProgressSpinner />
        </div>

    </div>
</template>

<style scoped>
.p-calendar input {
    width: 100% !important;
}
</style>
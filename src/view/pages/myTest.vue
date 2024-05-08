<script setup>
import { ref, computed, onMounted } from 'vue';
import store from '@/store/store.js';
import { getAllTest, addTest, setAvailable, deleteTest } from '@/firebase/test.js';
//components
import NavBar from '@/components/home/NavBar.vue'
//PrimeVue
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const show = (tid, available) => {
    if (!available) {
        toast.add({ severity: 'info', summary: 'elérhető a(z) "' + tid + '" nevű teszt', life: 3000 });
    } else {
        toast.add({ severity: 'info', summary: 'inaktív a(z) "' + tid + '" nevű teszt', life: 3000 });
    }
      
};

onMounted(() => {
    //console.log(store.getters.getTestSheet)
    init()

});
const allTests = ref(null)
const checked = ref({})
const myTests = ref([])

async function init() {
    store.commit('setLoading', false)
    allTests.value = await getAllTest()
    allTests.value.forEach(item => { //saját tesztek
        checked.value[item.tid] = item.available; // 
        if (store.getters.getCurrentUser.uid === item.uid) {
            myTests.value.push(item)
        }
        //console.log(item.uid)
    });
    //console.log(myTests.value)
    store.commit('setLoading', true)

    //console.log(setTest('ee'))
}

const items = (rowData) => [
    /*{
        label: 'Tesztnév módosítása',
        icon: 'pi pi-pencil',
        command: () => {
        }
    },
    {
        label: 'Tesztidő módosítása',
        icon: 'pi pi-clock',
        command: () => {
        }
    },
    {
        label: 'Export',
        icon: 'pi pi-file-export',
        command: () => {
        }
    },*/
    {
        label: 'Teszt törlése',
        icon: 'pi pi-trash',
        command: () => {
            //console.log(rowData.data.tid)
            deleteTest(rowData.data.tid)
            myTests.value = myTests.value.filter(item => rowData.data.tid !== item.tid);

        }
    },

];

const columns = [
    { field: 'testID', header: 'Teszt neve' },
    { field: 'time', header: 'Teszt ideje' },
];
const displayOnTable = computed(() => {

    if (myTests.value) {
        return myTests.value.map(item => {
            return {
                testID: 'https://progmester.hu/' + item.tid,
                time: item.testDurationMinutes + ' perc',
                tid: item.tid,
                available: item.available
            }
        });
    } else {
        return [];
    }
});


function changeChecked(data) {
    setAvailable(data.tid, !checked.value[data.tid])
    show(data.tid, checked.value[data.tid])
}
function modifyRow(data) {
    const matchingTests = new Proxy(myTests.value.filter(x => x.tid === data.data.tid), {
        get: function (target, prop, receiver) {
            return Reflect.get(target, prop, receiver);
        }
    });
    store.commit('setTasks', matchingTests[0].task)
}
const hasCurrentUser = computed(() => !!store.getters.getCurrentUser.uid); //falsy
</script>
<template>
    <NavBar></NavBar>
    <Toast position="top-left"/>
    <div v-if="hasCurrentUser">
        <div v-if="store.getters.getLoading">

            <div class="flex justify-content-center flex-wrap ">
                <div class=" border-round border-1 surface-border mt-5 mb-3 p-4 w-full">
                    <div class="card">

                        <div>
                            <div class="flex justify-content-center flex-wrap">
                                <h2> Tesztjeim</h2>

                            </div>
                        </div>

                        <div
                            class="fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-5 mb-3 p-4 ">
                            <DataTable size="small" stripedRows :value="displayOnTable" tableStyle="min-width: 50rem"
                                class="mb-2">

                                <Column header="Állapot">
                                    <template #body="{ data, index }">
                                        <InputSwitch v-model="checked[data.tid]" @click="changeChecked(data)" />
                                    </template>
                                </Column>

                                <Column sortable v-for="col of columns" :key="col.field" :field="col.field"
                                    :header="col.header">

                                </Column>

                                <Column>
                                    <template #body="slotProps">

                                        <RouterLink to="/Tesztletrehozasa">
                                            <SplitButton icon="pi pi-file-edit" label="Tesztlap szerkesztése"
                                                @click="modifyRow(slotProps)" :model="items(slotProps)" />
                                        </RouterLink>
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
    <div v-else>
        <Message :closable="false" >bejelentkezés szükséges</Message>
    </div>
        
   

</template>

<style scoped></style>

<script setup>
import { ref, computed, onMounted, watchEffect  } from 'vue';
import store from '@/store/store.js';
import { getAllTest, addTest, setAvailable, deleteTest,setReview,deletedReview } from '@/firebase/test.js';
import { getAllDocument } from '@/firebase/google.js';
import { getAllScore,deleteScore } from '@/firebase/score.js';


//PrimeVue
import Chart from 'primevue/chart';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
const confirm = useConfirm();
const toast = useToast();


//Components
import NavBar from '@/components/home/NavBar.vue'

onMounted(() => {
    //console.log(store.getters.getTestSheet)
    init()
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});
const chartData = ref();
const chartOptions = ref();
const myTests = ref([]) //saját tesztek
const allScores = ref()
const selectedTest = ref(); //string, a kiválasztott teszt neve
const dates = ref();
const users = ref()
//let displayOnTable = ref([])



const avgRating = computed(() => { 
    if(selectedTest.value){
        const test = myTests.value.find(x => x.tid == selectedTest.value.testID)
        console.log(test)
        if (test.rating != undefined) {
            const sum = test.rating.reduce((acc, val) => val !== null ? acc + val : acc, 0);
            const count = test.rating.filter(x => x !== null).length;
            const average = Math.ceil(sum / count);
            return average
        }
        return 0
    }
    return 0
});

const showTable = computed(() => { 
    console.log(displayOnTable)
    if (displayOnTable.value) {
        return displayOnTable.value.length == 0 ? true : false
    }
    return true
});
const showReview = computed(() => {
    return selectedTest.value !== undefined &&
           myTests.value.some(x => x.tid === selectedTest.value.testID && x.review.length > 0);
});

const setChartData = () => {
    return {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
            {
                label: 'Sales',
                data: [540, 325, 702, 620],
                backgroundColor: ['rgba(249, 115, 22, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgb(107, 114, 128, 0.2)', 'rgba(139, 92, 246 0.2)'],
                borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
                borderWidth: 1
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}

async function init() {
    let allTests = await getAllTest() //teszt kiválasztásához kell
    allTests.forEach(item => { //saját tesztek 
        if (store.getters.getCurrentUser.uid === item.uid) {
            myTests.value.push(item)
        }
    });
    allScores.value = await getAllScore() //scores tábla, ebből választjuk ki majd később a teszt pontszámait
    users.value = await getAllDocument('users') //users
    

    
    store.commit('setLoading', true)
}

const columns = [
    { field: 'date', header: 'Teszt ideje' },
    { field: 'uid', header: 'kitöltő' },
    { field: 'score', header: 'pontszám' },
];

/*
watch(() => selectedTest.value, (newValue, oldValue) => {
    
});
*/
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

const displayOnTable = computed(() => { 
    console.log('displayOnTable lefut')
    console.log(allScores.value)
    if (allScores.value && selectedTest.value) {
        let arr = []
            allScores.value.forEach(item => { //saját tesztek 
                //console.log(selectedTest.value.testID)
                //console.log(item.tid)
            if (selectedTest.value.testID == item.tid) {
                let user = users.value.find(x => x.uid === item.uid)
                arr.push({
                    date: formattedDate(item.date),
                    uid: user.displayName + ' - ' + user.email ,
                    score: item.score,
                })
            }
        });
        return arr
    }
    return null
});

function selectedChangeTest(test) {
    selectedTest.value = test.value
}
function formattedDate(time) {
    const date = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day} - ${hour}:${minute}`
}

const deleteScores = () => {
    confirm.require({
        message: 'Biztos törli az összes eredményt?',
        header: selectedTest.value.testID + ' teszt eredmények törlése',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Nem',
        acceptLabel: 'Igen',
        accept: async () => {
            toast.add({ severity: 'info', summary: 'Eredmények törlése', detail: 'Sikeres', life: 3000 });
            store.commit('setLoading', false)
            allScores.value = await deleteScore(selectedTest.value.testID) //töröljük serverről, aztán vissza is térünk a törölt elemek nélkül, mivel computedbe van a diplayOnTable, ami függ a allScores.value értékétúől, ezért itt firssül is a diplayOnTable 
            store.commit('setLoading', true)
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Eredmények törlése', detail: 'Sikertelen', life: 3000 });
        }
    });
};

const deleteReview = () => {
    confirm.require({
        message: 'Biztos törli az összes véleményt?',
        header: selectedTest.value.testID + ' vélemények törlése',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Nem',
        acceptLabel: 'Igen',
        accept: async () => {
            toast.add({ severity: 'info', summary: 'Vélemények törlése', detail: 'Sikeres', life: 3000 });
            store.commit('setLoading', false)
            await deletedReview(selectedTest.value.testID)
            if (selectedTest.value) {
            myTests.value.map(x => {
                    if (x.tid == selectedTest.value.testID) {
                        x.review = []
                    }
                })
            }   
            store.commit('setLoading', true)
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Vélemények törlése', detail: 'Sikertelen', life: 3000 });
        }
    });
};
const hasCurrentUser = computed(() => !!store.getters.getCurrentUser.uid); //falsy

</script>
<template>
    <NavBar></NavBar>
    <Toast/>
    <div v-if="hasCurrentUser">
    
        <div v-if="store.getters.getLoading">
        <div class="flex justify-content-center flex-wrap ">
            <div class=" border-round border-1 surface-border mt-5 mb-3 p-4 w-full">
                    <div>
                        <div class="flex justify-content-center flex-wrap">
                            <h2> Eredmények</h2>
                        </div>
                    </div>
                    <div class="flex justify-content-between flex-wrap fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-5 mb-3 p-4">
                            <div class="m-2">
                                <label for="buttondisplay" class="font-bold block mt-4 mb-1"> Teszt neve: </label>
                                <Dropdown v-model="selectedTest" @change="selectedChangeTest" :options="options" optionLabel="testID" placeholder="Tesztek"
                                class="w-full md:w-14rem" />
                            </div>
                            <div v-tooltip.top="'Átlag értékelés'" class="m-2">
                                <Rating v-model="avgRating" readonly :cancel="false" />
                            </div>
                        <div v-if="false">
                            <label for="buttondisplay" class="font-bold block mt-4 mb-1"> Időintervallum: </label>
                            <Calendar v-model="dates" showIcon selectionMode="range" :manualInput="false" />
                        </div>
                    </div>
                    <div v-if="!showTable">
                        <div
                            class="fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-5 mb-3 p-4 ">
                            <DataTable size="small" stripedRows :value="displayOnTable" tableStyle="min-width: 50rem"
                                class="mb-2">
                                <Column sortable v-for="col of columns" :key="col.field" :field="col.field"
                                    :header="col.header">
                                </Column>
                            </DataTable>
                            <Button @click="deleteScores()" class="mt-3" label="Összes eredmény törlése" icon="pi pi-trash" severity="danger"  />
                        </div>
                    </div>

                        <ConfirmDialog></ConfirmDialog>
                        <div v-if="false" class="flex justify-content-center fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-5 mb-3">
                            <div class="chart-container m-8">
                                <Chart type="pie" :data="chartData" class="mb-8" :options="chartOptions" />
                                <Chart type="bar" :data="chartData" :options="chartOptions" />
                            </div>
                        </div>

                        <div v-if="showReview" class="fadein animation-duration-500 border-round border-1 surface-border surface-ground mt-5 mb-3">
                            <div class="flex justify-content-center align-content-center mt-5">
                                <h2> Vélemények</h2>
                            </div>
                            <div v-if="selectedTest">
                                <div v-for="test of myTests" :key="test.tid">
                                    <div v-if="test.tid == selectedTest.testID">
                                        <Card v-for="item in test.review" :key="item" class="m-5">
                                            <template #content>
                                                <p class="m-0">
                                                "{{ item }}"
                                                </p>
                                            </template>
                                        </Card>
                                    </div>
                            </div>
                                 <Button @click="deleteReview()" class="m-5" label="Összes vélemény törlése" icon="pi pi-trash" severity="danger"  />
                       
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

<style scoped>



.chart-container {
    position: relative;
    width: 100%;
    max-width: 600px; /* Válaszd az általad preferált maximális szélességet */
    margin: 0 auto; /* Középre igazítás */
}
</style>
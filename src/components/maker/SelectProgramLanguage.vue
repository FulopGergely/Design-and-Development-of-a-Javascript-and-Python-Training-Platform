<script setup>
import { ref, onMounted, toRef } from 'vue';
import store from '@/store/store.js';
//PrimeVue
import { useConfirm } from "primevue/useconfirm";
onMounted(() => {
});

const props = defineProps(['modelValue', 'taskCode'])
const emit = defineEmits(['update:modelValue','update:taskCode'])

const previousValue = toRef(props, 'modelValue');
const value = ref(props.modelValue);


const initPyCode = `def my_function(x):\n return x`
const initJsCode = `function myFunction( p1 ) { \nreturn p1\n}`


const options = ref([
    { icon: '/javascript.svg', value: 'javascript' },
    { icon: '/python.svg', value: 'python' },
]);
/*
watch(() => value.value, (newValue, oldValue) => {
  console.log(newValue); 
  console.log(oldValue);
  //console.log('oldValue: '); 
  //console.log(oldValue);

   if (newValue == null) {
    confirmDelete(oldValue)
  } else if (newValue != null && oldValue != null && oldValue != newValue && oldValue != '') {
    confirmChange(newValue)
  }
    else {
       emit('update:modelValue', newValue) 
    }
 
  
  /*
    if (newValue == null) {
        console.log('a');
        
        emit('update:modelValue', {})
    } 
    else {
        console.log('b');
        emit('update:modelValue', newValue)
        newValue.value == 'javascript' ? emit('update:taskCode', initJsCode) : emit('update:taskCode', initPyCode);
        //confirmChange(value.value)
    }
  
});
*/
function change(select) {
    if (props.taskCode == '') {
        emit('update:modelValue', select) 
    } else{
       if (select == null ) {
        confirmDelete()
        }
        else {
        confirmChange(select)
        } 
    }
    
 
    
}

const confirm = useConfirm();
const confirmChange = (select) => {
    confirm.require({
        closeButton: false,
        message: 'Biztos vált futtatási környezetet? Az eddig írt kód elvész',
        header: 'Törlés',
        icon: 'pi pi-info-circle',
        rejectClass: 'p-button-text p-button-text',
        acceptClass: 'p-button-danger p-button-text',
        acceptLabel: 'Igen',
        rejectLabel: 'Nem',
        accept: () => {
            store.commit('deleteTestsAndParams')
            emit('update:modelValue', select) 
        },
        reject: () => {
            select?.value == 'python' ? value.value =  { icon: '/javascript.svg', value: 'javascript' } : value.value = { icon: '/python.svg', value: 'python' }
        },
    });
};
const confirmDelete = () => {
    confirm.require({
        closeButton: false,
        message: 'Biztos kikapcsolja ennél a feladatnál a futtatási környezetet? Az eddig írt kód elvész',
        header: 'Törlés',
        icon: 'pi pi-info-circle',
        rejectClass: 'p-button-text p-button-text',
        acceptClass: 'p-button-danger p-button-text',
        acceptLabel: 'Igen',
        rejectLabel: 'Nem',
        accept: () => {
                store.commit('deleteTestsAndParams')
                emit('update:modelValue', {})
                emit('update:taskCode', '')
        },
        reject: () => {
            value.value = previousValue.value
        },
        closeCallback: () => {
            console.log('close');
            
        }
    });
};




</script>
<template>
   <ConfirmDialog :closable="false" ></ConfirmDialog>
    <div class="flex justify-content-between flex-wrap">
        <div class="flex align-items-center justify-content-center  border-round ">
            <div>
                <SelectButton v-model="value" :options="options" dataKey="value" aria-labelledby="custom"
                    @click="change(value)" >
                    <template #option="slotProps">
                        <img v-if="slotProps.option.icon" :src="slotProps.option.icon" alt="Custom Icon"
                            :style="{ height: '20px' }" />
                    </template>
                </SelectButton>
            </div>
        </div>
        
    </div>
</template>
<style scoped></style>
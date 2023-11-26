<script setup>
import { ref } from "vue";

const items = ref([
    {
        id: '0',
        label: 'Feladat',
        command: () => {
            // Itt helyezze el a kívánt műveleteket, amelyeket a menüelem kiválasztásakor szeretne elvégezni
            console.log('Feladat 1 kiválasztva');
        },
        icon: 'pi pi-user'
    },
    {
        id: '1',
        disabled: false,
        label: 'Feladat',
        icon: 'pi pi-user'
    },

    {
        id: '2',
        disabled: false,
        label: 'Feladat',
        icon: 'pi pi-times'
    },

    {
        id: '3',
        disabled: false,
        label: 'Feladat',
        command: () => {
            // Itt helyezze el a kívánt műveleteket, amelyeket a menüelem kiválasztásakor szeretne elvégezni
            console.log('Feladat 30 kiválasztva');
        },
        icon: 'pi pi-times',
        activeStep: 29,
    },


]);

function asd(a) {
    console.log(a)
}

</script>
<template>
    <div class="card">
        <Steps :model="items" class="mt-8 mb-6" :activeStep="0" :readonly="false">
            <template #item="{ item, active }">
                <span v-if="item.id != 3"
                    :class="['inline-flex align-items-center justify-content-center align-items-center border-circle border-primary border-1 h-2rem w-2rem z-1 cursor-pointer', { 'bg-primary': active, 'surface-overlay text-primary': !active }]">
                    {{ item.id }}
                </span>
                <span v-if="item.id == 3"
                    :class="['inline-flex align-items-center justify-content-center align-items-center border-circle border-primary border-1 h-2rem w-2rem z-1 cursor-pointer', { 'bg-primary': active, 'surface-overlay text-primary': !active }]">

                    <i :class="[item.icon, 'text-xl']" />
                </span>
            </template>
        </Steps>
    </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue';
//components

const visible = ref(false);

const toggle = () => {
    visible.value = !visible.value;
};



</script>
<template>
    <div>


        <div class="flex overflow-hidden">
            <div class="flex-none flex align-items-center justify-content-center font-bold m-2 px-5 py-3 border-round">
                PrimeFlex</div>
            <div class="flex-grow-1 flex align-items-center justify-content-center font-bold m-2 px-5 py-3 border-round">
                <Toolbar>
                    <template #start>
                    </template>
                    <template #center>
                        <div class="card flex justify-content-center">
                            <form @submit="onSubmit" class="flex flex-column gap-2">
                                <span class="p-float-label">
                                    <InputText id="value" v-model="value" type="text" :class="{ 'p-invalid': errorMessage }"
                                        aria-describedby="text-error" />
                                    <label for="value">Name - Surname</label>
                                </span>
                                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
                                <Button label="Submit" />
                            </form>
                            <Toast />
                        </div>
                    </template>
                    <template #end>
                    </template>
                </Toolbar>
            </div>
            <div class="flex-none flex align-items-center justify-content-center font-bold m-2 px-5 py-3 border-round">
                PrimeFlex</div>
        </div>

        <div class="flex overflow-hidden">
            <div
                class="flex-none flex align-items-center justify-content-center bg-primary font-bold m-2 px-5 py-3 border-round">
                PrimeFlex</div>
            <div
                class="flex-grow-1 flex align-items-center justify-content-center bg-primary font-bold m-2 px-5 py-3 border-round">
                PrimeFlex</div>
            <div
                class="flex-none flex align-items-center justify-content-center bg-primary font-bold m-2 px-5 py-3 border-round">
                PrimeFlex</div>
        </div>

        <Button label="Show" icon="pi pi-external-link" @click="toggle" />

        <Dialog v-model:visible="visible" maximizable modal header="Header" :style="{ width: '50rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
            </p>
        </Dialog>
    </div>
</template>
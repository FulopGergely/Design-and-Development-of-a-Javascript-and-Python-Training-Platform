<script setup>
import { ref } from 'vue';





</script>
<template>
    <div class=" field grid mb-5 mt-3">
        <label for="firstname3" class="col-fixed" style="width:180px">Teszt neve</label>
        <div class="col">
            <InputText v-tooltip="'teszt egyedi azonosítója'" type="text" v-model="testName" />
        </div>
    </div>
    <div class="field grid mb-5">
        <label for="lastname3" class="col-fixed" style="width:180px">Teszt ideje (perc)</label>
        <div class="col">
            <InputText v-tooltip="'pl.: 10, az tíz perces teszt idő'" type="text" v-model="testTime" />
        </div>
    </div>
    <div class="field grid mb-5">
        <label for="lastname3" class="col-fixed" style="width:180px">Tudjunk ugrálni a feladatok között?</label>
        <div class="col">
            <InputText type="text" v-model="testTime" />
        </div>
    </div>
</template>

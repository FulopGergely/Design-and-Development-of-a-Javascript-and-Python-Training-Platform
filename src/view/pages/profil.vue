<script setup>
import { ref, onMounted, computed } from 'vue';
import store from '@/store/store.js';
import NavBar from '@/components/home/NavBar.vue'

/*
import { usePrimeVue } from 'primevue/config';

const PrimeVue = usePrimeVue();
PrimeVue.changeTheme('md-dark-indigo', 'md-light-indigo', 'theme-link', () => { });



const selectedTheme = ref('soho-light'); // Az alapértelmezett téma
const linkId = ref('theme-link');
const themes = ref([
    { label: 'Lara Light Teal', value: 'lara-light-teal' },
    { label: 'MDC Light Indigo', value: 'mdc-light-indigo' },
    { label: 'Soho Light', value: 'soho-light' },
]);



const currentThemePath = computed(() => {
    // Az aktuális témához vezető elérési út
    return `themes/${selectedTheme.value}/theme.css`;
});
const themeChange = () => {
    // PrimeVue changeTheme függvény hívása
    PrimeVue.changeTheme('current-theme', selectedTheme.value, linkId.value, () => { });
};
onMounted(() => {
    // Az alkalmazás inicializálódott, most hívjuk meg a changeTheme függvényt
    themeChange();
});
*/
</script>
<template>
    <NavBar></NavBar>
    <div>

        <div class="flex justify-content-center flex-wrap">
            <div class=" border-round border-1 surface-border surface-ground mt-5 mb-3 p-4 " style="width: 500px;">
                <div>
                    <div class="flex justify-content-center flex-wrap">
                        <img v-if="store.getters.getCurrentUser.photoURL" class="avatar m-3"
                            :src="store.getters.getCurrentUser.photoURL" shape="circle"
                            style="height: 100px; width: 100px;">
                    </div>
                    <div class="flex justify-content-center flex-wrap">
                        <div class="m-3"> {{ store.getters.getCurrentUser.displayName }}</div>
                    </div>
                    <div class="flex justify-content-center flex-wrap">
                        <div class="m-3">{{ store.getters.getCurrentUser.email }}</div>
                    </div>
                    <div class="">
                    
                    </div>




                </div>
                <div></div>
            </div>
        </div>
    </div>
</template>
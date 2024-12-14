<script setup>
import store from '@/store/store.js';
import NavBar from '@/components/home/NavBar.vue'
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
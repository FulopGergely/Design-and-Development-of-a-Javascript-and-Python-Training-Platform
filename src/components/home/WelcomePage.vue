<script setup>
import store from '@/store/store.js'
import { onMounted, ref } from 'vue'
import LoginButton from './LoginButton.vue'

onMounted(() => {
  store.commit('setLoading', true)
  console.log(store.getters.getLoading)
})
const pictureLoaded = ref(false)
function loading() {
  pictureLoaded.value = true //kép betöltés simább megjelenítése miatt
}
</script>

<template>
  <div v-if="store.getters.getLoading">
    <div class="grid">
      <div class="col-12">
        <div class="flex flex-column align-items-center justify-content-center h-full m-5">
          <div class="text-5xl m-2">JavaScript és Python tesztfeladatsorok</div>
          <div class="text-5xl m-2">készítése és kitöltése</div>
        </div>
      </div>
      <div class="h-10rem"></div>
      <div class="col-12">
        <LoginButton />

        <div
          class="fadein animation-duration-500 flex flex-column align-items-center justify-content-center h-full"
        >
          <img
            @load="loading"
            class="flex flex-column align-items-center justify-content-center"
            src="/03.png"
            alt="Egy kép"
            style="width: 50%"
          />
        </div>

        <div v-if="!pictureLoaded" class="col-12">
          <div class="flex flex-column align-items-center justify-content-center h-full">
            <div class="" style="width: 1300px; height: 800px"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="h-10rem"></div>
  </div>
  <div v-else>
    <div class="flex justify-content-center flex-wrap">
      <ProgressSpinner />
    </div>
  </div>
</template>

<style scoped>
@keyframes slidedown-icon {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(20px);
  }

  100% {
    transform: translateY(0);
  }
}

.slidedown-icon {
  animation: slidedown-icon;
  animation-duration: 3s;
  animation-iteration-count: infinite;
}

.box {
  background-image: radial-gradient(var(--primary-300), var(--primary-600));
  border-radius: 50% !important;
  color: var(--primary-color-text);
}
</style>

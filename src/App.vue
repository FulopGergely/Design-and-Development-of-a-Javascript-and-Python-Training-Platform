<script setup>
import store from '@/store/store.js';
import { ref, computed } from "vue";
//components
import NavBar from '@/components/home/NavBar.vue'

const hasCurrentUser = computed(() => !!store.getters.getCurrentUser.uid); //falsy



</script>

<template>
  <div v-if="hasCurrentUser">
    <router-view />
  </div>
  <div v-else>
    <NavBar />

    

<div class="h-2rem"></div>
  <div class="card flex flex-column align-items-center">
        <div class="flex flex-column align-items-center gap-2">
            <span class="text-xl font-medium">Görgess le</span>
            <span class="slidedown-icon h-2rem w-2rem bg-primary border-circle inline-flex align-items-center justify-content-center">
                <i class="pi pi-arrow-down" />
            </span>
        </div>
        <div class="h-10rem"></div>
        <div v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout' }" >
          <span class="text-3xl font-bold">Üdvözöllek Python és Javascript oktató oldalon!!</span>
          <div class="h-2rem"></div>
          <span >Ezen az oldalon, lehetőséged van Python és JavaScript teszteket kitölteni és készíteni, mindenki számára elérhető módon. Célunk, hogy széles körben terjesszük a kódolás fontosságának tudatát és tanulásának lehetőségét, valamint segítsünk fejleszteni ezt a készséget.

Az oldal két fő funkciója közül az egyik a teszt készítés, ami elsősorban tanároknak szól, míg a másik a tesztkitöltés lehetősége, amely a diákok számára nyújt lehetőséget.

Ahhoz, hogy hozzáférj ezekhez a funkciókhoz, először be kell jelentkezned Google fiókoddal a jobb felső sarokban található gomb segítségével. Ezután egyszerűen írd be a teszt nevét, és már kezdheted is a kódolással kapcsolatos kalandodat!

Gyere és csatlakozz hozzánk a Kódolás Világában, ahol a lehetőségek végtelenek, és a tudás csak egy kattintásra van tőled!
  
  </span>
        </div>
        <div class="h-10rem"></div>
        <img src="/welcome.webp" style="width: 100%;" alt="">
        <div class="h-30rem"></div>
        Itt, ezen az oldalon, lehetőséged van Python és JavaScript teszteket kitölteni és készíteni, mindenki számára elérhető módon. Célunk, hogy széles körben terjesszük a kódolás fontosságának tudatát és tanulásának lehetőségét, valamint segítsünk fejleszteni ezt a készséget.
        <div v-animateonscroll="{ enterClass: 'fadeinleft', leaveClass: 'fadeoutleft' }" class="flex box shadow-4 justify-content-center align-items-center h-10rem w-10rem sm:h-15rem sm:w-15rem border-round animation-duration-1000 animation-ease-in-out">
            <span class="text-3xl font-bold">fade-left</span>
        </div>
        <div class="h-30rem"></div>
        <div v-animateonscroll="{ enterClass: 'fadeinright', leaveClass: 'fadeoutright' }" class="flex box shadow-4 justify-content-center align-items-center h-10rem w-10rem sm:h-15rem sm:w-15rem border-round animation-duration-1000 animation-ease-in-out">
            <span class="text-3xl font-bold">fade-right</span>
        </div>
        <div class="h-30rem"></div>
        <div v-animateonscroll="{ enterClass: 'zoomin', leaveClass: 'fadeout' }" class="flex box shadow-4 justify-content-center align-items-center h-10rem w-10rem sm:h-15rem sm:w-15rem border-round animation-duration-1000">
            <span class="text-3xl font-bold">zoom</span>
        </div>
        <div class="h-30rem"></div>
        <div v-animateonscroll="{ enterClass: 'flipleft', leaveClass: 'fadeout' }" class="flex box shadow-4 justify-content-center align-items-center h-10rem w-10rem sm:h-15rem sm:w-15rem border-round animation-duration-1000 animation-ease-in-out">
            <span class="text-3xl font-bold">flip-left</span>
        </div>
        <div class="h-30rem"></div>
        <div v-animateonscroll="{ enterClass: 'flipup', leaveClass: 'fadeout' }" class="flex box shadow-4 justify-content-center align-items-center h-10rem w-10rem sm:h-15rem sm:w-15rem border-round animation-duration-1000 animation-ease-in-out">
            <span class="text-3xl font-bold">flip-y</span>
        </div>
        <div class="h-30rem"></div>
        <div v-animateonscroll="{ enterClass: 'scalein', leaveClass: 'fadeout' }" class="flex box shadow-4 justify-content-center align-items-center h-10rem w-10rem sm:h-15rem sm:w-15rem border-round animation-duration-1000 animation-ease-in-out">
            <span class="text-3xl font-bold">scalein</span>
        </div>
    </div>

        Üdvözöllek a Kódolás Világában!

Itt, ezen az oldalon, lehetőséged van Python és JavaScript teszteket kitölteni és készíteni, mindenki számára elérhető módon. Célunk, hogy széles körben terjesszük a kódolás fontosságának tudatát és tanulásának lehetőségét, valamint segítsünk fejleszteni ezt a készséget.

Az oldal két fő funkciója közül az egyik a teszt készítés, ami elsősorban tanároknak szól, míg a másik a tesztkitöltés lehetősége, amely a diákok számára nyújt segítséget.

Ahhoz, hogy hozzáférj ezekhez a funkciókhoz, először be kell jelentkezned Google fiókoddal a jobb felső sarokban található gomb segítségével. Ezután egyszerűen írd be a teszt nevét, és már kezdheted is a kódolással kapcsolatos kalandodat!

Gyere és csatlakozz hozzánk a Kódolás Világában, ahol a lehetőségek végtelenek, és a tudás csak egy kattintásra van tőled!
  
  
  
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


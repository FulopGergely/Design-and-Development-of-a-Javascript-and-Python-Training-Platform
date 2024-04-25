<script setup>
import { signInWithGoogle, signOutWithGoogle } from '@/firebase/google.js';
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';
import store from '@/store/store.js';
import router from '@/router/index.js';

//import { myFunction } from '@/main.js'; // Az elérési útvonal a fájlhoz

/*
import { usePrimeVue } from 'primevue/config';
const PrimeVue = usePrimeVue();
function asd() {
    PrimeVue.changeTheme('soho-dark', 'soho-light', 'theme-link', () => {
    console.log('A téma sikeresen megváltozott.');
    });
}*/

const prop = defineProps({
    user: { //testFiller / testCreator - segédváltozó, mivel több helyen is használjuke zt a componenset, ezért ezzel különböztetjük meg hogy admin vagy tesztkitöltő menüsávot jelenítsen meg
        type: String,
        default: () => ''
    },
    task: {
        type: Array,
        default: () => []
    },
    time: {
        type: Number,
        default: () => 0
    }
})

onMounted(() => {
    store.commit('setTestDurationMinutes', prop.time)
    console.log(prop.time)
    store.commit('startCountdown') //időzítőt elindítjuk

    // Témaváltás példa



    
    //startCountdown();
    //old
    /*
    clearInterval(refreshIntervalId);
    if (this.$store.state.countDownTime > 0) {
      this.$store.dispatch('changeCountdownTime', this.$store.state.countDownTime - 1)
    }
    console.log(this.$store.state.countDownTime)
    refreshIntervalId = setInterval(() => {
      this.$store.dispatch('startCountdown');
      if (this.$store.state.countDownTime <= 0) {
        clearInterval(refreshIntervalId);
      }
    }, 1000);
    */ 

});

const hasCurrentUser = computed(() => {
    return !!store.getters.getCurrentUser.uid
}); //falsy, alapból nem true vagy false értéket ad hanem stringet, ha tagadjuk akkor booleant, ha duplán tagadjuk akkor visszafordítjuk true-ra ha van benne érték.

const items = ref(prop.user == 'testFiller' ? '' : [
    {
        label: 'Tesztírás',
        icon: 'pi pi-pencil',
        href: '/Tesztiras'
    },
    {
        label: 'Tesztjeim',
        icon: 'pi pi-book',
        href: '/Tesztjeim'
    },
    {
        label: 'Teszt létrehozása',
        icon: 'pi pi-plus',
        href: '/Tesztletrehozasa'
    },
    {
        label: 'Eredmények',
        icon: 'pi pi-chart-bar',
        href: '/Eredmenyek'
    },
    /*
    {
        label: 'Mások tesztjei',
        icon: 'pi pi-users',
        href: '/Admin/Megosztas'
    },*/
]);
const profilList = ref([
    /*{
        label: 'Profil',
        icon: 'pi pi-user',
        command: () => {
            window.location.href = '/Profil';
        }
    },*/
    {
        label: 'Kijelentkezés',
        icon: 'pi pi-sign-out',
        command: () => {
            login()
        }
    },


]);

function login() {
    if (!hasCurrentUser.value) {
        signInWithGoogle()
    } else {
        signOutWithGoogle()
        router.push('/');
    }
}
//const labelTextUserName = ref(store.getters.getCurrentUser.displayName);

const displayName = computed(() => {
    return store.getters.getCurrentUser.displayName
}); //falsy, alapból nem true vagy false értéket ad hanem stringet, ha tagadjuk akkor booleant, ha duplán tagadjuk akkor visszafordítjuk true-ra ha van benne érték.



function toggleColorScheme() {
    document.body.classList.toggle("my-app-dark");
}




</script>

<template>
    <div>
        <Menubar :model="items" ref="myMenubar">
            <template #start>
                <div v-if="hasCurrentUser && prop.user == 'testFiller'">
                    idő: {{  store.getters.getTestDurationMinutes }}
                </div>
            </template>
            <template #item="{ item, props }">
                <router-link v-if="hasCurrentUser" :to="item.href" v-ripple v-bind="props.action">
                    <span style="margin-right: 5px;" :class="item.icon" />
                    <span>{{ item.label }}</span>
                </router-link>
            </template>
            <template #end>
                <div class="flex align-items-center gap-2">
                  
                    <Button  class="" @click="toggleColorScheme()" label="dark" ></Button>
                    
                    <SplitButton v-if="hasCurrentUser" :model="profilList" icon="pi pi-user" class="bg-primary border-round mr-4"
                        :label="displayName">
                    </SplitButton>
                    <Button v-if="!hasCurrentUser" class="" @click="login" label="Bejelentkezés" icon="pi pi-user"></Button>
                </div>
            </template>
        </Menubar>
    </div>
</template>
<style>
.fixed-menu {
    max-height: 60px;
}

.avatar {
    height: 40px;
    width: 40px;
}
</style>


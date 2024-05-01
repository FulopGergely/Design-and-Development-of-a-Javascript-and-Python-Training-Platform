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
        label: 'Főoldal',
        icon: 'pi pi-home',
        href: '/'
    },
    {
        label: 'Tesztek',
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

const icon = ref()
function toggleColorScheme () {
    if('lara-light-blue' === store.getters.getTheme) {
        import('primevue/resources/themes/lara-dark-blue/theme.css');
        icon.value = 'pi pi-moon'
        store.commit('setTheme', 'lara-dark-blue')
    } else {
        icon.value = 'pi pi-sun'
        import('primevue/resources/themes/lara-light-blue/theme.css');
        store.commit('setTheme', 'lara-light-blue')
    }
    window.location.reload();
}

function getIcon() {

    return 
}


</script>

<template>
    <div>
        <Menubar class="fadein animation-duration-500 " :model="items" ref="myMenubar">
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
                    
                    <Button v-if="store.getters.getTheme=='lara-light-blue'" icon="pi pi-moon" rounded text    severity="secondary"  class="mr-2" @click="toggleColorScheme()" label="" ></Button>
                    <Button v-if="store.getters.getTheme=='lara-dark-blue'" icon="pi pi-sun" rounded  text   severity="secondary"  class="mr-2" @click="toggleColorScheme()" label="" ></Button>
                    <SplitButton v-if="hasCurrentUser" :model="profilList" icon="pi pi-user" class="bg-primary border-round mr-4"
                        :label="displayName">
                    </SplitButton>
                    <Button v-if="!hasCurrentUser" class="bg-primary border-round mr-4" @click="login" label="Google Bejelentkezés" icon="pi pi-google"></Button>
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


<script setup>
import { signInWithGoogle, signOutWithGoogle } from '@/firebase/google.js';
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';
import store from '@/store/store.js';
import router from '@/router/index.js';

//import { myFunction } from '@/main.js'; // Az elérési útvonal a fájlhoz

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
    store.commit('startCountdown') //időzítőt elindítjuk
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
        label: 'Saját tesztek',
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
]);

const registered = ref([
    {
        label: 'Profil',
        icon: 'pi pi-user',
        command: () => {
            window.location.href = '/Profil';
        }
    },
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


const menu = ref();
const toggle = (event) => {
    menu.value.toggle(event);
};

function timeShow() {
    let time = store.getters.getTestDurationMinutes - store.getters.getTimer
    const minutes = Math.floor(time / 60);
    const remainingSeconds = time % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

</script>

<template>
    <div>
        <Menubar class="fadein animation-duration-500 " :model="items" ref="myMenubar">
            <template #start>
                <div v-if="hasCurrentUser && prop.user == 'testFiller'">
                    idő: {{ timeShow() }}
                </div>
                <div class="ml-2"></div>
            </template>
            <template #item="{ item, props }">
                <router-link :to="item.href" v-ripple v-bind="props.action">
                        <span style="margin-right: 5px;" :class="item.icon" />
                        <span >{{ item.label }}</span>
                </router-link>
            </template>
            <template #end>
                <div class="flex align-items-center gap-2 ml-4">
                    <Button v-if="store.getters.getTheme=='lara-light-blue'" icon="pi pi-moon" rounded text    severity="secondary"  class="mr-2" @click="toggleColorScheme()" label="" ></Button>
                    <Button v-if="store.getters.getTheme=='lara-dark-blue'" icon="pi pi-sun" rounded  text   severity="secondary"  class="mr-2" @click="toggleColorScheme()" label="" ></Button>
                    <div v-if="hasCurrentUser">
                        <Button text rounded type="button" icon="pi pi-user"  @click="toggle" class="mr-2">
                             <img v-if="store.getters.getCurrentUser.photoURL" class="avatar m-3"
                            :src="store.getters.getCurrentUser.photoURL" shape="circle"
                            style="height: 50px; width: 50px;">
                        </Button>
                        <Menu ref="menu" id="overlay_menu" :model="registered" :popup="true" /> 
                    </div>
                    <div v-else> 
                        <Button rounded type="button" icon="pi pi-user"  @click="login" class="mr-2">
                        </Button>
                    </div> 
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


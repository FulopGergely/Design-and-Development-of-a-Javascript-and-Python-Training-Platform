<script setup>
import { signInWithGoogle, signOutWithGoogle } from '@/firebase/google.js';
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';
import store from '@/store/store.js';

const prop = defineProps({
    user: { //testFiller / testCreator - segédváltozó, mivel több helyen is használjuke zt a componenset, ezért ezzel különböztetjük meg hogy admin vagy tesztkitöltő menüsávot jelenítsen meg
        type: String,
        default: () => ''
    },
    task: {
        type: Array,
        default: () => []
    }
})

const hasCurrentUser = computed(() => !!store.getters.getCurrentUser.uid); //falsy

const items = ref(prop.user == 'testFiller' ? '' : [
    {
        label: 'Tesztjeim',
        icon: 'pi pi-book',
        href: '/Admin/Tesztjeim'
    },
    {
        label: 'Teszt létrehozása',
        icon: 'pi pi-plus',
        href: '/Admin/Tesztletrehozasa'
    },
    {
        label: 'Eredmények',
        icon: 'pi pi-chart-bar',
        href: '/Admin/Eredmenyek'
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
const sum = ref(0)

function login() {
    if (!hasCurrentUser.value) {
        signInWithGoogle()
    } else {
        signOutWithGoogle()
    }
}
const labelTextUserName = ref(store.getters.getCurrentUser.displayName);
const labelLogin = ref('Bejelentkezés')
const updateLabel = () => {
    const screenWidth = window.innerWidth;
    labelTextUserName.value = screenWidth < 300 ? '' : store.getters.getCurrentUser.displayName;
    labelLogin.value = screenWidth < 300 ? '' : 'Bejelentkezés';
};

const countdownValue = ref(60); // Például 60 másodperc
let timer;
const startCountdown = () => {
  timer = setInterval(() => {
    console.log(timer)
    countdownValue.value--;
    if (countdownValue.value === 0) {
      clearInterval(timer);
      // Itt tudsz bármilyen logikát hozzáadni, amit a visszaszámlálás befejezésekor akarsz végrehajtani
    }
  }, 1000);
  
};
const stopCountdown = () => {
  clearInterval(timer);
};

onMounted(() => {
    updateLabel();
    window.addEventListener('resize', updateLabel);
    startCountdown();
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

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateLabel);
});

</script>

<template>
    <div>
        <Menubar :model="items" ref="myMenubar">
            <template #start>
                <div v-if="hasCurrentUser && prop.user == 'testFiller'">
                    idő: {{  timer }}
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
                    <SplitButton v-if="hasCurrentUser" :model="profilList" icon="pi pi-user" class="bg-primary border-round mr-4"
                        :label="labelTextUserName">
                    </SplitButton>
                    <Button v-if="!hasCurrentUser" class="" @click="login" :label="labelLogin" icon="pi pi-user"></Button>
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


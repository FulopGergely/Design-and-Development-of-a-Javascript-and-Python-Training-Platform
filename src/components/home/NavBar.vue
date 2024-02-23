<script setup>
import { signInWithGoogle, signOutWithGoogle } from '@/firebase/google.js';
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';
import store from '@/store/store.js';


const hasCurrentUser = computed(() => !!store.getters.getCurrentUser.uid); //falsy

const items = ref([
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
    {
        label: 'Mások tesztjei',
        icon: 'pi pi-users',
        href: '/Admin/Megosztas'
    },
]);
const profilList = ref([
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


onMounted(() => {

});

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

onMounted(() => {
    updateLabel();
    window.addEventListener('resize', updateLabel);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateLabel);
});

</script>

<template>
    <div>
        <Menubar :model="items" ref="myMenubar">
            <template #start>
                <div v-if="hasCurrentUser">
                    idő:
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
                    <SplitButton v-if="hasCurrentUser" :model="profilList" icon="pi pi-user" class="bg-primary border-round"
                        @click="this.$router.push('/Admin/Profil')" :label="labelTextUserName">
                    </SplitButton>
                    <Button v-if="!hasCurrentUser" class="" @click="login" :label="labelLogin" icon="pi pi-user"></Button>
                </div>
                <div v-if="false">
                    <a href="https://github.com/FulopGergely/szakdolgozat/tree/CreateQuiz">
                        <img src="@/assets/github.svg" style="height: 30px" alt="GitHub">
                    </a>
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


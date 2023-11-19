<script setup>
import { signInWithGoogle, signOutWithGoogle } from '@/firebase/google.js';
import { ref, onMounted, computed } from 'vue';
import store from '@/store/store.js';

const logButtonLabel = computed(() => hasCurrentUser.value ? 'Kijelentkezés' : 'Bejelentkezés');
const hasCurrentUser = computed(() => !!store.getters.getCurrentUser.uid);

const items = ref([
    {
        label: 'Teszt',
        icon: 'pi pi-pencil',
        href: 'Teszt'
    },
    {
        label: 'Tesztjeim',
        icon: 'pi pi-book',
        href: 'Tesztjeim'
    },
    {
        label: 'Teszt létrehozása',
        icon: 'pi pi-plus',
        href: 'Tesztletrehozasa'
    },
    {
        label: 'Eredmények',
        icon: 'pi pi-chart-bar',
        href: 'Eredmenyek'
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


</script>

<template>
    <div>
        <Menubar :model="items" ref="myMenubar">
            <template #start>
            </template>
            <template #item="{ item, props }">
                <router-link v-if="hasCurrentUser" :to="item.href" v-ripple v-bind="props.action">
                    <span style="margin-right: 5px;" :class="item.icon" />
                    <span>{{ item.label }}</span>
                </router-link>
            </template>
            <template #end>
                <div class="flex align-items-center gap-2">
                    <Button class="w-8rem sm:w-auto" @click="login" :label="logButtonLabel" icon="pi pi-user"
                        style="margin-right: 1rem;"></Button>
                    <Avatar v-if="hasCurrentUser" class="avatar" :image="store.getters.getCurrentUser.photoURL"
                        shape="circle">
                    </Avatar>
                </div>

                <div v-if="false">
                    <a href="https://github.com/FulopGergely/szakdolgozat/tree/CreateQuiz">
                        <img src="@/assets/github.svg" style="height: 30px" alt="GitHub">
                    </a>
                </div>
            </template>
        </Menubar>
        <router-view />
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


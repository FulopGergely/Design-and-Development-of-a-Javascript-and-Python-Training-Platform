<script setup>
import { signInWithGoogle, signOutWithGoogle } from '@/firebase/google.js';
import { ref, onMounted, computed } from 'vue';
import store from '@/store/store.js';


const hasCurrentUser = computed(() => !!store.getters.getCurrentUser.uid); //falsy


const profilList = ref([
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
        console.log('asd')
    } else {
        signOutWithGoogle()
    }
}

</script>

<template>
    <div>
        <Menubar ref="myMenubar">
            <template #start>
                <div v-if="hasCurrentUser">
                    idő: asd
                </div>
            </template>
            <template #end>
                <div class="flex align-items-center gap-2">
                    <SplitButton v-if="hasCurrentUser" :model="profilList" icon="pi pi-user" class="bg-primary border-round"
                        :label="store.getters.getCurrentUser.displayName">
                    </SplitButton>
                    <Button v-if="!hasCurrentUser" class="w-8rem sm:w-auto" @click="login" label="Bejelentkezés"
                        icon="pi pi-user"></Button>
                    <Avatar v-if="hasCurrentUser && !store.getters.getCurrentUser.photoURL" class="avatar"
                        :image="store.getters.getCurrentUser.photoURL" shape="circle">
                    </Avatar>
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


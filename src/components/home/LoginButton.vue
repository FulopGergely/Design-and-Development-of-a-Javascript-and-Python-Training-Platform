<script setup>
import { signInWithGoogle, signOutWithGoogle, signInWithMicrosoft } from '@/firebase/google.js'
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import store from '@/store/store.js';
//components
import LoginButton from './LoginButton.vue'

const hasCurrentUser = computed(() => {
    return !!store.getters.getCurrentUser.uid
}); //falsy, alapból nem true vagy false értéket ad hanem stringet, ha tagadjuk akkor booleant, ha duplán tagadjuk akkor visszafordítjuk true-ra ha van benne érték.


function login() {
  if (!hasCurrentUser.value) {
    signInWithGoogle()
  } else {
    signOutWithGoogle()
    router.push('/')
  }
}
</script>
<template>
  <div v-if="!hasCurrentUser">
    <div class="flex justify-content-center fadein animation-duration-500 m-8">
      <div class="login-buttons">
        <button @click="signInWithMicrosoft" class="microsoft-login-button" type="button">
          <svg class="microsoft-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23">
            <path fill="#f35325" d="M1 1h10v10H1z" />
            <path fill="#81bc06" d="M12 1h10v10H12z" />
            <path fill="#05a6f0" d="M1 12h10v10H1z" />
            <path fill="#ffba08" d="M12 12h10v10H12z" />
          </svg>

          <span>Bejelentkezés Microsoft fiókkal</span>
        </button>
        <button @click="signInWithGoogle" class="gsi-material-button">
          <div class="gsi-material-button-state"></div>

          <div class="gsi-material-button-content-wrapper">
            <div class="gsi-material-button-icon">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                style="display: block"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                />

                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                />

                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z"
                />

                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
            </div>

            <span class="gsi-material-button-contents"> Bejelentkezés Google fiókkal </span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.login-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 280px;
}

/* GOOGLE */

.gsi-material-button {
  width: 100%;
  height: 44px;

  padding: 0 12px;

  background-color: #f2f2f2;
  border: none;
  border-radius: 22px;

  color: #1f1f1f;

  cursor: pointer;
  overflow: hidden;
}

.gsi-material-button-content-wrapper {
  display: flex;
  align-items: center;

  position: relative;

  width: 100%;
  height: 100%;
}

.gsi-material-button-icon {
  position: absolute;
  left: 0;

  width: 20px;
  height: 20px;
}

.gsi-material-button-contents {
  width: 100%;

  font-family: 'Roboto', Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;

  text-align: center;
}

/* MICROSOFT */

.microsoft-login-button {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 44px;

  padding: 0 12px;

  background-color: #ffffff;
  border: 1px solid #8c8c8c;
  border-radius: 22px;

  color: #1f1f1f;

  font-family: 'Segoe UI', Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;

  cursor: pointer;
}

.microsoft-icon {
  position: absolute;
  left: 12px;

  width: 20px;
  height: 20px;
}

.microsoft-login-button:hover {
  background-color: #f5f5f5;
}

.microsoft-login-button:active {
  background-color: #e5e5e5;
}
</style>

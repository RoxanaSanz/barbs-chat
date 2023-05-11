<template>
  <div :class="{ 'dark-theme': darkMode }">
    <!-- Contenido de tu aplicación -->
    <!-- <button @click="toggleDarkMode"
      :class="{ 'px-4 py-2 bg-amber-200 bg-slate-800 rounded-l-xl': flagModeDark, 'px-4 py-2 bg-blue-950 text-blue-200 rounded-l-xl': !flagModeDark }">
      <div v-if="flagModeDark">
        Modo claro
      </div>
      <div v-else>
        Modo oscuro
      </div>
    </button>
    <button
      :class="{ 'px-4 py-2 bg-amber-50 bg-slate-800 rounded-r-xl': flagModeDark, 'px-4 py-2 bg-blue-100 text-blue-950 rounded-r-xl': !flagModeDark }"
      @click="toggleDarkMode">
      <div v-if="flagModeDark">
        <font-awesome-icon icon="sun" />
      </div>
      <div v-else>
        <font-awesome-icon icon="moon" />
      </div>
    </button> -->
    <div class="mb-6 flex justify-center w-72 sm:w-96 px-1 sm:px-12 py-1 sm:py-1 mx-auto">
      <div class="mt-2 py-2 px-2 flex -space-x-2 overflow-hidden">
        <button
          :class="{ 'text-center h-14 w-14 rounded-full ring-2 py-2 ring-sky-200 py-2 bg-sky-200 text-slate-900': flagModeDark, 'text-center h-14 w-14 rounded-full ring-2 ring-sky-950 py-2 bg-sky-950 text-sky-200': !flagModeDark }"
          @click="toggleDarkMode">
          <div v-if="flagModeDark">
            <font-awesome-icon class="fa-lg" icon="fa-solid fa-sun" beat-fade />
          </div>
          <div v-else>
            <font-awesome-icon class="fa-lg" icon="fa-solid fa-moon" beat-fade />
          </div>
        </button>
        <div v-if="!isLoginActive">
          <button
            :class="{ 'text-center h-14 w-14 rounded-full ring-2 ring-cyan-100 py-2 bg-cyan-100 text-cyan-900': flagModeDark, 'text-center h-14 w-14 rounded-full ring-2 ring-cyan-900 py-2 bg-cyan-900 text-cyan-50': !flagModeDark }"
            @click="showLogin">
            <font-awesome-icon class="fa-lg" icon="fa-solid fa-person-walking-arrow-loop-left" bounce />
          </button>
        </div>
      </div>
    </div>
    <!-- Modificar el tamaño de la letra -->
    <!-- <div class="mb-6 flex justify-center w-72 sm:w-96 px-1 sm:px-12 py-1 sm:py-1 mx-auto">
      <div class="mt-2 py-2 px-2 flex -space-x-2 overflow-hidden">
        <div class="grid grid-cols-2 -space-x-8">
          <div>
            <font-awesome-icon icon="fa-solid fa-text-height" beat />
          </div>
          <div>
            <input class="text-sky-400" type="range" min="10" max="30" v-model="fontSize">
          </div>
        </div>
      </div>
    </div> -->
    <LoginView v-if="isLoginActive" :flagModeDark="flagModeDark" />
    <ChatSoport v-if="!isLoginActive && !isAdmin" :nameClient="nameClient" :flagModeDark="flagModeDark"
      :getLoginClientId="getLoginClientId" />
    <AllChats v-if="isAdmin && !isLoginActive" :nameClient="nameClient" :flagModeDark="flagModeDark" />
  </div>
</template>

<script>
import AllChats from "./AllChats.vue";
import ChatSoport from "./ChatSoport.vue";
import LoginView from "./LoginView.vue";
import { reactive } from 'vue';
import { computed } from "vue";
import eventBus from "@/EventBus";

export default {
  name: "IndexView",
  components: {
    LoginView,
    ChatSoport,
    AllChats,
  },
  data() {
    return {
      fontSize: 20
    };
  },
  setup() {
    const getLoginClientId = computed(() => eventBus.flagLoginClientId);
    const isAdmin = computed(() => eventBus.flagIsAdmin);
    const isLoginActive = computed(() => eventBus.flagLoginActive);
    const nameClient = computed(() => eventBus.infoClient);
    const flagModeDark = computed(() => state.darkMode);
    const changeSize = computed(() => { return this.fSize; });

    const state = reactive({
      darkMode: false,
    });

    function toggleDarkMode() {
      state.darkMode = !state.darkMode;
      document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
    }

    function showLogin() {
      eventBus.flagLoginActive = true;
      eventBus.flagIsAdmin = false;
    }

    return {
      ...state,
      toggleDarkMode,
      showLogin,
      changeSize,
      getLoginClientId,
      isAdmin,
      isLoginActive,
      nameClient,
      flagModeDark
    };
  },
};
</script>

<style>
html,
#app {
  background-color: var(--background-color);
  color: var(--text-color);
}
</style>
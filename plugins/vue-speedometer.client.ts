import VueSpeedometer from "vue-speedometer";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("VueSpeedometer", VueSpeedometer);
});

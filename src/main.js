import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router/index.js";
import { clerkPlugin } from "@clerk/vue";
import { dark } from "@clerk/themes";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import ToastService from "primevue/toastservice";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const pinia = createPinia();

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

const rootStyles = getComputedStyle(document.documentElement);
const greenColor = rootStyles.getPropertyValue("--green").trim();
const darkGreenColor = rootStyles.getPropertyValue("--dark-green").trim();
const blackColor = rootStyles.getPropertyValue("--black").trim();
const whiteColor = rootStyles.getPropertyValue("--white").trim();

createApp(App)
  .use(pinia)
  .use(clerkPlugin, {
    publishableKey: PUBLISHABLE_KEY,
    appearance: {
      baseTheme: dark,
      variables: {
        colorPrimary: greenColor,
        colorNeutral: greenColor,
        colorBackground: blackColor,
        colorText: greenColor,
        colorTextSecondary: whiteColor,
        colorShimmer: greenColor,
        fontSize: "15px",
      },
    },
  })
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .use(ToastService)
  .use(router)
  .mount("#app");

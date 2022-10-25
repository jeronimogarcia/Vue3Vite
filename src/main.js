import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faHouse,
  faCartShopping,
  faUserPlus,
  faUserCheck,
  faRightFromBracket,
  faPowerOff,
  faCircleInfo,
  faHourglass,
  faSackDollar,
  faUsers,
  faStar,
  faCirclePlus,
  faCircleMinus,
  faPlus,
  faMinus
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faHouse,
  faCartShopping,
  faUserPlus,
  faUserCheck,
  faRightFromBracket,
  faPowerOff,
  faCircleInfo,
  faHourglass,
  faSackDollar,
  faUsers,
  faStar,
  faCirclePlus,
  faCircleMinus,
  faPlus,
  faMinus
);

import { createPinia } from "pinia";

createApp(App)
  .use(router)
  .use(createPinia())
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");

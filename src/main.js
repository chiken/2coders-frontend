import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyCk4UnD5KMgIsge4V-ddQ7YONnQ5vprY40",
  authDomain: "first-try-9aa63.firebaseapp.com",
  databaseURL: "https://first-try-9aa63.firebaseio.com",
  projectId: "first-try-9aa63",
  storageBucket: "first-try-9aa63.appspot.com",
  messagingSenderId: "112383115963",
  appId: "1:112383115963:web:7e757d03719abf62e05f9e"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");

// ~/plugins/vuex-persist.js
import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
    /* your options */
    key: 'beveilig-vue-x', // The key to store the state on in the storage provider.
    storage: window.localStorage // or window.sessionStorage or localForage
    }).plugin(store);
  });
}

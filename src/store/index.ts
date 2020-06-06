import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchValue: '',
  },
  mutations: {
    updateSearchValue(state, newValue) {
      state.searchValue = newValue;
    },
  },
  actions: {
  },
  modules: {
  },
});

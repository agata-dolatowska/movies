import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchValue: '',
    apiData: {
      api: 'https://api.themoviedb.org/3/',
      key: '?api_key=fd1fd143d38191829dba155225a2c1f1',
      language: '&language=en-US',
    },
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

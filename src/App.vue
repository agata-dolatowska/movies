<template>
  <b-container id="app">
      <SearchForm/>
      <router-view/>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import SearchForm from '@/components/SearchForm.vue';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

@Component({
  components: {
    SearchForm,
  },
})
export default class App extends Vue {

}
</script>

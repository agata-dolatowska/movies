<template>
  <div>
  <p>{{searchValue}}</p>
  <ul>
  </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';

@Component
export default class SearchList extends Vue {
  private api = 'https://api.themoviedb.org/3/';

    private key = '?api_key=fd1fd143d38191829dba155225a2c1f1';

    private language = '&language=en-US';

    private page = 1;

    get searchValue(): string {
      return this.$store.state.searchValue;
    }

    @Watch('searchValue')
    private async getMovies() {
      const moviesFetch = await fetch(`${this.api}search/movie${this.key + this.language}&page=${this.page}&query=${this.searchValue}`);
    }
}
</script>

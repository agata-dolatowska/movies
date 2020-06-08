<template>
  <div>
    <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
    <b-form-select v-model="selected" :options="options"></b-form-select>
      <ul class="movie-list">
        <li v-for="movie in currentItems" :currentItems="currentItems" :key="movie.id" class="movie-list-item">
          <img :src='movie.posterPath' class="movie-list-item-img"/>
          <div>
            <h1>{{movie.title}}</h1>
            <p v-if="movie.title !== movie.originalTitle">{{movie.originalTitle}}</p>
            <p>{{movie.popularity}}</p>
            <p>{{movie.voteCount}} votes</p>
          </div>
          </li>
      </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import MovieListItem from '@/models/movieListItem';

@Component
export default class SearchList extends Vue {
    private api = 'https://api.themoviedb.org/3/';

    private key = '?api_key=fd1fd143d38191829dba155225a2c1f1';

    private language = '&language=en-US';

    private page = 1;

    private allPages = 1;

    private items: MovieListItem[] = [];

    private currentItems: MovieListItem[] = [];

    private perPage = 3;

    private currentPage = 1;

    private selected = null;

    options = [
      { value: null, text: 'Sort' },
      { value: 'az', text: 'A-Z' },
      { value: 'za', text: 'Z-A' },
      { value: 'mostPopular', text: 'most popular' },
      { value: 'leastPopular', text: 'least popular' },
    ]

    get rows(): number {
      return this.items.length;
    }

    get searchValue(): string {
      return this.$store.state.searchValue;
    }

    @Watch('selected')
    private sortList() {
      if (this.selected === 'az') {
        this.items.sort((a, b) => a.title.localeCompare(b.title));
      }
      if (this.selected === 'za') {
        this.items.sort((a, b) => b.title.localeCompare(a.title));
      }

      if (this.selected === 'mostPopular') {
        this.items.sort((a, b) => b.popularity - a.popularity);
      }
      if (this.selected === 'leastPopular') {
        this.items.sort((a, b) => a.popularity - b.popularity);
      }

      this.updateCurrentList();
    }

    @Watch('currentPage')
    private updateCurrentList() {
      this.currentItems = [];
      for (let i = (this.currentPage * this.perPage) - this.perPage; i < (this.currentPage * this.perPage); i += 1) {
        this.currentItems.push(this.items[i]);
      }
    }

    @Watch('searchValue')
    private async getList() {
      this.items = [];
      await this.getMovies();
      for (this.page = 2; this.page <= this.allPages; this.page += 1) {
        this.getMovies();
      }
      await this.updateCurrentList();
    }

    private async getMovies() {
      const moviesFetch = await fetch(`${this.api}search/movie${this.key + this.language}&page=${this.page}&query=${this.searchValue}`);

      const movies = await moviesFetch.json();
      this.allPages = await movies.total_pages;

      await movies.results.forEach((movie: {poster_path: string; title: string; original_title: string; popularity: number; vote_count: number}) => {
        this.items.push(new MovieListItem(movie));
      });
    }
}
</script>

<style lang="scss" scoped>
.movie-list {
  list-style-type: none;
  padding: 0;
}

.movie-list-item {
  text-align: left;
  display: flex;
}

.movie-list-item-img {
  height: 200px;
}
</style>

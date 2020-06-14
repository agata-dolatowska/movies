<template>
  <div>
    <div v-if="movieExists==false">
      <b-row>
        <b-col>
          <p>{{ resultsInfo }}</p>
        </b-col>
      </b-row>
    </div>
    <div v-else>
      <b-row>
        <b-col>
          <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="3">
          <b-form-select v-model="selected" :options="options"></b-form-select>
        </b-col>
      </b-row>
        <ul class="row movie-list">
          <li v-for="movie in currentItems" :currentItems="currentItems" :key="movie.id" class="movie-list-item col-lg-6 mt-3">
            <b-card>
                <b-card-img img-top :src='movie.posterPath' class="movie-list-item-img mb-3"/>
                <b-card-title>
                  <router-link :to="{name: 'MovieDetails', params: {id: movie.id}}" :id="movie.id">{{movie.title}}</router-link>
                </b-card-title>
                <b-card-text>
                  <p v-if="movie.title !== movie.originalTitle">{{movie.originalTitle}}</p>
                  <p><b-icon-star></b-icon-star> {{movie.popularity}}</p>
                  <p>{{movie.voteCount}} votes</p>
                </b-card-text>
            </b-card>
          </li>
        </ul>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import MovieListItem from '@/models/movieListItem';

@Component
export default class SearchList extends Vue {
    private movieExists = false;

    private page = 1;

    private allPages = 1;

    private items: MovieListItem[] = [];

    private currentItems: MovieListItem[] = [];

    private perPage = 10;

    private currentPage = 1;

    private selected = null;

    private resultsInfo = '';

    options = [
      { value: null, text: 'Sort', disabled: true },
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

    get apiData(): {api: string; key: string; language: string} {
      return this.$store.state.apiData;
    }

    mounted() {
      if (this.$store.state.searchValue !== '') {
        this.getList();
      }
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
      for (let i = (this.currentPage * this.perPage) - this.perPage; i < (this.currentPage * this.perPage) && i < this.items.length; i += 1) {
        this.currentItems.push(this.items[i]);
      }
    }

    @Watch('searchValue')
    private async getList() {
      this.items = [];
      this.page = 1;
      await this.getMovies();
      if (this.items.length > 0) {
        for (this.page = 2; this.page <= this.allPages; this.page += 1) {
          this.getMovies();
        }
        await this.updateCurrentList();
        this.movieExists = true;
        this.resultsInfo = '';
      } else {
        this.movieExists = false;
        this.resultsInfo = `No results for ${this.$store.state.searchValue}`;
      }
    }

    private async getMovies() {
      const moviesFetch = await fetch(`${this.apiData.api}search/movie${this.apiData.key + this.apiData.language}&page=${this.page}&query=${this.searchValue}`);

      const movies = await moviesFetch.json();
      this.allPages = await movies.total_pages;

      await movies.results.forEach((movie: {id: number; poster_path: string; title: string; original_title: string; popularity: number; vote_count: number}) => {
        this.items.push(new MovieListItem(movie));
      });
    }
}
</script>

<style lang="scss" scoped>
.movie-list {
  list-style-type: none;
  padding: 0;
  text-align: center;
}

.movie-list-item-img {
  height: 200px;
  width: auto;
}
</style>

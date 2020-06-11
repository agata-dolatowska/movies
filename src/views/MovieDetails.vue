<template>
    <div>
        <h1>{{ movieDetails.title }}</h1>
        <p v-if="movieDetails.title !== movieDetails.originalTitle">{{movieDetails.originalTitle}}</p>
        <p><span v-for="country in movieDetails.productionCountries" :key="country.name">{{ country.name }} </span></p>
        <p><span v-for="genre in movieDetails.genres" :key="genre.name">{{genre.name}} </span></p>
        <p>{{ movieDetails.overview }}</p>
        <a v-bind:href="movieDetails.imdbLink">IMDB</a>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import MovieDetailsModel from '@/models/movieDetails';

@Component
export default class MovieDetails extends Vue {
  private movieId = '';

  private movieDetails = {} as MovieDetailsModel;

  get apiData(): {api: string; key: string; language: string} {
    return this.$store.state.apiData;
  }

  created() {
    this.movieId = this.$route.params.id;
    this.getMovieDetails();
  }

  private async getMovieDetails() {
    const movieDetailsFetch = await fetch(`${this.apiData.api}movie/${this.movieId + this.apiData.key + this.apiData.language}`);

    const details = await movieDetailsFetch.json();

    this.movieDetails = new MovieDetailsModel(details);
  }
}
</script>

export default class MovieListItem {
    id: number;

    posterPath: string;

    title: string;

    originalTitle: string;

    popularity: number;

    voteCount: number

    constructor(movie: {id: number; poster_path: string; title: string; original_title: string; popularity: number; vote_count: number}) {
      if (movie.poster_path == null) {
        this.posterPath = require('@/assets/logo.png');
      } else {
        this.posterPath = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      }
      this.id = movie.id;
      this.title = movie.title;
      this.originalTitle = movie.original_title;
      this.popularity = movie.popularity;
      this.voteCount = movie.vote_count;
    }
}

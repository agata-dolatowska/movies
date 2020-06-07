export default class MovieListItem {
    posterPath: string;

    title: string;

    originalTitle: string;

    popularity: number;

    voteCount: number

    constructor(movie: {poster_path: string; title: string; original_title: string; popularity: number; vote_count: number}) {
      this.posterPath = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      this.title = movie.title;
      this.originalTitle = movie.original_title;
      this.popularity = movie.popularity;
      this.voteCount = movie.vote_count;
    }
}

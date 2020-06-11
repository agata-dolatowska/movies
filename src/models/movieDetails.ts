export default class MovieDetails {
    title: string;

    originalTitle: string;

    overview: string;

    genres: {name: string}[];

    productionCountries: {name: string}[];

    imdbLink: string;

    constructor(movie: {title: string; original_title: string; overview: string; genres: {name: string}[]; production_countries: {name: string}[]; imdb_id: string}) {
      this.title = movie.title;
      this.originalTitle = movie.original_title;
      this.overview = movie.overview;
      this.genres = movie.genres;
      this.productionCountries = movie.production_countries;
      this.imdbLink = `https://www.imdb.com/title/${movie.imdb_id}`;
    }
}

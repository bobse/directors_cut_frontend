export const directorFilter = {
  filterList: {
    alreadyAvailable: {
      default: false,
      level: 'movie',
      label: 'Only show already available',
      method: movie => {
        return movie.is_available_now !== null;
      },
    },
    onWishlist: {
      default: false,
      level: 'movie',
      label: 'Only my wishlist',
      method: movie => {
        return movie.user_choice === 'wishlist';
      },
    },
    hideIgnore: {
      default: false,
      level: 'movie',
      label: 'Hide ignored movies',
      method: movie => {
        return movie.user_choice !== 'ignore';
      },
    },
    hideWatched: {
      default: false,
      level: 'movie',
      label: 'Hide watched movies',
      method: movie => {
        return movie.user_choice !== 'watched';
      },
    },
    withProjectsOnly: {
      default: false,
      level: 'director',
      label: 'Only directors with projects',
      method: director => {
        return (
          director.movies.length > 0 &&
          director.movies.some(movie => !movie.hide)
        );
      },
    },
  },

  generateFilterInitialStates: function () {
    const savedFilters = localStorage.getItem('filters');
    if (savedFilters) {
      return JSON.parse(savedFilters);
    } else {
      let filterStates = Object.entries(this.filterList).map(item => [
        item[0],
        item[1].default,
      ]);
      return Object.fromEntries(filterStates);
    }
  },

  _hideItem: function (item, filters, level) {
    let hide = false;
    for (let key of Object.keys(filters)) {
      if (filters[key] && this.filterList[key].level === level) {
        if (this.filterList[key].method(item) === false) {
          hide = true;
          break;
        }
      }
    }
    return hide;
  },

  filter: function (filters, myDirectors) {
    let filteredDirectors = myDirectors.map(director => {
      let filteredMovies = director.movies.map(movie => {
        movie.hide = this._hideItem(movie, filters, 'movie');
        return movie;
      });
      director.movies = filteredMovies;
      director.hide = this._hideItem(director, filters, 'director');
      return director;
    });
    return filteredDirectors;
  },
};

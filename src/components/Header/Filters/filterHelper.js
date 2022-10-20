export const filtersConstant = {
  alreadyAvailable: {
    default: false,
    label: 'Only show already available',
    method: filterAlreadyAvailableOnly,
  },
  onWishlist: {
    default: false,
    label: 'Only my wishlist',
    method: filterWishlist,
  },
  hideIgnore: {
    default: false,
    label: 'Hide ignored movies',
    method: filterHideIgnore,
  },
  hideWatched: {
    default: false,
    label: 'Hide watched movies',
    method: filterHideWatched,
  },
  withProjectsOnly: {
    default: false,
    label: 'Only directors with projects',
    method: filterProjectsOnly,
  },
};

export default function filterMyDirectors(filters, myDirectors) {
  let newList = JSON.parse(JSON.stringify(myDirectors));
  for (let key in filtersConstant) {
    if (filters[key]) {
      newList = filtersConstant[key].method(newList);
    }
  }
  return newList;
}

// Filter functions
function filterWishlist(myDirectors) {
  return myDirectors.map(item => {
    item.movies = item.movies.filter(movie => {
      return movie.user_choice === 'wishlist';
    });
    return item;
  });
}

function filterProjectsOnly(myDirectors) {
  return myDirectors.filter(item => {
    return item.movies.length > 0;
  });
}

function filterAlreadyAvailableOnly(myDirectors) {
  return myDirectors.map(item => {
    item.movies = item.movies.filter(movie => {
      return movie.is_available_now;
    });
    return item;
  });
}
function filterHideIgnore(myDirectors) {
  return myDirectors.map(item => {
    item.movies = item.movies.filter(movie => {
      return movie.user_choice !== 'ignore';
    });
    return item;
  });
}

function filterHideWatched(myDirectors) {
  return myDirectors.map(item => {
    item.movies = item.movies.filter(movie => {
      return movie.user_choice !== 'watched';
    });
    return item;
  });
}

// Filter Initial State Generator
export function generateFilterStates() {
  const savedFilters = JSON.parse(localStorage.getItem('filters'));
  if (savedFilters) {
    return savedFilters;
  } else {
    let filterStates = Object.entries(filtersConstant).map(item => [
      item[0],
      item[1].default,
    ]);
    return Object.fromEntries(filterStates);
  }
}

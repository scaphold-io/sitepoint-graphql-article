
function getActorId(actor) {
  return 'actor' + actor.name.split(' ').pop();
}

function buildActorElement(actor) {
  return `
<div class='actor' id='${getActorId(actor)}'>
  <img src='${actor.image}'/>
  <div>
    ${actor.name}
  </div>
</div>`;
}

function getMovieId(movie) {
  return 'movie' + movie.title.split(' ').pop();
}

function buildMovieElement(movie) {
  return `
<div class='movie' id='${getMovieId(movie)}'>
  <img src='${movie.image}'/>
  <div>
    <h2>${movie.title}</h2>
  </div>
  <div class='actors'>
  </div>
</div>
`;
  return movie.title;
}

const API_URL = 'http://localhost:3000/movies';
const MOVIES_AND_ACTORS_URL = 'http://localhost:3000/moviesAndActors';

$(document).ready( _ => {
  console.log('document ready');
  debugger
  // fetchDataV1();
  // fetchDataV2();
  fetchDataV3();
});

function fetchDataV1() {
  $.get(API_URL, movieLinks => {
    movieLinks.forEach(movieLink => {
      $.get(movieLink.href, movie => {
        $('#movies').append(buildMovieElement(movie))
        $.get(movie.actors, actorLinks => {
          actorLinks.forEach(actorLink => {
            $.get(actorLink.href, actor => {
              const selector = '#' + getMovieId(movie) + ' .actors';
              const actorElement = buildActorElement(actor);
              $(selector).append(actorElement);
            })
          })
        })
      })
    })
  })
}

function fetchDataV2() {
  $.get(MOVIES_AND_ACTORS_URL, movies => renderRoot(movies));
}

function renderRoot(movies) {
  movies.forEach(movie => {
    $('#movies').append(buildMovieElement(movie));
    movie.actors && movie.actors.forEach(actor => {
      const selector = '#' + getMovieId(movie) + ' .actors';
      const actorElement = buildActorElement(actor);
      $(selector).append(actorElement);
    })
  });
}

const query = `
{
  movies {
    title
    image
    actors {
      image
      name
    }
  }
}
`;

function fetchDataV3() {
  const url = `http://localhost:5000?query=${query}`;
  console.log(url);
  $.get(url, res => {
    console.log(res.data);
    renderRoot(res.data.movies);
  });
}
const moviesService = require("./movies.service");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// list of all movies and movies currently showing in theaters
async function list(req, res, next) {
  const { is_showing } = req.query;
  if (is_showing === "true") {
    // const showingData = await moviesService.listMoviesShowing();
    res.status(200).json({ data: await moviesService.listMoviesShowing() });
  } else {
    //   const data = await moviesService.list();
    res.status(200).json({ data: await moviesService.list() });
  }
}

// validate that a movie exists
async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

// read one movie
async function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

// returns all the theaters where the movie is playing
async function readTheaterMovieIsPlayingAt(req, res, next) {
  const { movie: data } = res.locals;
  const { movieId } = req.params;
  if (data) {
    res.json({
      data: await moviesService.readTheaterMovieIsPlayingAt(movieId),
    });
  }
}

// return all the reviews for the movie
async function readMovieReviews(req, res, next) {
  const { movie: data } = res.locals;
  const { movieId } = req.params;
  if (data) {
    res.json({
      data: await moviesService.readMovieReviews(movieId),
    });
  }
}

module.exports = {
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  list: asyncErrorBoundary(list),
  readTheaterMovieIsPlayingAt: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readTheaterMovieIsPlayingAt),
  ],
  readMovieReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readMovieReviews),
  ],
};

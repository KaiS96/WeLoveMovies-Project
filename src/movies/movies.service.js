const knex = require("../db/connection");

const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function list() {
  return knex("movies").select("*");
}

function listMoviesShowing() {
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .distinct()
    .select(
      "m.movie_id",
      "m.title",
      "m.runtime_in_minutes",
      "m.rating",
      "m.description",
      "m.image_url"
    )
    .where({ is_showing: true });
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function readTheaterMovieIsPlayingAt(movieId) {
  return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("m.movie_id", "mt.is_showing", "t.*")
    .where({ "mt.movie_id": movieId });
}

function readMovieReviews(movieId) {
  return knex("movies as m")
    .join("reviews as r", "r.movie_id", "m.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("m.movie_id", "c.*", "r.*")
    .where({ "r.movie_id": movieId })
    .then((reviews) => reviews.map(addCritic));
}

module.exports = {
  read,
  list,
  listMoviesShowing,
  readTheaterMovieIsPlayingAt,
  readMovieReviews,
};

const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// route /movies
router.route("/").get(controller.list).all(methodNotAllowed);

// route /movies/:movieId
router.route("/:movieId").get(controller.read).all(methodNotAllowed);

// route /movies/:movieId/theaters
router
  .route("/:movieId/theaters")
  .get(controller.readTheaterMovieIsPlayingAt)
  .all(methodNotAllowed);

// route /movies/:movieId/reviews
router
  .route("/:movieId/reviews")
  .get(controller.readMovieReviews)
  .all(methodNotAllowed);

module.exports = router;

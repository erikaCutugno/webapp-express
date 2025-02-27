const connection = require("../data/db");

//Index
const index = (req, res) => {
  const sql = `
    SELECT movies.*,  ROUND(AVG(reviews.vote)) as media_vote
    FROM movies
    LEFT JOIN reviews ON movies.id = reviews.movie_id
    GROUP BY movies.id `;

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Query Error",
        message: `Database query failed: ${sql}`,
      });
    }

    const movies = results.map((movie) => {
      movie.image = `${process.env.BE_URL}/movies_cover/${movie.image}`;
      return movie;
    });
    res.json(movies);
  });
};

const show = (req, res) => {
  const { id } = req.params;

  //   const moviesSql = `
  //     SELECT *
  //     FROM movies
  //     WHERE id = ?`;
  const moviesSql = `
    SELECT movies.*,  ROUND(AVG(reviews.vote)) as media_vote
    FROM movies
    LEFT JOIN reviews ON movies.id = reviews.movie_id
    WHERE movies.id= ?
    GROUP BY movies.id`;

  connection.query(moviesSql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Query Error",
        message: `Database query failed: ${moviesSql}`,
      });
    }
    const movie = results[0];

    if (!movie) {
      return res.status(404).json({
        error: "Not found",
        message: "Movie not found",
      });
    }

    movie.image = `${process.env.BE_URL}/movies_cover/${movie.image}`;

    const reviewSql = `
    SELECT *
    FROM reviews
    WHERE movie_id = ?`;

    connection.query(reviewSql, [id], (err, results) => {
      if (err) {
        return res.status(500).json({
          error: "Query Error",
          message: `Database query failed: ${reviewSql}`,
        });
      }
      movie.review = results;
      res.json(movie);
    });
  });
};

const storeReview = (req, res) => {
  const { id } = req.params;
  const { name, text, vote } = req.body;

  const sql =
    "INSERT INTO reviews (movie_id, name, text, vote) VALUES (?, ?, ?, ?)";

  connection.query(sql, [id, name, text, vote], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Query Error",
        message: `Database query failed: ${sql}`,
      });
    }
    res.status(201).json({ id: results.insertId });
  });
};
module.exports = { index, show, storeReview };

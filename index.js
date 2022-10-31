const express = require('express')
const app = express()
const connectToMongo = require('./db');
const Movie = require('./Movie');
const port = 3000
const bodyParser = require("body-parser")
const { body, validationResult } = require('express-validator');
app.use(bodyParser.json())
connectToMongo()


app.get('/movies', async (req, res) => {
  try {

    const movies =await Movie.find({})
    console.log(movies)
    res.json(movies)
  } catch (error) {
    console.error(error.massage)
    res.status(500).send("internal Servar error")
  }
})


app.post('/addmovies', [
  body('name').isLength({ min: 5 }),
  body('img').isLength({ min: 5 }),
  body('summary').isLength({ min: 5 })
], async (req, res) => {
  try {

    const { name, img, summary } = req.body
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const movie = new Movie({
      name, img, summary
    })
    const saveMovie = await movie.save()
    res.json(saveMovie)
  } catch (error) {
    console.error(error.massage)
    res.status(500).send("internal Servar error")
  }
})


app.put('/updatemovies/:id', [
  body('name').isLength({ min: 5 }),
  body('img').isLength({ min: 5 }),
  body('summary').isLength({ min: 5 })
], async (req, res) => {
  const { name, img, summary } = req.body;
  const newMovie = {}
  if (name) { newMovie.name = name };
  if (img) { newMovie.img = img };
  if (summary) { newMovie.summary = summary };

  const valmovie = await Movie.findById(req.params.id);
  if (!valmovie) { return res.status(404).send("not in database") }
  const movies = await Movie.findByIdAndUpdate(req.params.id, { $set: newMovie }, { new: true })
  res.json({ movies })


  app.delete('/deletemovies/:id', async (req, res) => {
    try {

        let movies = await Movie.findById(req.params.id);
        if (!movies) { return res.status(404).send("Not Found") }


        movies = await Movie.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Movie has been deleted", movies: movies });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

}
)


app.listen(port, () => {
  console.log(`port http://localhost:${port}`)
})



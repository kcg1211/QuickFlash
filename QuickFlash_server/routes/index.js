var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/api/flashcard", async (req, res) => {
  try{
    const flashcards = await req.db.from("card").select("cardID", "question", "answer");
    res.json({error: false, flashcards})
  }
  catch(err){
    console.log(err)
    res.json({error: true, error: err})
  }

})

module.exports = router;

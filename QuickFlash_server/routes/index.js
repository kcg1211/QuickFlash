var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// ====================== GET method ====================== 
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

// ====================== POST method ====================== 
router.post('/api/newcard', (req, res) => {
  if (!req.body.Question || !req.body.Answer) {
      res.status(400).json({
          message: `Error updating flashcard`
      });
      console.log(`Error on request body:`, JSON.stringify(req.body));

  } else {
      const card = {
          "Question": req.body.Question,
          "Answer": req.body.Answer
      };

      req.db('card').insert(card)
    .then(_ => {
        res.status(201).json({
            message: `Successful insert flashcard - Question: ${req.body.Question}, Answer: ${req.body.Answer}`
        });
        console.log(`successful flashcard insert:`, JSON.stringify(card));

    }).catch(error => {
        res.status(500).json({
            message: 'Database error - not updated'
        });
    });

  }
})

// ====================== DELETE method ====================== 
router.delete('/api/deletecard', (req, res) => {
  if (!req.body.CardID) {
      res.status(400).json({
          message: `Error deleting flashcard`
      });
      console.log(`Error on request body:`, JSON.stringify(req.body));

  } else {
      const card = {
          "CardID": req.body.CardID
      };

      req.db('card').where(card).delete()
    .then(_ => {
        res.status(201).json({
            message: `Successful delete flashcard card ID: ${req.body.CardID}`
        });
        console.log(`successful delete:`, JSON.stringify(card));

    }).catch(error => {
        res.status(500).json({
            message: 'Database error - not deleted'
        });
    });

  }
})

// ====================== PUT method ====================== 
router.put('/api/editcard', (req, res) => {
  if (!req.body.CardID || !req.body.Question || !req.body.Answer) {
      res.status(400).json({
          message: `Error editing flashcard`
      });
      console.log(`Error on request body:`, JSON.stringify(req.body));

  } else {
      const filter = {
          "CardID": req.body.CardID,
      }

      const cardContent = {
          "Question": req.body.Question,
          "Answer": req.body.Answer
      };

      req.db('card').where(filter).update(cardContent)
    .then(_ => {
        res.status(201).json({
            message: `Successful editted flashcard - CardID: ${req.body.CardID}, Question: ${req.body.Question}, Answer: ${req.body.Answer}`
        });
        console.log(`successful edit:`, JSON.stringify(cardContent));

    }).catch(error => {
        res.status(500).json({
            message: 'Database error - not updated'
        });
    });

  }
})



module.exports = router;

import { useState, useEffect } from 'react';

async function getFlashcards() {
  const url = `http://192.168.0.183:8000/api/flashcard`;
  
  let res = await fetch(url);
  let jData = await res.json();
  let data = await jData.flashcards;
  console.log(data)

  return data.map(data => ({
    cardID: data.cardID,
    question: data.question,
    answer: data.answer,
  }));
};

export function useFlashcards() {
    const [loading, setLoading] = useState(true); 
    const [flashcards, setFlashcards] = useState([]);
    const [error, setError] = useState(null);

    const fetchFlashcards = async () => {
        try {
            setLoading(true);
            setFlashcards(await getFlashcards()); 
            setError(null);
        } catch (err) {
            setError("ERROR: Could not retrieve data. Please try refreshing.")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFlashcards();
    }, [])
    
    return { loading, flashcards, error, fetchFlashcards };
    }
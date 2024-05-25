import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableHighlight, Text, ActivityIndicator } from "react-native";
import { useFlashcards } from '@components/FlashcardAPI';
import { GlobalFontSize } from '@styles/globalFontSize';


export default function Flashcards({ refresh, isShuffle }) {

    const globalFontSize = GlobalFontSize();

    const {loading, flashcards, error, fetchFlashcards} = useFlashcards();
    const [shuffledFlashcards, setShuffledFlashcards] = useState([]);

    /* fetchFlashcards() is a function of FlashcardAPI. It handles getting the cards from API and returning the value of flashcards and statuses.
    Everytime when the view is being refreshed, cards will be retrieved from the API again. */
    useEffect(() => {
        if (refresh) {
            fetchFlashcards();
        }
    }, [refresh]);
    
    /* Everytime when flashcards are being updated (flashcards are fetched from API) and there are at least 1 flashcard, 
    shuffledFlashcards will be set. The sequence wil not be shuffled.*/
    useEffect(() => {
        if (flashcards.length > 0) {
            // /* everytime when there is a change in flashcards array (initial loading/adding new entries) and there is at least one flashcard, 
            // the sequence of flashcards will be shuffled */

            // setShuffledFlashcards(shuffle([...flashcards]));
            setShuffledFlashcards(flashcards);
        }
    }, [flashcards]);

    
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function shufflecards() {
        setShuffledFlashcards(shuffle([...flashcards]));
    }

    useEffect(() => {
        if (isShuffle) {
            shufflecards();
        }
    }, [isShuffle])

    if (loading){
            <View>
                <ActivityIndicator />
                <Text style={globalFontSize.text}>Now loading...</Text>
            </View>
    }

    if (error){
            <View><Text style={globalFontSize.text}>{error}</Text></View>
    }

    return(
        <View>
            {shuffledFlashcards.map(flashcards => <FlashcardView question={flashcards.question} answer={flashcards.answer} 
            key={flashcards.cardID} />)}
        </View>
    )

function FlashcardView(props){

    const globalFontSize = GlobalFontSize();

    const [isVisible, setIsVisible] = useState(false);
    
    function toggleAnswer(){
        setIsVisible(!isVisible);
    }

    return(
        <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={[globalFontSize.text, styles.text]}>{props.question}</Text>
                </View>
                <TouchableHighlight style={styles.card} underlayColor={"#E2E2E2"} onPress={toggleAnswer}>
                    <View>
                        {isVisible === true ? null : <Text style={globalFontSize.text}>Show Answer</Text>}
                        {isVisible && <Text style={globalFontSize.text}>{props.answer}</Text>}
                    </View>
                </TouchableHighlight>
        </View>

    )}

}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 100,
    },
    card: {
        backgroundColor: '#fff',
        flex: 0.5,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
    },
  });
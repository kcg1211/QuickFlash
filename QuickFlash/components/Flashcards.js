import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { useFlashcards } from '@components/FlashcardAPI';
import { GlobalFontSize } from '@styles/globalFontSize';
import { GlobalDarkMode } from '@styles/globalDarkMode';
import { GestureHandlerRootView, RectButton, Swipeable } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function Flashcards({ refresh, isShuffle }) {

    const globalFontSize = GlobalFontSize();
    const globalDarkMode = GlobalDarkMode();


    const {loading, flashcards, error, fetchFlashcards} = useFlashcards();
    const [shuffledFlashcards, setShuffledFlashcards] = useState([]);

    const API_URL = `http://192.168.0.183:8000`;

    // ==================================== Fetching flahcards from API ====================================

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


    
    // ==================================== Shuffle function of flashcards ====================================
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function shufflecards() {
        setShuffledFlashcards(shuffle([...shuffledFlashcards]));
    }

    useEffect(() => {
        // flashcards will be shuffled everytime the shuffle button is pressed
        if (isShuffle || !isShuffle) {
            shufflecards();
        }
    }, [isShuffle])

    // ==================================== Delete function of flahcards ====================================

    // flashcard with the corresponding cardID will be deleted from view and database
    function deleteCard(cardID) {
        setShuffledFlashcards(shuffledFlashcards.filter(card => card.cardID !== cardID)); 
        fetch(`${API_URL}/api/deletecard`, {
            method: "DELETE",
            body: JSON.stringify({ 
                  "CardID": cardID
              }),
            headers: {
                "Content-type": "application/json"
                   }
          })
          .then((res) => res.json())
          .then((res) => { 
            console.log(res);
          })
    };

    // ==================================== Edit function of flahcards ====================================
    function editCard(cardID, newQuestion, newAnswer) {
        setShuffledFlashcards(shuffledFlashcards.map(card => 
            card.cardID === cardID ? { ...card, question: newQuestion, answer: newAnswer } : card
        )); 
        fetch(`${API_URL}/api/editcard`, {
            method: "PUT",
            body: JSON.stringify({ 
                  "CardID": cardID,
                  "Question": newQuestion,
                  "Answer": newAnswer,
              }),
            headers: {
                "Content-type": "application/json"
                   }
          })
          .then((res) => res.json())
          .then((res) => { 
            console.log(res);
          })
    };


    // ==================================== Showing the flashcards with loading and error handling ====================================
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
            {shuffledFlashcards.map(flashcards => 
            <FlashcardView 
                question={flashcards.question} 
                answer={flashcards.answer} 
                key={flashcards.cardID} 
                cardID={flashcards.cardID} 
                onDelete={deleteCard}
                onEdit={editCard}
            />)}
        </View>
    )

    // ==================================== Generating the view of flashcards ====================================
    function FlashcardView(props){

        const globalFontSize = GlobalFontSize();

        const [isVisible, setIsVisible] = useState(false);
       
        function toggleAnswer(){
            setIsVisible(!isVisible);
        }

        function renderLeftActions(){
            return (
              <RectButton style={styles.leftAction} onPress={() => {confirmEdit()}}>
                <MaterialCommunityIcons name="square-edit-outline" size={25} color="white"/>
              </RectButton>
            );
          };

        function renderRightActions(){
            return (
                <RectButton style={styles.rightAction} onPress={() => {confirmDelete()}}>
                    <MaterialCommunityIcons name="delete" size={25} color="white"/>
                </RectButton>
            );
            };

        // alert box to ask if the user want to delete the flashcard
        function confirmDelete(){
            Alert.alert(
                "Delete",
                "Are you sure you want to delete this item?",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "OK", onPress: () => props.onDelete(props.cardID) }
                ]
            );
        };

        // two alert boxes to prompt the user for a new question and a new answer for the flashcard
        function confirmEdit(){
            // for iOS only
            Alert.prompt(
                "Edit Question",
                "Please enter the new question:",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "OK",
                        onPress: (newQuestion) => {
                            if (newQuestion) {
                                Alert.prompt(
                                    "Edit Answer",
                                    "Please enter the new answer:",
                                    [
                                        { text: "Cancel", style: "cancel" },
                                        {
                                            text: "OK",
                                            onPress: (newAnswer) => {
                                                if (newAnswer) {
                                                    props.onEdit(props.cardID, newQuestion, newAnswer);
                                                }
                                            }
                                        }
                                    ],
                                    'plain-text',
                                    props.answer // existing answer as the default entry for new answer
                                );
                            }
                        }
                    }
                ],
                'plain-text',
                props.question // existing question as the default entry for new question
            );
        }


        
        return(
            <GestureHandlerRootView>
                    <Swipeable
                    renderLeftActions={renderLeftActions}
                    renderRightActions={renderRightActions}
                    >
                    <View style={[styles.card, globalDarkMode.view]}>
                            <View style={styles.cardContent}>
                                <Text style={[globalFontSize.text, styles.text, globalDarkMode.text]}>{props.question}</Text>
                            </View>
                            <TouchableOpacity style={styles.cardContent} underlayColor={"#E2E2E2"} onPress={toggleAnswer}>
                                <View>
                                    {isVisible === true ? null : <Text style={[globalFontSize.text, globalDarkMode.text, {marginRight: 25}]}>Show Answer</Text>}
                                    {isVisible && <Text style={[styles.answer, globalFontSize.text, globalDarkMode.text]}>{props.answer}</Text>}
                                </View>
                            </TouchableOpacity>
                    </View>
                </Swipeable>
            </GestureHandlerRootView>

        )}

}


const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        height: 100,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 30,
        // borderWidth: 1,
        borderColor: '#000',
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    answer: {
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
    },
    leftAction: {
        flex: 0.1,
        backgroundColor: '#497AFC',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
        borderRadius: 30,
    },
    rightAction: {
        flex: 0.1,
        backgroundColor: '#DD2C00',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
        borderRadius: 30,
    },
  });
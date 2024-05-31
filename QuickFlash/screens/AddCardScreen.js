import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, KeyboardAvoidingView, Alert } from "react-native";
import GlobalLayout from "@components/Layout";
import { GlobalFontSize } from '@styles/globalFontSize';

export default function AddCardScreen() {

    const globalFontSize = GlobalFontSize();

    const [description, setDescription] = useState("Input a question and an answer to create a new flashcard")
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [errors, setErrors] = useState({})
    const API_URL = `http://192.168.0.183:8000`;

    const validateForm = () => {
        let errors = {};
        if(!question){
            errors.question = "Please input a question"
        };
        if(!answer){
            errors.answer = "Please input an answer"
        };
        setErrors(errors);

        return Object.keys(errors).length === 0;
    }

    const handleSubmission = () => {
        if(validateForm()){
            addNewCard();
            setDescription("A new flashcard has been added! ");
            setTimeout(() => {
                setDescription("Input a question and an answer to create a new flashcard");
              }, 4000);
            setQuestion("");
            setAnswer("");
            setErrors({});
        }

    }

    /* Posting a new  flashcard to the database */
    function addNewCard() {
        fetch(`${API_URL}/api/newcard`, {
          method: "POST",
          body: JSON.stringify({ 
                "Question":question,
                "Answer":answer
            }),
          headers: {
              "Content-type": "application/json"
                 }
        })
        .then((res) => res.json())
        .then((res) => { 
          console.log(res);
        }).catch(error => {
            console.error("Error adding card", error);
            Alert.alert("Error", "Network error. Please try again")
        })
      }

    return(
        <GlobalLayout >
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}  keyboardVerticalOffset={100}>
                    <Text style={[globalFontSize.text, styles.text]}>{description}</Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder=" New question"
                        autoCapitalize='none'
                        value={question}
                        onChangeText={setQuestion}
                    />
                    {errors.question && <Text style={[globalFontSize.text, styles.errorText]}>{errors.question}</Text>}
                    
                    <TextInput 
                        style={styles.textInput} 
                        placeholder=" New answer"
                        autoCapitalize='none'
                        value={answer}
                        onChangeText={setAnswer}
                    />
                    {errors.answer && <Text style={[globalFontSize.text, styles.errorText]}>{errors.answer}</Text>}
                    
                    <TouchableHighlight 
                        style={styles.touchableOpacity} 
                        underlayColor={"#DEB426"}
                        onPress={handleSubmission}>
                            <Text style={[globalFontSize.text, styles.text]}>Add card</Text>
                    </TouchableHighlight>

            </KeyboardAvoidingView>
        </GlobalLayout>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
    },
    textInput: {
        borderWidth: 0,
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 10,
        padding: 20,
        backgroundColor: "white"
    },
    touchableOpacity: {
        flexDirection: "row",
        width: 130,
        height: 45,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 103,
        backgroundColor: "#FDDC2A",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    errorText: {
        color: "red",
    },
})
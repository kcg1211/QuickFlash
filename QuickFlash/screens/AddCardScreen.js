import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, KeyboardAvoidingView } from "react-native";
import GlobalLayout from "@components/Layout";

export default function AddCardScreen() {

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
            // console.log(`Your new flashcard has been updated. Question: ${question}, Answer: ${answer}`);
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
        })
      }

    return(
        <GlobalLayout >
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}  keyboardVerticalOffset={100}>
                <View style={styles.container}>
                    <Text style={styles.text}>{description}</Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder=" New question"
                        autoCapitalize='none'
                        value={question}
                        onChangeText={setQuestion}
                    />
                    {errors.question && <Text style={styles.errorText}>{errors.question}</Text>}
                    
                    <TextInput 
                        style={styles.textInput} 
                        placeholder=" New answer"
                        autoCapitalize='none'
                        value={answer}
                        onChangeText={setAnswer}
                    />
                    {errors.answer && <Text style={styles.errorText}>{errors.answer}</Text>}

                    <TouchableHighlight 
                        style={styles.touchableOpacity} 
                        underlayColor={"#DEB426"}
                        onPress={handleSubmission}>
                            <Text>Add card</Text>
                    </TouchableHighlight>
                </View>

            </KeyboardAvoidingView>
        </GlobalLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    text: {
        textAlign: "center",
    },
    textInput: {
        borderWidth: 0,
        borderRadius: 100,
        marginTop: 20,
        marginBottom: 10,
        padding: 20,
        backgroundColor: "white"
    },
    button: {
        borderRadius: 100,
        borderWidth: 0,
        backgroundColor: "red",
    },
    touchableOpacity: {
        flex: 0.12,
        flexDirection: "row",
        width: 105,
        marginTop: 20,
        marginBottom: 20,
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
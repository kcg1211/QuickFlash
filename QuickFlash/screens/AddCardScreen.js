import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, KeyboardAvoidingView } from "react-native";
import GlobalLayout from "@components/Layout";

export default function AddCardScreen() {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const[errors, setErrors] = useState({})

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
            console.log(`Your new flashcard has been updated. Question: ${question}, Answer: ${answer}`);
            setQuestion("");
            setAnswer("");
            setErrors({});
        }

    }

    return(
        <GlobalLayout >
            <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding" keyboardVerticalOffset={100}>
                <View style={styles.container}>
                    <Text style={styles.text}>Hi</Text>
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
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, KeyboardAvoidingView, Alert } from "react-native";
import { GlobalFontSize } from '@styles/globalFontSize';

export default function RegisterForm(props){

    const globalFontSize = GlobalFontSize();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [errors, setErrors] = useState({})
    const API_URL = `http://192.168.0.183:8000`;

    const validateForm = () => {
        let errors = {};
        if(!username){
            errors.username = "Please input a user name"
        };
        if(!email){
            errors.email = "Please input an email address"
        };
        if(!password){
            errors.password = "Please input a password"
        };
        setErrors(errors);

        return Object.keys(errors).length === 0;
    }

    const handleRegister = () => {
        if(validateForm()){
            userRegister();
            setUsername("");
            setEmail("");
            setPassword("");
            setErrors({});
        }

    }

    function userRegister() {
        // fetch(`${API_URL}/users/login`, {
        //   method: "POST",
        //   body: JSON.stringify({ 
        //         "emailOrUsername":username,
        //         "password":password
        //     }),
        //   headers: {
        //       "Content-type": "application/json"
        //     }
        // })
        // .then((res) => res.json())
        // .then((res) => { 
        //     if (res.error) {
        //         console.log(res)
        //         Alert.alert("Incorrect username or password");
        //     } else {
        //         console.log(res)
        //         setHasLoggedIn(true);
        //     }
        // })
      }

    return(
                <KeyboardAvoidingView style={styles.keyboardAvoidingView}  keyboardVerticalOffset={100}>
                    <Text style={[globalFontSize.text, styles.text]}>
                        Input your new account details. All fields are required.
                    </Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder=" Username"
                        autoCapitalize='none'
                        value={username}
                        onChangeText={setUsername}
                    />
                    {errors.username && <Text style={[globalFontSize.text, styles.errorText]}>{errors.username}</Text>}

                    <TextInput 
                        style={styles.textInput} 
                        placeholder=" Email"
                        autoCapitalize='none'
                        value={email}
                        onChangeText={setEmail}
                    />
                    {errors.email && <Text style={[globalFontSize.text, styles.errorText]}>{errors.email}</Text>}
                    
                    <TextInput 
                        style={styles.textInput} 
                        placeholder=" Password"
                        autoCapitalize='none'
                        value={password}
                        onChangeText={setPassword}
                    />
                    {errors.password && <Text style={[globalFontSize.text, styles.errorText]}>{errors.password}</Text>}
                    
                    <TouchableHighlight 
                        style={styles.touchableOpacity} 
                        underlayColor={"#DEB426"}
                        onPress={handleRegister}>
                            <Text style={[globalFontSize.text, styles.text]}>Register</Text>
                    </TouchableHighlight>

                    <TouchableHighlight 
                        style={styles.touchableOpacity} 
                        underlayColor={"#DEB426"}
                        onPress={() => props.onReturn()}>
                            <Text style={[globalFontSize.text, styles.text]}>Log out</Text>
                    </TouchableHighlight>
                    
                </KeyboardAvoidingView>
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
        marginLeft: 103,
        backgroundColor: "#FDDC2A",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
    keyboardAvoidingView: {
        flex: 1.3,
    },
    errorText: {
        color: "red",
    },
    view: {
        flex: 1
    }
})

    
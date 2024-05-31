import { useState } from 'react';
import { Text, TextInput, StyleSheet, TouchableHighlight, KeyboardAvoidingView, Alert } from "react-native";
import { GlobalFontSize } from '@styles/globalFontSize';

// ==================================== New user register view ====================================
export default function RegisterForm(props){

    const globalFontSize = GlobalFontSize();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [errors, setErrors] = useState({})
    const API_URL = `http://192.168.0.183:8000`;

    const validateForm = () => {

        const pattern = /^\S+@\S+$/i
        let errors = {};

        if(!username){
            errors.username = "Please input a user name"
        };
        if(!email || !pattern.test(email)){
            errors.email = "Please input a valid email address"
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

    // Posting the new user registration to database
    function userRegister() {
        fetch(`${API_URL}/users/register`, {
        method: "POST",
        body: JSON.stringify({ 
                "username":username,
                "email": email,
                "password":password
            }),
        headers: {
            "Content-type": "application/json"
            }
        })
        .then((res) => res.json())
        .then((res) => { 
            if (res.error) {
                console.log(res);
                Alert.alert("Error", "Duplicated username found. Please input again");
            } else {
                console.log(res);
                Alert.alert("Success", "Account registered successfully")
            }
        }).catch(error => {
            console.error("Error registering", error);
            Alert.alert("Error", "Network error. Please try again")
        })
    }

    return(
        <KeyboardAvoidingView style={styles.keyboardAvoidingView}  keyboardVerticalOffset={100}>
            <Text style={[globalFontSize.text, styles.text]}>
                Input your new account details. All fields are required.
            </Text>
            <TextInput 
                style={styles.textInput} 
                placeholder="Username"
                autoCapitalize='none'
                value={username}
                onChangeText={setUsername}
            />
            {errors.username && <Text style={[globalFontSize.text, styles.errorText]}>{errors.username}</Text>}

            <TextInput 
                style={styles.textInput} 
                placeholder="Email"
                autoCapitalize='none'
                value={email}
                onChangeText={setEmail}
            />
            {errors.email && <Text style={[globalFontSize.text, styles.errorText]}>{errors.email}</Text>}
            
            <TextInput 
                style={styles.textInput} 
                placeholder="Password"
                autoCapitalize='none'
                secureTextEntry
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
                style={[styles.touchableOpacity, {marginTop: 40}]}
                underlayColor={"#DEB426"}
                onPress={() => props.onReturn()}>
                    <Text style={[globalFontSize.text, styles.text]}>Go back</Text>
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

    
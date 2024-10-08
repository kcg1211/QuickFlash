import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, KeyboardAvoidingView, Alert, Image } from "react-native";
import GlobalLayout from "@components/Layout";
import { GlobalFontSize } from '@styles/globalFontSize';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RegisterForm from '@components/RegisterForm';
import AccountInfo from '@components/AccountInfo';

// ==================================== Main login view ====================================
export default function LoginScreen() {
    const globalFontSize = GlobalFontSize();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hasLoggedIn, setHasLoggedIn] = useState(false);
    const [register, setRegister] = useState(false);
    const [errors, setErrors] = useState({})

    const API_URL = process.env.API_URL;

    const validateForm = () => {
        let errors = {};
        if(!username){
            errors.username = "Please input a username or an email address"
        };
        if(!password){
            errors.password = "Please input a password"
        };
        setErrors(errors);

        return Object.keys(errors).length === 0;
    }

    const handleLogin = () => {
        if(validateForm()){
            userLogin();
            setPassword("");
            setErrors({});
        }

    }

    // Posting login credentials to database for server-side validation and generating token from middleware
    async function userLogin() {
        try {
            const response = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                body: JSON.stringify({ 
                    "emailOrUsername": username,
                    "password": password
                }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            const res = await response.json();
            if (res.error) {
                console.log(res);
                Alert.alert("Error", "Incorrect username or password");
            } else {
                console.log(res);
                const token = res.token; // Token is returned from the response
                await AsyncStorage.setItem('authToken', token); // Storing the token in AsyncStorage
                setHasLoggedIn(true);
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert("Error", "Network error. Please try again")
        }
    }

    // Logging out and removing token from AsyncStorage
    async function userLogout() {
        try {
            await AsyncStorage.removeItem('authToken');
            setHasLoggedIn(false);
            Alert.alert("Success", "Logged out successfully")
            console.log('User logged out');
        } catch (error) {
            console.error('Error removing auth token:', error);
        }
    }

    // Function to pass in to views to handle 'Go back'
    function returnAccountScreen(){
        setHasLoggedIn(false);
        setRegister(false);
    };

    if (!hasLoggedIn && !register){
        return(
            <GlobalLayout>
                <KeyboardAvoidingView style={styles.keyboardAvoidingView}  keyboardVerticalOffset={100}>
                        <Text style={[globalFontSize.text, styles.text]}>Input your login details</Text>
                        <TextInput 
                            style={styles.textInput} 
                            placeholder="Username or email address"
                            autoCapitalize='none'
                            value={username}
                            onChangeText={setUsername}
                        />
                        {errors.username && <Text style={[globalFontSize.text, styles.errorText]}>{errors.username}</Text>}
                        
                        <TextInput 
                            style={styles.textInput} 
                            placeholder="Password"
                            secureTextEntry
                            autoCapitalize='none'
                            value={password}
                            onChangeText={setPassword}
                        />
                        {errors.password && <Text style={[globalFontSize.text, styles.errorText]}>{errors.password}</Text>}
                        
                        <View style={styles.touchableHighlightView}>
                            <TouchableHighlight 
                                style={styles.touchableHighlight} 
                                underlayColor={"#DEB426"}
                                onPress={handleLogin}>
                                    <Text style={[globalFontSize.text, styles.text]}>Login</Text>
                            </TouchableHighlight>
                        </View>

                </KeyboardAvoidingView>

                <View style={styles.view}>
                    <Text style={[globalFontSize.text, styles.text]}>Don't have an account yet?</Text>
                    <View style={styles.touchableHighlightView}>
                        <TouchableHighlight 
                            style={styles.touchableHighlight} 
                            underlayColor={"#DEB426"}
                            onPress={() => setRegister(true)}>
                                <Text style={[globalFontSize.text, styles.text]}>Register</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </GlobalLayout>
        )
    }
    // ==================================== Generating account info view after logged in ====================================
    else if(hasLoggedIn){
        return(
            <GlobalLayout>
                <AccountInfo 
                    username={username}
                    onLogout={userLogout} 
                />
            </GlobalLayout>
        )
    }

    // ==================================== Generating new user register view  ====================================
    else if(register){
        return(
            <GlobalLayout>
                <RegisterForm 
                    onReturn={returnAccountScreen}
                />
            </GlobalLayout>
        )
    }
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
    touchableHighlightView:{
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchableHighlight: {
        flexDirection: "row",
        width: 130,
        height: 45,
        marginTop: 20,
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
    },
})
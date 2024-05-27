import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableHighlight, KeyboardAvoidingView, Alert } from "react-native";
import GlobalLayout from "@components/Layout";
import { GlobalFontSize } from '@styles/globalFontSize';

import RegisterForm from '@components/RegisterForm';

export default function LoginScreen() {
    const globalFontSize = GlobalFontSize();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hasLoggedIn, setHasLoggedIn] = useState(false);
    const [register, setRegister] = useState(false);
    
    const [errors, setErrors] = useState({})
    const API_URL = `http://192.168.0.183:8000`;

    const validateForm = () => {
        let errors = {};
        if(!username){
            errors.username = "Please input a user name or an email address"
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
            setUsername("");
            setPassword("");
            setErrors({});
        }

    }

    function userLogin() {
        fetch(`${API_URL}/users/login`, {
          method: "POST",
          body: JSON.stringify({ 
                "emailOrUsername":username,
                "password":password
            }),
          headers: {
              "Content-type": "application/json"
            }
        })
        .then((res) => res.json())
        .then((res) => { 
            if (res.error) {
                console.log(res)
                Alert.alert("Incorrect username or password");
            } else {
                console.log(res)
                setHasLoggedIn(true);
            }
        })
      }

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
                            placeholder=" Username or email address"
                            autoCapitalize='none'
                            value={username}
                            onChangeText={setUsername}
                        />
                        {errors.username && <Text style={[globalFontSize.text, styles.errorText]}>{errors.username}</Text>}
                        
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
                            onPress={handleLogin}>
                                <Text style={[globalFontSize.text, styles.text]}>Login</Text>
                        </TouchableHighlight>
                        
                </KeyboardAvoidingView>

                <View style={styles.view}>
                    <Text style={[globalFontSize.text, styles.text]}>Don't have an account yet?</Text>

                    <TouchableHighlight 
                        style={styles.touchableOpacity} 
                        underlayColor={"#DEB426"}
                        onPress={() => setRegister(true)}>
                            <Text style={[globalFontSize.text, styles.text]}>Register</Text>
                    </TouchableHighlight>

                </View>
            </GlobalLayout>
        )
    }
    // a new view will be generated when the user is logged in
    else if(hasLoggedIn){
        return(
            <GlobalLayout>
                <Text style={[globalFontSize.text, styles.text]}>You have already logged in</Text>
                <TouchableHighlight 
                    style={styles.touchableOpacity} 
                    underlayColor={"#DEB426"}
                    onPress={() => setHasLoggedIn(false)}>
                        <Text style={[globalFontSize.text, styles.text]}>Log out</Text>
                </TouchableHighlight>
                
            </GlobalLayout>
        )
    }

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
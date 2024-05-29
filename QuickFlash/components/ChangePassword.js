import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableHighlight, Alert, TextInput } from "react-native";
import { GlobalFontSize } from '@styles/globalFontSize';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ==================================== Changing password view ====================================
export default function ChangePassword(props){

    const globalFontSize = GlobalFontSize();

    const [token, setToken] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({})
    const username = props.username;

    const API_URL = `http://192.168.0.183:8000`;

    const validateForm = () => {
        let errors = {};
        if(!newPassword){
            errors.newPassword = "Please input a new password"
        };
        if(!confirmPassword){
            errors.confirmPassword = "Please confirm the new password"
        };
        setErrors(errors);

        return Object.keys(errors).length === 0;
    }

    const handleChangePassword = () => {
        if(validateForm()){
            userChangePassword();
        }
    }

    // Getting the token from AsyncStorage and pass to database for authorisation to change password
    const getToken = async () => {
        try {
            const savedToken = await AsyncStorage.getItem('authToken');
            if (savedToken) {
                setToken(savedToken);
            }
        } catch (error) {
            console.error('Error retrieving auth token:', error);
        }
    };

    useEffect(() => {
        getToken();
    }, []);

    async function userChangePassword(){
        if (!token) {
            Alert.alert('Error', 'Please log in to continue');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New password and confirmation do not match');
            return;
        }

        // Putting the new password to database
        try {
            const response = await fetch(`${API_URL}/users/changepassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorisation': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "username": username,
                    "newPassword": newPassword
                })
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert('Success', 'Password changed successfully');
                setNewPassword('');
                setConfirmPassword('');
                console.log(result.message)
            } else {
                Alert.alert('Error', result.message);
            }
        } catch (error) {
            console.error('Error changing password:', error);
            Alert.alert('Error', 'An error occurred. Please try again');
        }
    };

    return (
        <>
            <Text style={[globalFontSize.text, styles.text]}>Change your password</Text>
            <TextInput
                style={styles.textInput}
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            {errors.newPassword && <Text style={[globalFontSize.text, styles.errorText]}>{errors.newPassword}</Text>}

            <TextInput
                style={styles.textInput}
                placeholder="Confirm New Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            {errors.confirmPassword && <Text style={[globalFontSize.text, styles.errorText]}>{errors.confirmPassword}</Text>}

            <View style={styles.touchableHighlightView}>
                <TouchableHighlight 
                    style={styles.touchableHighlight} 
                    underlayColor={"#DEB426"}
                    onPress={() => {handleChangePassword()}}>
                    <Text style={[globalFontSize.text, styles.text]}>Confirm</Text>
                </TouchableHighlight>
            </View>

            <View style={[styles.touchableHighlightView, {marginTop: 20}]}>
                    <TouchableHighlight 
                    style={styles.touchableHighlight} 
                    underlayColor={"#DEB426"}
                    onPress={() => {props.onReturn()}}>
                        <Text style={[globalFontSize.text, styles.text]}>Go back</Text>
                    </TouchableHighlight>
            </View>
        </>
    );
};


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
    errorText: {
        color: "red",
    },
}
)
import { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableHighlight, Alert } from "react-native";
import { GlobalFontSize } from '@styles/globalFontSize';
import profilePicture from '@assets/defaultProfile2.jpg';


import ChangePassword from '@components/ChangePassword'

 // ==================================== Account info view after logged in ====================================
export default function AccountInfo(props){

    const globalFontSize = GlobalFontSize();
    const [changePassword, setChangePassword] = useState(false);

    // Function to pass in to views to handle 'Go back'
    function returnAccountInfo() {
        setChangePassword(false);
    }

    if (!changePassword){
        return(
            <>
                <View style={styles.accountContainer}>
                    <Image source={profilePicture} style={{width: 70, height: 70}}></Image>
                    <Text style={[globalFontSize.text, styles.accountText]}>Hello {props.username}!</Text>

                    <TouchableHighlight 
                        style={styles.accountTouchableHighlight} 
                        underlayColor={"#DEB426"}
                        onPress={() => {
                            setChangePassword(true)
                            }
                        }>
                            <Text style={[globalFontSize.text, styles.text]}>Change password</Text>
                    </TouchableHighlight>

                    <TouchableHighlight 
                        style={styles.accountTouchableHighlight} 
                        underlayColor={"#DEB426"}
                        onPress={() => {
                            Alert.alert("Coming soon")
                            }
                        }>
                            <Text style={[globalFontSize.text, styles.text]}>Export flashcards</Text>
                    </TouchableHighlight>

                </View>

                <View style={[styles.touchableHighlightView, {marginTop: 30}]}>
                    <TouchableHighlight 
                    style={styles.touchableHighlight} 
                    underlayColor={"#DEB426"}
                    onPress={() => {props.onLogout()}}>
                        <Text style={[globalFontSize.text, styles.text]}>Log out</Text>
                    </TouchableHighlight>
                </View>
            </>
            
        )
    }

    // ==================================== Generating changing password view ====================================
    if (changePassword){
        return(
            <ChangePassword 
                username={props.username} 
                onReturn={returnAccountInfo}
            />
        )
    }

}

const styles = StyleSheet.create({
    text: {
        textAlign: "center",
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
    accountContainer: {
        flex: 0.6,
        backgroundColor: "white",
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    accountText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 20,
        textAlign: "center",
    },
    accountTouchableHighlight: {
        flexDirection: "row",
        width: 240,
        height: 45,
        marginTop: 25,
        backgroundColor: "#FDDC2A",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
}
)
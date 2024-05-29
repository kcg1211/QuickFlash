import { View, StyleSheet, Image, Text, TouchableHighlight, Alert } from "react-native";
import { GlobalFontSize } from '@styles/globalFontSize';
import profilePicture from '@assets/defaultProfile2.jpg';
import * as Linking from 'expo-linking';

export default function AccountInfo(props){

    const globalFontSize = GlobalFontSize();

    return(
        <>
            <View style={styles.accountContainer}>
                <Image source={profilePicture} style={{width: 70, height: 70}}></Image>
                <Text style={[globalFontSize.text, styles.accountText]}>Hello {props.username}!</Text>

                <TouchableHighlight 
                    style={styles.accountTouchableHighlight} 
                    underlayColor={"#DEB426"}
                    onPress={() => {
                        Linking.openURL(`${API_URL}/users/viewcard`);
                    }}>
                        <Text style={[globalFontSize.text, styles.text]}>Download flashcards</Text>
                </TouchableHighlight>


                <TouchableHighlight 
                    style={styles.accountTouchableHighlight} 
                    underlayColor={"#DEB426"}
                    onPress={() => {
                        Alert.alert("Coming soon")
                        }
                    }>
                        <Text style={[globalFontSize.text, styles.text]}>Change password</Text>
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
    accountText2: {
        marginTop: 35,
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
    }
}
)
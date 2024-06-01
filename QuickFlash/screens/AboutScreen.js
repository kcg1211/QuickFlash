import { useState } from 'react';
import { TouchableHighlight, Text, StyleSheet, View, Modal } from "react-native";
import GlobalLayout from "@components/Layout";
import { GlobalFontSize } from '@styles/globalFontSize';

export default function AboutScreen(){

    const globalFontSize = GlobalFontSize();
    const [modalVisible, setModalVisible] = useState(false);

    return(
        <GlobalLayout>
            <Text style={globalFontSize.text}>
                QuickFlash is an app for you to create flashcards on the fly.{"\n"}{"\n"}
                Need to refresh your memory? Just add a flashcard and recite in a second.{"\n"}{"\n"}
                Shuffle the flashcards if you want a bit more of challenge for yourself.{"\n"}
            </Text>
            <View style={styles.view}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Hello World!</Text>
                            <TouchableHighlight
                                style={styles.modalTouchableHighlight}
                                underlayColor={"#DEB426"}
                                onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={globalFontSize.text}>Go back</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                <TouchableHighlight 
                    style={styles.touchableHighlight}
                    underlayColor={"#DEB426"}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={globalFontSize.text}>License</Text>
                </TouchableHighlight>
                <Text style={globalFontSize.text}>v.1.0.0</Text>
            </View>

        </GlobalLayout>

    )
}

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchableHighlight: {
        width: 130,
        height: 45,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: "#FDDC2A",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
      },
      modalTouchableHighlight: {
        width: 130,
        height: 45,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: "#FDDC2A",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 20,
        paddingLeft: 100,
        paddingRight: 100,
        alignItems: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
});
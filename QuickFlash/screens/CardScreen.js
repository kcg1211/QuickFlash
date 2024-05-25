import { useState, useEffect, useCallback } from "react";
import { ScrollView, RefreshControl, TouchableHighlight, Text, StyleSheet } from "react-native";
import GlobalLayout from "@components/Layout";
import Flashcards from "@components/Flashcards";
import { GlobalFontSize } from '@styles/globalFontSize';

export default function CardScreen() {

  const globalFontSize = GlobalFontSize();

  // refreshing: for triggering the refresh effect for RefreshControl
  // refresh: for passing into Flashcards component to fetch flashcards from API again
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);

  // value of refresh will be changed when the view is dragged down for refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefresh(true)
    setTimeout(() => {
      setRefreshing(false);
      setRefresh(false);
    }, 500);
  }, []);

  const shuffleFlashcards = () =>{
    setIsShuffle(!isShuffle);
  }
  
  return (
    <GlobalLayout>
      <TouchableHighlight style={styles.touchableOpacity} underlayColor={"#DEB426"} onPress={shuffleFlashcards}>
        <Text style={[styles.text, globalFontSize.text]}>Shuffle</Text>
        </TouchableHighlight>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>}>
        {/* value of refresh is being passed into Flashcard as props */}
        <Flashcards refresh={refresh} isShuffle={isShuffle}/>
      </ScrollView>
    </GlobalLayout>
  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    flex: 0.12,
    flexDirection: "row",
    width: 105,
    marginBottom: 20,
    backgroundColor: "#FDDC2A",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})


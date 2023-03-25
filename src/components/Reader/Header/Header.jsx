import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity
} from "react-native"
import { useFonts } from 'expo-font'
import window from '../../../../utils/window';


export default function Header({ navigation, title, titleColor }) {
  const [fontsLoaded] = useFonts({
    Outfit: require('../../../../assets/Outfit/static/Outfit-Black.ttf'),
    OutfitThin: require('../../../../assets/Outfit/static/Outfit-Thin.ttf'),
    OutfitSemiBold: require('../../../../assets/Outfit/static/Outfit-SemiBold.ttf'),
    OutfitLight: require('../../../../assets/Outfit/static/Outfit-Light.ttf'),
  })

  const [bookTitle, setBookTitle] = useState(null);


  // Initially Component on Mount
  useEffect(() => {
    setBookTitle(title)
  }, [])

  const renderBookName = (bookTitle) => {
    let length = bookTitle.length;
    return length >= 35 ? bookTitle.substring(0,length-10) + "..." : bookTitle
  }

  if(!fontsLoaded){
    return <Text>Fonts not loaded refresh</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.holder}>
        <View style={styles.bookTitleText}>
          <Text style={{...styles.bookTitle, color : titleColor}}>
            {
              renderBookName(bookTitle)
            }
          </Text>
        </View>

        <TouchableOpacity
        style={styles.crossIconHolder}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.cross}
            source={require('../../../images/Icons/cross.png')}
          />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  holder: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: window.width * 0.9,
  },
  bookTitle: {
    fontFamily: 'OutfitLight',
    opacity: 0.5,
    fontSize: 18
  },
  bookTitleText:{
    width : "80%"
  },
  cross: {
    width : 32,
    height : 32
  },
  crossIconHolder : {
    width: 32,
    height: 32,
  }
});
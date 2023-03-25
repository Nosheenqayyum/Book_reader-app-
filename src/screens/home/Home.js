import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from 'react-native'
import { useSelector } from 'react-redux';
import { useFocusEffect } from "@react-navigation/native"
import { getLoggedInUser, getAuthToken, getAllcartItems } from '../../commonRedux/selectors';
import { getLocales } from 'expo-localization'
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import GetLocation from 'react-native-get-location';
import axios from 'axios';
import window from '../../../utils/window';
import colors from '../../../utils/colors';
import SearchBar from '../../components/SearchBar';
import CustomDrawer from '../../components/Drawers';
import SideMenu from 'react-native-side-menu';
import BackNavigation from '../../components/BackNavigation';
import BooksMiddleware from '../../middlewares/Books';

import star from '../../assets/star.png';
import bookOpen from '../../assets/littlebook.png';
import LibraryIcon from '../../assets/libraryIcon.png'
import UserIcon from '../../assets/userIcon.png'

function ListFooter() {
  return <View>
    <Text>Bottom</Text>
  </View>
}


export default function Home({ navigation, route }) {
  const [fontsLoaded] = useFonts({
    Outfit: require('../../../assets/Outfit/static/Outfit-Black.ttf'),
    OutfitThin: require('../../../assets/Outfit/static/Outfit-Thin.ttf'),
    OutfitSemiBold: require('../../../assets/Outfit/static/Outfit-SemiBold.ttf')
  })
  const [search, setSearch] = useState('');
  const [isDrawer, setDrawer] = useState(false);
  const [isPakistan, setIsPakistan] = useState(true);
  const [currentCountry, setCurrentCountry] = useState('');
  const [bookList, setBookList] = useState([]);
  const [isLoad, setIsLoad] = useState(true);
  // const [bookCart, setBookCart] = useState([]);
  const [isImageLoad, setIsImageLoad] = useState(false);
  const filterBookList = route?.params?.bookList;

  const users = useSelector(getLoggedInUser);

 

  const onChangeSearch = (value) => {
    setSearch(value)
    console.log(value)
    setIsLoad(true)

    BooksMiddleware.searchBooks(value)
      .then(res => {
        setBookList(res.content)
        setIsLoad(false)
      })
      .catch(err => {
        setIsLoad(false)
      })

  }

  const toggleDrawer = () => {
    setDrawer(!isDrawer)
  }



  const LocationToAddress = (lat, long) => {
    const locationPublish = `${lat},${long}`;
    const key = 'AIzaSyDYcS2N3a-TNufxLrSh196U6rUifFlUF38'
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationPublish}&sensor=true&key=${key}`

    fetch(url)
      .then(response => response.json())
      .then((result) => {
        const { results } = result
        // console.log('kjhgjg', results)
        let foundCountry = results[0].address_components.find(el => {
          if (el.short_name === "PK") {
            return true
          } else {
            false
          }
        })
        // console.log('RES COuntRY:', foundCountry);
        if (foundCountry) {
          setIsPakistan(true)
          setCurrentCountry(foundCountry.short_name);
        } else if (!foundCountry) {
          setIsPakistan(true)
          setCurrentCountry(foundCountry.short_name);
        } else {
          setIsPakistan(false)
          setCurrentCountry(foundCountry.short_name);
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    (async () => {
      if (users?.token) {
        axios.defaults.headers.common['x-access-token'] = users.token;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});

      LocationToAddress(location.coords.latitude, location.coords.longitude);
    })();
  }, [])

  useEffect(() => {
    var token = '';
    if (users?.token) {
      axios.defaults.headers.common['x-access-token'] = users.token;
      token = users.token
    }
    setIsLoad(true)
    BooksMiddleware.getBooks(token).then((res) => {



      setBookList(res.content)
      setIsLoad(false)
    }).catch((err) => {
      console.log(err)
      setIsLoad(false)
    })
  }, [users?.token, currentCountry])

  // useEffect(() => {
  //   setBookList(filterBookList)
  // }, [filterBookList])


  const menu = (
    <CustomDrawer
      toggleDrawer={toggleDrawer}
    />
  );
  const onPress = async (item) => {
    navigation.navigate(`bookPreview`, { "book": item })
  }

  const goToCart = async () => {
    navigation.navigate(`cart`)
  }
  const checkRestrictedCountry = (item) => {
    console.log('CURRENT COUNTRY', currentCountry)
    var nameArray = [];
    if (!item) {
      return false
    }
    nameArray = item.split(',')
    if (nameArray.includes(currentCountry) || nameArray.includes(' ' + currentCountry)) {
      return true
    } else {
      return false
    }



  }
  const renderBooks = (list) => {
    return list.map((item, idx) => {
      console.log('RESTRICTED', item.Restricted_Country);
      return !checkRestrictedCountry(item.Restricted_Country) && <TouchableOpacity
        activeOpacity={0.8}
        style={styles.item}
        onPress={() => onPress(item)}
      >
        <Image source={{ uri: item.Image }} style={styles.cover} />
        <Text style={styles.title}>{item.Name}</Text>
        <Text style={styles.author}>{item.Author_Name}</Text>
        <View style={styles.itemRow}>
          <Text style={styles.priceTitle}>Price : </Text>
          {
            isPakistan ?
              <Text style={styles.priceTag}>{item.Price == 0 ? "Our Gift" : item.Price + " RS"}</Text>
              : <Text style={styles.priceTag}>{item.Price_USD == 0 ? "Our Gift" : item.Price_USD + " USD"}</Text>
          }
        </View>
        <View style={styles.itemRow}>
          <Image source={star} style={styles.star} />
          <Text style={styles.author}>4.2</Text>
        </View>
      </TouchableOpacity>
    })
  }



  return (
    <SideMenu menu={menu} isOpen={isDrawer} menuPosition='left' onChange={setDrawer}>
      <SafeAreaView style={styles.container}>
        <BackNavigation
          label1="Welcome"
          label="Explore Books"
          showCart={false}
          onPress={() => toggleDrawer()}
          goToCart={goToCart}
        />
        {/* <Text>{useSelector(getAllcartItems)}</Text> */}
        <SearchBar
          value={search}
          onChange={(e) => onChangeSearch(e)}
        />
        {isLoad &&
          <View style={styles.whiteOverlay}>
            <ActivityIndicator size='large' color={colors.primary} />
          </View>
        }

        {
          !isLoad && <ScrollView style={{ borderColor: 'red' }}
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {renderBooks(bookList)}

          </ScrollView>
        }

        <View style={styles.footerStyle}>
          <View style={[styles.BottomBar, styles.BottomBarShadow]}>
            <TouchableOpacity style={styles.BottomBarIcon}
              onPress={() => {
                if (users?.Full_Name)
                  navigation.navigate('library')
                else
                  navigation.navigate('login')
              }}
            >
              <Image
                resizeMode='contain'
                source={LibraryIcon}
                style={{ flex: 1, width: 32, height: 32 }}
              />
            </TouchableOpacity>
            <View style={styles.BottomBarIconRound}>
              <Image
                resizeMode='contain'
                source={bookOpen}
                style={{ flex: 1, width: 32, height: 32 }}
              />
            </View>
            <TouchableOpacity style={styles.BottomBarIcon}
              onPress={() => {
                if (users?.Full_Name)
                  navigation.navigate('profile', { user: users })
                else
                  navigation.navigate('login')
              }
              }
            >
              <Image
                resizeMode='contain'
                source={UserIcon}
                style={{ flex: 1, width: 32, height: 32 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SideMenu>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFDFE',
  },
  wrapper: {
    // flexWrap: 'wrap',
    paddingBottom: 100,
    flexDirection: 'column',
    marginLeft: window.width * 0.05,
  },
  item: {
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width * 0.45,
  },
  whiteOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 11
  },
  cover: {
    height: 250,
    resizeMode: 'contain',
    width: window.width * 0.40,
    borderRadius: 15,
    marginBottom: 5
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'OutfitSemiBold'
  },
  author: {
    fontSize: 12,
    fontFamily: 'OutfitThin',
    textAlign: 'center',
    marginTop: 5
  },
  itemRow: {
    paddingTop: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  star: {
    fontSize: 15,
    marginRight: 5,
    color: colors.yellow,
  },
  priceTag: {
    color: '#2a9f1d',
    // fontWeight: '700',
    fontFamily: 'OutfitSemiBold'

  },
  priceTitle: {
    fontSize: 14,
    // fontWeight: '700',
    textAlign: 'center',
    fontFamily: 'OutfitSemiBold'
  },
  footerStyle: {
    width: '100%',
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  BottomBar: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#ffffff',
    // padding: 20,
    boxShadow: '0px 4px 40px rgba(161, 161, 161, 0.14)',
    borderRadius: 24,
    alignItems: 'center'
  },
  BottomBarShadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  BottomBarIcon: {
    width: 48,
    height: 48,
    alignContent: 'center',
    alignItems: 'center'
  },
  BottomBarIconRound: {
    width: 62,
    height: 62,
    backgroundColor: '#517A95',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 24,
    marginTop: 6,
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
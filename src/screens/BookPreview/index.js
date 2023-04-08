import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    ToastAndroid,
    Platform,
    Alert
} from 'react-native'
import { useFonts } from 'expo-font';
import { useToast } from 'react-native-paper-toast'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from '../../commonRedux/selectors'
import { addToCart } from '../../commonRedux/cart/cartActions'
import * as Location from 'expo-location';
import colors from '../../../utils/colors'
import window from '../../../utils/window'
import openBook from '../../assets/bookOpen.png'
import cartIcon from '../../assets/cartIconNew.png'
import backarrow from '../../assets/arrowBack.png'
import axios from 'axios';

const Button = ({ label, color, isCart, onPress, textColor }) => {
    return <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{ ...styles.button, backgroundColor: color, color: textColor }}
    >
        <Text style={{ ...styles.label, color: textColor }}>{label}</Text>
    </TouchableOpacity>
}

export default ({ navigation, route }) => {
    const toast = useToast();
    const [fontsLoaded] = useFonts({
        Outfit: require('../../../assets/Outfit/static/Outfit-Black.ttf'),
        OutfitThin: require('../../../assets/Outfit/static/Outfit-Thin.ttf'),
        OutfitSemiBold: require('../../../assets/Outfit/static/Outfit-SemiBold.ttf')
    })
    const [tab, setTab] = useState(0)
    const book = route.params.book
    const users = useSelector(getLoggedInUser)
    const [isPakistan, setIsPakistan] = useState(true)

    const dispatch = useDispatch();

    const LocationToAddress = (lat, long) => {
        const locationPublish = `${lat},${long}`;
        const key = 'AIzaSyDYcS2N3a-TNufxLrSh196U6rUifFlUF38'
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationPublish}&sensor=true&key=${key}`

        fetch(url)
            .then(response => response.json())
            .then((result) => {
                const { results } = result
                let foundCountry = results[0].address_components.find(el => {
                    if (el.short_name === "PK") {
                        return true
                    } else {
                        false
                    }
                })
                console.log('RES:', foundCountry);
                if (foundCountry) {
                    setIsPakistan(true)
                } else {
                    setIsPakistan(false)
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
            console.log("Country Code: ",)
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            // console.log('My Location : ',location.coords.latitude);
            // console.log('My Location : ',location.coords.longitude);

            LocationToAddress(location.coords.latitude, location.coords.longitude);
        })();
    }, [])

    const onPreviewClick = () => {
        // console.log('Preview Clicked Saved');
        console.log('book : ', book)
        navigation.navigate(`reader`, {
            title: book.Name,
            url: book.Preview,
            type: book.isPurchased === book.Book_ID ? 'full' : 'preview',
            book: book,
            index: 0
        })
    }

    const onPress = (book) => {
        let item = book;

        if (!users?.Full_Name) {
            navigation.navigate(`login`)
        } else {
            dispatch(addToCart(item))
            toast.show({ message: 'Item added in cart', type: 'success', duration: 2000 })
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                <View style={{
                    flexDirection: 'row', display: 'flex', justifyContent: 'space-between', width: window.width * 0.9, marginTop: 16
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.8}
                        style={styles.backBox}>

                        <Image source={backarrow} style={styles.nav} />

                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("cart")}
                        activeOpacity={0.8}
                        style={styles.backBox}>

                        <Image source={cartIcon} style={styles.back} />

                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.BookCoverPreviewBox}>
                <Image source={{ uri: book.Image }} style={styles.cover} />
                <Text style={styles.title}>{book.Name}</Text>
                <Text style={styles.author}>by {" " + book.Author_Name}</Text>
                <View style={styles.itemRow}>
                    <Text style={styles.priceTitle}>Price: </Text>
                    {
                        isPakistan ?
                            <Text style={styles.priceTag}>{book.Price == 0 ? "Our Gift" : book.Price + " RS"}</Text>
                            : <Text style={styles.priceTag}>{book.Price_USD == 0 ? "Our Gift" : book.Price_USD + " USD"}</Text>
                    }
                </View>
                <View style={styles.buttonRow}>
                    <Button
                        label="Preview"
                        color='white'
                        textColor={colors.lightBlue}
                        onPress={() => onPreviewClick()}
                    />
                    {
                        book.isPurchased === book.Book_ID ? (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={{ ...styles.button, backgroundColor: colors.lightBlue, color: colors.white }}
                            >
                                <Text style={{ ...styles.label, color: colors.white }}>Already Bought</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => onPress(book)}
                                style={{ ...styles.button, backgroundColor: colors.lightBlue, color: colors.white }}
                            >
                                <Text style={{ ...styles.label, color: colors.white }}>Add to Cart</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
                <ScrollView style={styles.aboutBookMainDescriptionContainer}>
                    <View style={styles.aboutBox}>
                        <View>
                            <Text style={styles.headText}>About Book</Text>
                        </View>
                        <View>
                            <Text style={styles.aboutPara}>
                                {book.Description}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.aboutBox}>
                        <View>
                            <Image source={{ uri: book.Author_Image }} style={styles.authorImg} />
                            <Text style={styles.headTextAuthor}>About Author</Text>
                            <Text style={styles.headTextAuthorName}>{book.Author_Name}</Text>
                        </View>
                        <Text style={styles.authorPara}>
                            {book.Author_Description}
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFDFE',
    },
    cover: {
        height: 200,
        resizeMode: 'contain',
        width: window.width * 0.4,
        borderRadius: 12,
        marginBottom: 5
    },
    title: {
        fontSize: 18,
        marginBottom: 5,
        textAlign: 'center',
        fontFamily: 'OutfitSemiBold'
    },
    author: {
        fontSize: 15,
        color: colors.black,
        fontFamily: 'OutfitThin'
    },
    itemRow: {
        paddingTop: 5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    star: {
        fontSize: 20,
        marginRight: 5,
        color: colors.yellow,
    },
    BookCoverPreviewBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    tab: {
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        width: window.width * 0.3,
        borderBottomColor: colors.gray,
        // flexDirection :'row'
    },
    backBox: {
        width: 48,
        height: 48,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        elevation: 20,
        shadowColor: colors.gray,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nav: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    back: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
    tabActive: {
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        width: window.width * 0.3,
        borderBottomColor: colors.primary,
    },
    label: {
        fontSize: 16,
        color: colors.gray,
        fontFamily: 'OutfitSemiBold'
    },
    labelActive: {
        fontSize: 12,
        fontWeight: '900',
        color: colors.primary,
    },
    aboutBookMainDescriptionContainer: {
        height: 400
    },
    headText: {
        color: '#474747',
        fontFamily: 'OutfitSemiBold',
        fontSize: 20
    },
    headTextAuthor: {
        color: '#474747',
        opacity: 0.5,
        fontFamily: 'OutfitSemiBold',
        fontSize: 18,
        position: 'absolute',
        left: 90,
        top: 10
    },
    headTextAuthorName: {
        color: '#474747',
        fontFamily: 'OutfitSemiBold',
        fontSize: 18,
        position: 'absolute',
        left: 90,
        top: 40
    },
    bookIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    cartIcon: {
        marginRight: 10,
        width: 16,
        height: 14,
    },
    BackIcon: {
        width: 26,
        height: 24,
        marginTop: 30,
        resizeMode: 'contain'
    },
    button: {
        width: 159,
        height: 56,
        elevation: 5,
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 5,
        paddingHorizontal: 10,
        justifyContent: 'center',

    },
    buttonPreview: {
        width: 159,
        height: 56,
        elevation: 5,
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 5,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    buttonRow: {
        paddingVertical: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    bookText: {
        color: 'white',
    },
    aboutBox: {
        padding: 20,
        paddingBottom: 100,
        flexDirection: 'column',
        borderRadius: 25,
        width: window.width * 0.93,
        marginTop: 10,
        backgroundColor: colors.white
    },
    termsBox: {
        padding: 20,
        paddingBottom: 100,
    },
    aboutPara: {
        fontSize: 18,
        lineHeight: 20,
        marginTop: 15,
        fontFamily: 'OutfitThin',
    },
    termsText: {
        fontSize: 12,
    },
    authorPara: {
        fontSize: 18,
        lineHeight: 20,
        marginTop: 10,
        fontFamily: 'OutfitThin',
        // width: window.width * 0.94,
    },
    authorDate: {
        fontSize: 12,
        textAlign: 'center',
        width: window.width * 0.34,
    },
    authorImg: {
        height: 80,
        resizeMode: 'contain',
        width: window.width * 0.2,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 15
    },
    priceTitle: {
        marginTop: 10,
        fontSize: 18,
        fontFamily: 'OutfitSemiBold'
    },
    priceTag: {
        marginTop: 10,
        fontSize: 18,
        color: '#2a9f1d',
        fontFamily: 'OutfitSemiBold'
    },
});

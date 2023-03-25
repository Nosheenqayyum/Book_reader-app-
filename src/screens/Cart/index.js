import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import { useFonts } from 'expo-font';
import * as Location from 'expo-location';

import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../../commonRedux/cart/cartActions';
import { getAllcartItems } from '../../commonRedux/selectors';
import { getLoggedInUser } from '../../commonRedux/selectors';
import SideMenu from 'react-native-side-menu';
import CustomDrawer from '../../components/Drawers';
import BackNavigation from '../../components/BackNavigation';
import window from '../../../utils/window';
import colors from '../../../utils/colors';
import Rectangle from '../../assets/Rectangle.png';
import deleteIcon from '../../assets/delete.png';

export default ({ navigation }) => {
    const [isDrawer, setDrawer] = useState(false);
    const [isPakistan, setIsPakistan] = useState(true);
    const [totalCart, setTotalCart] = useState(0);
    const cart = useSelector(getAllcartItems);
    const users = useSelector(getLoggedInUser);

    const dispatch = useDispatch();
    const [fontsLoaded] = useFonts({
        Outfit: require('../../../assets/Outfit/static/Outfit-Black.ttf'),
        OutfitThin: require('../../../assets/Outfit/static/Outfit-Thin.ttf'),
        OutfitSemiBold: require('../../../assets/Outfit/static/Outfit-SemiBold.ttf'),
        OutfitRegular: require('../../../assets/Outfit/static/Outfit-Regular.ttf'),
    })

    const toggleDrawer = () => {
        navigation.goBack()
    }

    const menu = (
        <CustomDrawer
            toggleDrawer={toggleDrawer}
        />
    );

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

    const removeFromCart = (book) => {
        dispatch(removeItem(book))
    }

    const getTotal = () => {
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            total = total + parseInt(cart[i].Price)
        }

        return total
    }

    const proceedToCheckOut = () => {
        if (cart.length == 0) {
            ToastAndroid.showWithGravityAndOffset('Add items in cart to proceed', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 300)
        } else {
            if (users?.Full_Name) {
                navigation.navigate(`payment`, {
                    items: cart,
                })
            } else {
                ToastAndroid.showWithGravityAndOffset('Login to proceed', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 300)
            }
        }
    }

    return (
        <SideMenu menu={menu} isOpen={isDrawer} menuPosition='left' onChange={setDrawer}>
            <SafeAreaView style={styles.container}>
                <BackNavigation
                    label1="Cart"
                    label="Your Book Bag"
                    showCart={true}
                    onPress={() => toggleDrawer()}
                />
                <View style={styles.holder}>
                    <ScrollView style={styles.cartItemsHolder}>
                        {
                            cart?.map((item) => {
                                return <View style={styles.item}>
                                    <View>
                                        <Image source={{ uri: item.Image }} style={styles.cover} />
                                    </View>
                                    <View style={{ alignSelf: 'center' }}>
                                        <Text style={styles.bookName}>{item.Name.slice(0, 12)} ...</Text>
                                        <Text style={styles.authorName}>{item.Author_NAme}</Text>
                                        <Text style={styles.priceTag}>
                                            Price:
                                            <Text style={styles.priceValue}> {isPakistan == true ? item.Price : item.Price_USD}</Text> {isPakistan == true ? 'PKR' : 'USD'}</Text>
                                    </View>
                                    <View style={{ alignSelf: 'center' }}>
                                        <TouchableOpacity onPress={() => removeFromCart(item)}>
                                            <Image source={deleteIcon} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            })
                        }
                    </ScrollView>
                </View>
                <View style={styles.cartTotalHolder}>
                    <View style={styles.subHolder}>
                        <Text style={styles.totalText}>Total Amount</Text>
                        <Text style={{ ...styles.priceValue, fontSize: 24, marginTop: 5 }}>
                            {getTotal()}
                            <Text style={{ ...styles.priceTag, fontSize: 24, marginTop: 5 }}>
                                {isPakistan == true ? ' PKR' : ' USD'}
                            </Text>
                        </Text>
                        <TouchableOpacity style={styles.proceedBtn} onPress={() => proceedToCheckOut()}>
                            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
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
    cover: {
        height: 100,
        resizeMode: 'contain',
        width: window.width * 0.2,
        borderRadius: 12,
        marginBottom: 5
    },
    holder: {
        alignItems: 'center'
    },
    cartItemsHolder: {
        width: window.width * 0.93,
        height: 400
    },
    item: {
        padding: 20,
        borderRadius: 25,
        marginTop: 10,
        backgroundColor: colors.white,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    bookName: {
        fontFamily: 'OutfitSemiBold',
        fontSize: 18,
        color: '#474747',
    },
    authorName: {
        fontFamily: 'OutfitThin',
        fontSize: 12,
        color: '#474747',
        opacity: 1,
        marginTop: 5
    },
    priceTag: {
        fontFamily: 'OutfitSemiBold',
        fontSize: 14,
        color: '#474747',
        opacity: 1,
        marginTop: 5
    },
    priceValue: {
        fontFamily: 'OutfitSemiBold',
        fontSize: 14,
        color: '#474747',
        opacity: 1,
        marginTop: 5,
        color: '#0EAD69'
    },
    cartTotalHolder: {
        width: window.width,
        height: 180,
        alignItems: 'center',
        position: 'absolute',
        bottom: 25,
        backgroundColor: '#FCFDFE',
    },
    subHolder: {
        backgroundColor: colors.white,
        width: window.width * 0.93,
        height: 180,
        borderRadius: 15,
        padding: 25
    },
    totalText: {
        fontSize: 20,
        fontFamily: 'OutfitRegular',
        color: '#474747',
        opacity: 0.5
    },
    proceedBtn: {
        backgroundColor: colors.lightBlue,
        height: 56,
        borderRadius: 15,
        marginTop: 20,
        justifyContent: 'center'
    },
    checkoutText: {
        color: colors.white,
        textAlign: 'center',
        fontFamily: 'OutfitSemiBold',
        fontSize: 16
    }
})
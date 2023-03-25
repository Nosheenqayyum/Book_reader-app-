import {
    Text,
    View,
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux'
import { getAllcartItems } from '../../commonRedux/selectors';
import { useFonts } from 'expo-font';
import colors from '../../../utils/colors';
import window from '../../../utils/window';
import menu from '../../assets/homeIcon.png';
import cart from '../../assets/cartIconNew.png'
import back from '../../assets/arrowBack.png';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect } from 'react';
import { useState } from 'react';

export default ({ label1, label, onPress, isBack, hide, showCart, transparent, goToCart }) => {
    const [fontsLoaded] = useFonts({
        Outfit: require('../../../assets/Outfit/static/Outfit-Black.ttf'),
        OutfitThin: require('../../../assets/Outfit/static/Outfit-Thin.ttf'),
        OutfitSemiBold: require('../../../assets/Outfit/static/Outfit-SemiBold.ttf'),
        OutfitRegular: require('../../../assets/Outfit/static/Outfit-Regular.ttf'),

    })
    const [cartItems, setCartItems] = useState([])

    const bookCart = useSelector(getAllcartItems)
    useEffect(() => {
        console.log('Bookkkkk', bookCart)
        setCartItems(bookCart);
    }, [bookCart])
    if (!fontsLoaded) {
        return null
    }


    return (
        <View>
            <StatusBar
                backgroundColor={colors.primary}
            />
            <View
                style={{
                    ...styles.container,
                    backgroundColor: transparent ? colors.primary : '#FCFDFE',
                }}>
                <View style={{ ...styles.row, marginTop: 16 }}>
                    {transparent ? (
                        <MaterialCommunityIcons
                            onPress={onPress}
                            style={styles.backIcon}
                            name="keyboard-backspace"
                        />
                    ) : (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={onPress}
                                activeOpacity={0.8}
                                style={styles.backBox}>
                                {
                                    showCart == true ? (
                                        <Image source={back} style={styles.nav} />
                                    ) : (
                                        <Image source={menu} style={styles.nav} />
                                    )
                                }
                            </TouchableOpacity>
                            <View style={{ marginLeft: 16 }}>

                                <Text
                                    style={{
                                        ...styles.welcomeLabel,
                                        color: transparent ? colors.white : colors.gray,
                                    }}>
                                    {label1}
                                </Text>
                                <Text
                                    style={{
                                        ...styles.label,
                                        color: transparent ? colors.white : colors.black,
                                    }}>
                                    {label}
                                </Text>
                            </View>
                        </View>
                    )}
                    <TouchableOpacity
                        onPress={goToCart}
                        activeOpacity={0.8}
                        style={{ ...styles.backBox, backgroundColor: showCart == true ? colors.lightBlue : 'white' }}>
                        {
                            showCart == true ? (
                                <Text style={styles.itemsIncartnumber}>{bookCart.length}</Text>
                            ) : (
                                <Image source={cart} style={styles.back} />
                            )
                        }
                    </TouchableOpacity>
                </View>
                {/* {!hide && <FontAwesome name="bell" style={styles.bell} />} */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 70,
        marginBottom: 10,
        width: window.width,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
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
    label: {
        fontSize: 18,
        // fontWeight: '100',
        fontFamily: 'OutfitRegular',
    },
    welcomeLabel: {
        fontSize: 14,
        fontFamily: 'OutfitThin'
    },
    bell: {
        fontSize: 20,
        color: colors.primary,
    },
    backIcon: {
        fontSize: 30,
        paddingRight: 15,
        color: colors.white,
    },
    itemsIncartnumber: {
        color: colors.white,
        fontFamily: 'OutfitSemiBold',
        fontSize: 20
    }
});

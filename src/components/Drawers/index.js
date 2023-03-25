import React, { useEffect } from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    LogBox
} from 'react-native'
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'
import {
    useNavigation
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from '../../commonRedux/selectors'
import AuthMiddleware from '../../commonRedux/auth/middleware'
import { Title, Drawer } from 'react-native-paper'
import colors from '../../../utils/colors'
import faq from '../../assets/faq.png'
import book from '../../assets/homeWhite.png'
import library from '../../assets/libraryWhite.png'
import logout from '../../assets/logout.png'
import privacy from '../../assets/privacyWhite.png'
import exchange from '../../assets/transactionWhite.png'
import headphones from '../../assets/supportWhite.png'
import creditcard from '../../assets/creditCard.png'
import internetSearch from '../../assets/internetSearch.png'

const { width } = Dimensions.get('window')

export default function CustomDrawer(props) {
    const [fontsLoaded] = useFonts({
        Outfit: require('../../../assets/Outfit/static/Outfit-Black.ttf'),
        OutfitThin: require('../../../assets/Outfit/static/Outfit-Thin.ttf'),
        OutfitSemiBold: require('../../../assets/Outfit/static/Outfit-SemiBold.ttf'),
        OutfitExtraBold: require('../../../assets/Outfit/static/Outfit-ExtraBold.ttf'),
        OutfitLight: require('../../../assets/Outfit/static/Outfit-Light.ttf')
    })
    const { navigate } = useNavigation();
    const users = useSelector(getLoggedInUser);
    const dispatch = useDispatch();

    useEffect(() => {
        // To ognore the warning useNativeDriver
        LogBox.ignoreLogs(['Animated : `useNativeDriver`'])
    }, [])

    const Navigation = (type) => {
        if (type == 'library') {
            props.toggleDrawer()
            navigate('library')
            return
        }
        if (type == 'home') {
            props.toggleDrawer()
            navigate('home')
            return
        }
        // if (type == 'paymentmethod') {
        //     props.toggleDrawer()
        //     navigate('paymentmethod')
        //     return
        // }
        // if (type == 'transectionhistory') {
        //     props.toggleDrawer()
        //     navigate('transectionhistory')
        //     return
        // }
        // if (type == 'paypal') {
        //     props.toggleDrawer()
        //     navigate('paypal')
        //     return
        // }
        // if (type == 'checkout') {
        //     props.toggleDrawer()
        //     navigate('checkout')
        //     return
        // }
        if (type == 'login') {
            props.toggleDrawer()
            navigate('login')
            return
        }
        // if (type == 'about') {
        //     props.toggleDrawer()
        //     navigate('about')
        //     return
        // }
        if (type == 'privacypolicy') {
            props.toggleDrawer()
            navigate('privacypolicy')
            return
        }
        if (type == 'support') {
            props.toggleDrawer()
            navigate('support')
            return
        }
        // if (type == 'faq') {
        //     props.toggleDrawer()
        //     navigate('faq')
        //     return
        // }
    }

    return (
        <View style={styles.drawerContent}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={styles.avatar}>
                            {
                                users?.Full_Name ? (
                                    <Text style={styles.avatarText}>
                                        {
                                            users?.Full_Name.split(" ").map(item => item.toUpperCase().substring(0, 1)).join('')
                                        }
                                    </Text>
                                ) : (
                                    <Text style={styles.avatarText}>
                                        {
                                           "Guest User".split(" ").map(item => item.toUpperCase().substring(0, 1)).join('')
                                        }
                                    </Text>
                                )
                            }
                        </View>
                        <Title style={styles.titleWelcome}>Welcome to little Book!</Title>
                        <Title style={styles.title}>{users?.Full_Name || 'Guest User'}</Title>
                        <View style={{
                            backgroundColor: 'white',
                            height: 1,
                            marginTop: 16,
                            opacity: 0.2
                        }}>
                        </View>
                    </View>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        label="Explore"
                        labelStyle={styles.label}
                        onPress={() => Navigation('home')}
                        icon={() => <Image source={book} style={styles.icon} />}
                    />
                    {
                        users?.Full_Name &&
                        <DrawerItem
                            label="Library"
                            labelStyle={styles.label}
                            onPress={() => Navigation('library')}
                            icon={() => <Image source={library} style={styles.icon} />}
                        />
                    }
                    {
                        users?.Full_Name &&
                        <DrawerItem
                            label="Transaction History"
                            labelStyle={styles.label}
                            onPress={() => Navigation('transectionhistory')}
                            icon={() => <Image source={exchange} style={styles.icon} />}
                        />
                    }
                    <DrawerItem
                        label="Support"
                        labelStyle={styles.label}
                        onPress={() => Navigation('support')}
                        icon={() => <Image source={headphones} style={styles.icon} />}
                    />
                    <DrawerItem
                        label="Privacy & Policy"
                        labelStyle={styles.label}
                        onPress={() => Navigation('privacypolicy')}
                        icon={() => <Image source={privacy} style={styles.icon} />}
                    />
                    {
                        users?.Full_Name &&
                        <DrawerItem
                            label="Logout"
                            //onPress={() => logoutAction()}
                            onPress={() => {
                                dispatch(AuthMiddleware.logout());
                                Navigation('login');
                            }}
                            labelStyle={styles.label}
                            icon={() => <Image source={logout} style={styles.icon} />}
                        />
                    }
                    {
                        !users?.Full_Name &&
                        <DrawerItem
                            label="login/Register"
                            labelStyle={styles.label}
                            onPress={() => Navigation('login')}
                            icon={() => <Image source={logout} style={styles.icon} />}
                        />
                    }

                </Drawer.Section>

            </DrawerContentScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    drawerContentt: {
        flex: 1,
        backgroundColor: '#3b5f76',
        borderWidth: 0,
        borderColor: 'lightgray',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        // borderColor:'yourchoice', // if you need 
        borderWidth: 1,
        overflow: 'hidden',
        shadowColor: 'black',
        shadowRadius: 10,
        shadowOpacity: 1,
    },
    drawerContent: {
        flex: 1,
        backgroundColor: '#3b5f76',
    },
    or: {
        fontSize: 15,
        color: 'silver',
        fontWeight: 'bold',
        marginVertical: 10,
    },
    DrawerContainer: {
        backgroundColor: 'white',
    },
    input2: {
        height: 30,
        padding: 0,
        width: '95%',
        borderRadius: 3,
        marginVertical: 15,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: 'silver',
        backgroundColor: 'white',
    },
    userInfoSection: {
        paddingVertical: 20,
        marginLeft: 20,
        marginRight: 10,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    avatar: {
        width: 88,
        height: 88,
        elevation: 3,
        borderWidth: 4,
        borderRadius: 24,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FCFDFE',
    },
    avatarText: {
        fontSize: 32,
        color: '#517A95',
        fontFamily: 'OutfitExtraBold',
    },
    titleWelcome: {
        fontSize: 16,
        marginTop: 15,
        fontFamily: 'OutfitThin',
        color: '#B1BFC8',
        textTransform: "capitalize"
    },
    title: {
        fontFamily: 'OutfitSemiBold',
        fontSize: 18,
        color: '#FFFFFF',
    },
    but1: {
        borderRadius: 4,
        width: width * 0.4,
        paddingVertical: 5,
        backgroundColor: 'orange',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        width: width * 0.87,
        paddingVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    section: {
        marginRight: 15,
        alignItems: 'center',
        flexDirection: 'row',
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        // marginTop: 5,
        borderColor: '#3b5f76',
        borderWidth: 1
    },
    bottomDrawerSection: {
        // position: 'absolute',
        // bottom: 0
    },
    preference: {
        paddingVertical: 12,
        flexDirection: 'row',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
    },
    model: {
        height: 250,
        width: width * 0.95,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    cross: {
        fontSize: 25,
        color: 'red',
    },
    centerBox: {
        width: width * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modelHeader: {
        width: width * 0.87,
        paddingVertical: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        width: 26,
        height: 26,
    },
    logout: {
        marginLeft: -20,
        color: '#FCFDFE',
        fontSize: 18,
        fontFamily: 'OutfitThin'
    },
    label: {
        marginLeft: -20,
        color: '#FCFDFE',
        fontSize: 16,
        fontFamily: 'OutfitLight',
    },
});


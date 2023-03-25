import React, {
    useState,
    useEffect
} from 'react'
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Text,
    ImageBackground,
    Alert,
    FlatList,
    Platform
} from 'react-native';
import { useFonts } from "expo-font"
import { LinearGradient } from 'expo-linear-gradient'
import { useReader } from '@epubjs-react-native/core';
import Header from './Header';
import window from '../../../../utils/window';
import colors from '../../../../utils/colors';



export default function Footer({ BookTitle, tableofContent, DarkTheme, LightTheme, Fonts, UrFonts, increaseFont, decreaseFont, isDarkTheme, book }) {
    const [fontsLoaded] = useFonts({
        Mehr: require('../../../../assets/Mehr_font/MehrNastaliqWebRegular.ttf')
    })
    const [showTableOfContent, setShowTableOfContent] = useState(false);
    const [showThemeChange, setShowThemeChange] = useState(false);
    const [enableDarkTheme, setEnableDarkTheme] = useState(false);
    const [selectedFont, setSelectedFont] = useState('Serif');
    const [decreaseSize, setDecreaseSize] = useState(0);
    const [increaseSize, setIncreaseSize] = useState(0);

    const { changeTheme, changeFontFamily, changeFontSize, getCurrentLocation, getLocations, goToLocation, progress, locations, totalLocations } = useReader();

    const changeChapter = (location) => {
        goToLocation(location)

        showTableOfContent == false ? setShowTableOfContent(true) : setShowTableOfContent(false);
    }


    const showToc = () => {
        showThemeChange == false ? setShowThemeChange(true) : setShowThemeChange(false);
        showTableOfContent == false ? setShowTableOfContent(true) : setShowTableOfContent(false);
    }


    const renderTableofContent = (BookTitle, tableofContent) => {
        return <>
            <View style={styles.drawerIsOpen}>
                <LinearGradient
                    colors={['#fff', '#000']}
                    style={styles.innerDrawer}
                >

                </LinearGradient>
                {/* <View style={styles.innerDrawer}>

                </View> */}
            </View>
            <View style={{ ...styles.tocDrawer, backgroundColor: 'white' }}>
                {/* <View style={{
                    width: "90%",
                    alignSelf: 'center',
                    borderRadius: 15,
                    backgroundColor: 'white',
                    height: "100%"
                }}> */}
                <View style={styles.bookInfoHolder}>
                    <View style={styles.bookInfoHolder1}>
                        <View style={styles.imageHolder}>
                            <ImageBackground
                                source={{
                                    uri: book.Image,
                                }}
                                resizeMode="cover" style={styles.coverImage}>
                            </ImageBackground>
                        </View>
                        <View style={styles.bookInfoHolder2}>
                            <Text style={styles.tableofContent}>Table of Content</Text>
                            <Text style={styles.bookSubTitle}>{BookTitle}</Text>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} style={styles.box} onPress={() => setShowTableOfContent(false)}>
                        <Image
                            style={styles.cross}
                            source={require('../../../images/Icons/cross.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        data={tableofContent}
                        // style={{ marginLeft: 24, marginRight: 24, marginTop: 24, height: 200 }}
                        renderItem={
                            ({ item, index }) =>
                                <View key={index} style={{
                                    borderColor: '#b1b1b1',
                                    borderBottomWidth: 3,
                                    overflow: 'hidden',
                                    marginRight : 20,
                                    marginLeft : 20,
                                    padding : book.Language.toLowerCase() == 'urdu'? 0 : 10
                                }}>
                                    <TouchableOpacity onPress={() => changeChapter(item.href)} style={{ display : 'flex', flexDirection : book.Language.toLowerCase() == 'urdu' ? 'row-reverse' : 'row', }}>
                                        <Text style={{ color : '#474747', }}>{item.label}</Text>
                                    </TouchableOpacity>
                                </View>
                        }
                    />
                </View>
                {/* </View> */}
            </View>
        </>
    }

    const renderThemeChangeOptions = () => {
        return <>
            <View style={{ ...styles.drawerIsOpenTheme }}>
                <LinearGradient
                    colors={['#fff', '#000']}
                    style={styles.innerDrawer}

                >
                    <TouchableOpacity style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                    }} onPress={() => setShowThemeChange(false)}>

                    </TouchableOpacity>
                </LinearGradient>
            </View>
            <View style={{
                width: '100%',
                position: 'absolute',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                justifyContent: 'center',
                bottom: 80,
            }}>
                <View style={{
                    width: "90%",
                    alignSelf: 'center',
                    borderRadius: 15,
                    backgroundColor: 'white',
                    height: "100%"
                }}>
                    <View style={styles.themeInfoHolder}>

                        <TouchableOpacity style={styles.tocHolder} onPress={() => showToc()}>
                            <View style={{
                                backgroundColor: "#f0f4f6",
                                height: 56,
                                width: "83%",
                                alignSelf: 'center',
                                borderRadius: 6,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <View>
                                    <Image
                                        style={{ marginLeft: 15, width: 20, height: 20 }}
                                        source={require("../../../images/Icons/ReaderHamburger.png")}
                                    />
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 18,
                                        color: '#517A95',
                                        marginLeft: 15,
                                        fontFamily: 'OutfitLight'
                                    }}>Table of Content</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '500',
                                color: enableDarkTheme == true ? '#474747' : '#474747',
                                marginLeft: 24,
                                marginTop: 24,
                                marginBottom: 8,
                                paddingLeft: 12,
                                fontFamily: 'OutfitLight',
                            }}>Themes & Settings</Text>
                        </View>
                    </View>
                    <View style={styles.iconNavbar}>
                        <View style={styles.IconsHolderForSize}>
                            <TouchableOpacity style={styles.decreaseFontSizeHolder} onPress={() => decreaseFontSize()}>
                                <Text style={styles.decreaseFontSize}>a</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.increaseFontSizeHolder} onPress={() => increaseFontSize('inc')}>
                                <Text style={styles.increaseFontSize}>A</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.IconsHolder}>
                            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => setEnableDarkTheme(!enableDarkTheme)}>
                                <Image
                                    source={enableDarkTheme == false ? require('../../../images/Icons/dark.png') : require('../../../images/Icons/sun.png')}
                                    style={styles.navIcon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.fontFamilyHolder}>
                        {
                            book?.Language.toLowerCase() == "urdu" ? (
                                UrFonts.map((el, idx) => {
                                    return <TouchableOpacity key={idx} onPress={() => FontChange(el)}>
                                        <View style={{
                                            backgroundColor: selectedFont == idx ? "#DAE3E9" : "#f0f4f6",
                                            width: 85,
                                            height: 48,
                                            // borderColor: selectedFont == item ? '#DAE3E9' : '#DAE3E9',
                                            // borderWidth: selectedFont == item ? 4 : 2,
                                            paddingLeft: 5,
                                            paddingRight: 5,
                                            borderRadius: 6,
                                            marginTop: 4,
                                            justifyContent: 'center',
                                        }}>
                                            <Text style={{
                                                textAlign: 'center',
                                                fontSize: 12,
                                            }}>{el}</Text>
                                        </View>
                                    </TouchableOpacity>
                                })
                            ) : (
                                Fonts.map((item, index) => {
                                    return <TouchableOpacity key={index} onPress={() => FontChange(item)}>
                                        <View style={{
                                            backgroundColor: selectedFont == item ? "#DAE3E9" : "#f0f4f6",
                                            width: 85,
                                            height: 48,
                                            // borderColor: selectedFont == item ? '#DAE3E9' : '#DAE3E9',
                                            // borderWidth: selectedFont == item ? 4 : 2,
                                            paddingLeft: 5,
                                            paddingRight: 5,
                                            borderRadius: 6,
                                            marginTop: 4,
                                            justifyContent: 'center',
                                        }}>
                                            <Text style={{
                                                textAlign: 'center',
                                                fontSize: 12,
                                            }}>{item}</Text>
                                        </View>
                                    </TouchableOpacity>
                                })
                            )
                        }
                    </View>
                </View>
            </View>
        </>
    }


    // To Change The Theme That is set In A UseState Variable
    useEffect(() => {
        enableDarkTheme == true ? changeTheme(DarkTheme) : changeTheme(LightTheme);

        isDarkTheme(enableDarkTheme);

    }, [enableDarkTheme])


    // To Change The Font That Is Set In A UseState Variable
    useEffect(() => {
        if (selectedFont == "مہر نستعلیق" || selectedFont == "نستعلیق") {
            changeFontFamily("Cursive");
        } else {
            changeFontFamily(selectedFont);
        }
        console.log(selectedFont)
    }, [selectedFont])


    const isOpen = () => {
        showThemeChange == false ? setShowThemeChange(true) : setShowThemeChange(false);

    }



    const FontChange = (font) => {
        setSelectedFont(font)
    }

    const decreaseFontSize = () => {
        let alldecreaseFontSizes = decreaseFont;


        setDecreaseSize(decreaseSize + 1)

        if (decreaseSize <= alldecreaseFontSizes.length - 1) {
            changeFontSize(alldecreaseFontSizes[decreaseSize]);
        } else {
            setDecreaseSize(0)
            console.log('Finished');
        }

    }
    const increaseFontSize = () => {
        let allincreaseFontSizes = increaseFont;


        setIncreaseSize(increaseSize + 1)

        if (increaseSize <= allincreaseFontSizes.length - 1) {
            changeFontSize(allincreaseFontSizes[increaseSize]);
        } else {
            setIncreaseSize(0)
            console.log('Finished');
        }

    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={isOpen}
                    activeOpacity={0.8}
                    style={{ ...styles.backbox, backgroundColor: enableDarkTheme == true ? "#495157" : "white" }}
                >
                    <Image
                        style={styles.toggle}
                        source={require('../../../images/Icons/toggle.png')}
                    />
                </TouchableOpacity>
            </View>
            {
                showTableOfContent && renderTableofContent(BookTitle, tableofContent)
            }
            {
                showThemeChange && renderThemeChangeOptions()
            }
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "flex-end",
        paddingTop: 1,
        width: window.width * 0.8,
        alignSelf: 'center',
        marginBottom: 10
    },
    toggle: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },
    drawerIsOpen: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    innerDrawer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 0.5
    },
    tocDrawer: {
        width: '100%',
        height: window.height * 0.75,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        position: 'absolute',
        bottom: 0
    },
    outerDrawer: {
        width: '100%',
        height: '60%',
        position: 'absolute',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        justifyContent: 'center',
        bottom: 80
    },
    tocHolder: {
        // width: "100%",
        height: 56,
        // opacity: 0.4,
        borderRradius: 10,
        justifyContent: 'center'
    },
    bookInfoHolder: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // borderColor : 'red',
        // borderWidth : 2,
        paddingTop: 32,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24
    },
    bookInfoHolder1: {
        flexDirection: 'row'
    },
    imageHolder: {
        width: 50,
        height: 70,
    },
    bookInfoHolder2: {
        paddingLeft: 24
    },
    coverImage: {
        width: '100%',
        height: "100%"
    },
    bookSubTitle: {
        color: '#b1b1b1',
        fontSize: 16,
        paddingTop: 8,
        width: 100
    },
    tableofContent: {
        paddingTop: 8,
        fontSize: 16
    },
    cross: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    box: {
        width: 32,
        height: 32,
    },
    backbox: {
        width: 48,
        height: 48,
        borderRadius: 5,
        elevation: 20,
        shadowColor: colors.gray,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    setting: {
        // width: 32,
        height: 32,
        resizeMode: 'contain'
    },
    drawerIsOpenTheme: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    innerDrawerTheme: {
        width: '100%',
        backgroundColor: 'black',
        height: '100%',
        position: 'absolute',
        opacity: 0.5
    },
    outerDrawerTheme: {
        width: '100%',
        backgroundColor: 'white',
        height: '40%',
        position: 'absolute',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    outerDrawerThemeDark: {
        width: '100%',
        backgroundColor: '#333',
        height: '40%',
        position: 'absolute',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    themeInfoHolder: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: 32,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24
    },
    HeaderDrawerThemeTxt1: {
        fontSize: 24,
        fontWeight: '500'
    },
    HeaderDrawerThemeTxt2: {
        color: '#b1b1b1',
        fontSize: 16,
        fontWeight: '400'
    },
    HeaderDrawerThemeTxt2Inner: {
        color: 'black'
    },
    iconNavbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,
        marginLeft: 24,
        marginRight: 24
    },
    navIcon: {
        width: 22,
        height: 22,
        alignSelf: 'center'
    },
    IconsHolder: {
        backgroundColor: '#f0f4f6',
        width: 48,
        justifyContent: 'center',
        height: 48,
        borderRadius: 6,
        marginLeft: 5
    },
    IconsHolderForSize: {
        backgroundColor: '#f0f4f6',
        borderRadius: 6,
        flex: 1,
        margin: 2,
        flexDirection: 'row',
    },
    fontFamilyHolder: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        paddingTop: 2,
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 24,
    },
    fontSizeHolder: {
        flexDirection: 'row',
    },
    decreaseFontSize: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        fontFamily: "OutfitLight"
    },
    increaseFontSize: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        fontFamily: "OutfitLight"
    },
    decreaseFontSizeHolder: {
        width: '50%',
        height: 48,
        justifyContent: 'center',
        borderBottomLeftRadius: 6,
        borderTopLeftRadius: 6,
        borderRightWidth: 3,
        borderColor: 'white',
    },
    increaseFontSizeHolder: {
        width: '50%',
        height: 48,
        justifyContent: 'center',
        borderBottomRightRadius: 6,
        borderTopRightRadius: 6,
        borderLeftWidth: 3,
        borderColor: 'white',
    }
})

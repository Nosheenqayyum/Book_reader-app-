import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    useWindowDimensions,
    SafeAreaView,
    ActivityIndicator,
    View,
    Alert,
    Image,
    TouchableOpacity
} from 'react-native';
import { Reader, ReaderProvider, useReader } from '@epubjs-react-native/core'
import { useFileSystem } from '@epubjs-react-native/expo-file-system'
import { useFonts } from 'expo-font'
import Header from './Header/Header'
import Footer from './Header/Footer'
import { DarkTheme } from '../Themes/DarkTheme';
import { LightTheme } from '../Themes/LightTheme';
import { SepiaTheme } from '../Themes/SepiaTheme';
import { Fonts } from './Fonts/Fonts'
import { UrFonts } from "./Fonts/UrduFonts"
import { increaseFont, decreaseFont } from './Fonts/FontSize'
import colors from '../../../utils/colors';
import window from '../../../utils/window';

const LoadingComponent = () => {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color={colors.primary} />
        </View>
    );
}


function Inner({ navigation, title, url, type, book }) {
    const [fontsLoaded] = useFonts({
        Outfit: require('../../../assets/Outfit/static/Outfit-Black.ttf'),
        OutfitThin: require('../../../assets/Outfit/static/Outfit-Thin.ttf'),
        OutfitSemiBold: require('../../../assets/Outfit/static/Outfit-SemiBold.ttf'),
        OutfitLight: require('../../../assets/Outfit/static/Outfit-Regular.ttf'),
    })
    const [toc, setToc] = useState(null);
    const { width, height } = useWindowDimensions();
    const [isDark, setIsDark] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const { changeTheme, changeFontFamily, changeFontSize, getCurrentLocation, getLocations, goNext, goPrevious } = useReader();

    console.log('TYPE', type, url)
    const isDarkTheme = (bool) => {
        setIsDark(bool)
    }

    const generatingTOC = (obj) => {
        console.log('Table of Content', obj);
        setToc(obj.toc);
    }



    return <SafeAreaView style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: isDark == true ? '#333' : '#FCFDFE',
    }}>
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-around',
        }}>
            <Header
                title={title}
                titleColor={isDark == true ? 'white' : '#474747'}
                navigation={navigation}
            />
            <View>
                <Reader
                    src={`https://tlbc-assets.s3.amazonaws.com/OPF/${book.Book_ID}/${type == 'full' ? 'url' : 'preview'}/OEBPS/content.opf`}
                    // src="https://s3.amazonaws.com/moby-dick/OPS/package.opf"
                    width={width}
                    height={height * 0.75}
                    renderOpeningBookComponent={LoadingComponent}
                    fileSystem={useFileSystem}
                    onDoublePress={() => Alert.alert('Happy reading of the book')}
                    onDisplayError={() => {
                        Alert.alert('Error loading the book')
                    }}
                    onNavigationLoaded={generatingTOC}
                    initialLocation={null}

                    onLocationChange={(totalLocations, currentLocation) => {
                        if (!currentLocation || !totalLocations) {
                            return null;
                        }
                        const page = currentLocation.start.location;
                        const href = currentLocation.start.href;
                        setCurrentPage(page);
                        setTotalPages(totalLocations);
                        console.log(totalLocations)
                    }}
                />
            </View>
            <View style={styles.indicators}>
                <TouchableOpacity onPress={() => {
                    book.Language == "Urdu" ? goNext() : goPrevious()
                }}>
                    <Image
                        source={require('../../assets/lInd.png')}
                        style={{ width: 16, height: 16, opacity: 0.25, marginLeft: 24 }}

                    />
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', color: isDark == true ? 'white' : '#474747', fontWeight: '600', opacity: 0.5, fontSize: 12, fontFamily: 'OutfitLight' }}>Page <Text style={{ fontWeight: '200', color: isDark == true ? 'white' : '#474747', fontFamily: 'OutfitLight' }}> {currentPage} - {totalPages}</Text></Text>
                <TouchableOpacity onPress={() => {
                    book.Language == "Urdu" ? goPrevious() : goNext()
                }}>
                    <Image
                        source={require('../../assets/rInd.png')}
                        style={{ width: 16, height: 16, opacity: 0.25, marginRight: 24 }}
                    />
                </TouchableOpacity>
            </View>

            <Footer
                BookTitle={title}
                tableofContent={toc}
                DarkTheme={DarkTheme}
                LightTheme={LightTheme}
                Fonts={Fonts}
                UrFonts={UrFonts}
                increaseFont={increaseFont}
                decreaseFont={decreaseFont}
                isDarkTheme={isDarkTheme}
                book={book}
            />

        </View>
    </SafeAreaView>
}

export default function BookReader({ navigation, route }) {
    useEffect(() => {
        console.log(route.params.book)
    }, [])
    return (
        // <SafeAreaView>
        <ReaderProvider>
            <Inner
                navigation={navigation}
                title={route.params.title}
                url={route.params.url}
                book={route.params.book}
                type={route.params.type}
            />
        </ReaderProvider>
        //</SafeAreaView>
    )
}


const styles = StyleSheet.create({
    ReaderHolder: {
        borderColor: 'red',
        borderWidth: 98,
        marginLeft: 24,
        marginRight: 24,
    },
    loadingContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    indicators: {
        width: window.width * 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        position: 'absolute',
        bottom: 24
    }
});

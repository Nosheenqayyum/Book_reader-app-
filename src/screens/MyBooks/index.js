import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { useFonts } from 'expo-font';
import { useDispatch } from 'react-redux';
import window from '../../../utils/window';
import colors from '../../../utils/colors';
import SearchBar from '../../components/SearchBar';
import BooksMiddleware from '../../middlewares/Books';
import CustomDrawer from '../../components/Drawers';
import backarrow from '../../assets/arrowBack.png';

export default ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        Outfit: require('../../../assets/Outfit/static/Outfit-Black.ttf'),
        OutfitThin: require('../../../assets/Outfit/static/Outfit-Thin.ttf'),
        OutfitSemiBold: require('../../../assets/Outfit/static/Outfit-SemiBold.ttf')
    })
    const [search, setSearch] = useState('');
    const [bookList, setBookList] = useState([]);
    const [isDrawer, setDrawer] = useState(false);
    const [isLoad, setIsLoad] = useState(true);

    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', e => {
            e.preventDefault(); // Prevent default action
            unsubscribe() // Unsubscribe the event on first call to prevent infinite loop
            navigation.navigate('home') // Navigate to your desired screen
        });
    }, [])

    useEffect(() => {
        BooksMiddleware.getMyBooks().then((res) => {
            console.log('Library Books:', res)
            setBookList(res.content[0]?.library_has_books)
            setIsLoad(false)

        }).catch((err) => {
            console.log(err)
            setIsLoad(false)

        })
        console.log(bookList)
    }, [])


    const menu = (
        <CustomDrawer
        // index={params.index}
        // goToLocation={goToLocation}
        // onSearch={onSearch}
        // searchResults={searchResults}
        />
    );

    const onPreviewClick = (book) => {
        navigation.navigate(`reader`, {
            title: book.Name,
            url: book.Url,
            type: 'full',
            index: 0,
            book: book,
        })
    }
    const onPress = async (item, title, url, index) => {
        onPreviewClick(item)
    }

    const onChangeSearch = (e) => {
        let text = e.toLowerCase()
        setSearch(text)
        setIsLoad(true)
        let trucks = bookList
        let filteredName = trucks.filter((item) => {
            return item?.book?.Name.toLowerCase().match(text)
        })

        if (!text || text === '') {
            BooksMiddleware.getMyBooks().then((res) => {
                console.log(res.content)
                setBookList(res.content[0]?.library_has_books)
                setIsLoad(false)

            }).catch((err) => {
                console.log(err)
                setIsLoad(false)

            })
            return
        } else if (!Array.isArray(filteredName) && !filteredName.length) {
            // set no data flag to true so as to render flatlist conditionally
            BooksMiddleware.getMyBooks().then((res) => {
                console.log(res.content)
                setBookList(res.content[0]?.library_has_books)
                setIsLoad(false)

            }).catch((err) => {
                console.log(err)
                setIsLoad(false)

            })
        }
        else if (Array.isArray(filteredName)) {
            setBookList(filteredName)
            setIsLoad(false)
        }
    }
    const renderItem = ({ item }) => {
        const { Name, Author_Name, } = item?.book;
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.item}
                onPress={() => onPress(item.book, Name, item.book?.Url, 0)}>
                <Image source={{ uri: item.book?.Image }} style={styles.cover} />
                <Text style={styles.title}>{Name}</Text>
                <Text style={styles.author}>{Author_Name}</Text>
                {/* <View style={styles.itemRow}>
              <FontAwesome name="star" style={styles.star} />
              <Text style={styles.author}>4.2</Text>
            </View> */}
            </TouchableOpacity>

        );
    };

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.itemRow}>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Image source={backarrow} style={styles.BackIcon} />

                </TouchableOpacity>
                <Text style={styles.heading}>My Books</Text>

            </View>
            <SearchBar value={search} onChange={(e) => onChangeSearch(e)} />
            {isLoad &&
                <View style={styles.whiteOverlay}>
                    <ActivityIndicator size="large" color={colors.primary} style={styles.Acitivity} />
                </View>
            }



            {/* <ScrollView> */}
                <FlatList
                    data={bookList}
                    renderItem={renderItem}
                    contentContainerStyle={styles.wrapper}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                />
            {/* </ScrollView> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFDFE',
        // paddingTop: 30,
    },
    itemRow: {
        paddingTop: 5,
        alignItems: 'center',
        flexDirection: 'row',
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
        justifyContent: 'center'
    },
    cover: {
        height: 250,
        resizeMode: 'contain',
        width: window.width * 0.40,
        borderRadius: 12
    },
    title: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'OutfitSemiBold'
    },
    author: {
        fontSize: 12,
        fontFamily: 'OutfitThin',
        marginTop: 5
    },
    itemRow: {
        paddingTop: 5,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
    },
    star: {
        fontSize: 15,
        marginRight: 5,
        color: colors.yellow,
    },
    BackIcon: {
        width: 26,
        height: 24,
        marginTop: 30,
        marginLeft: 20,
        resizeMode: 'contain'
    },
    heading: {
        marginTop: 30,
        fontSize: 18,
        marginLeft: 10,
        fontFamily: 'OutfitSemiBold'
    },
});

import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Button,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    ToastAndroid,
    ActivityIndicator,
    Image
} from 'react-native'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { emptyCart } from '../../commonRedux/cart/cartActions'
import { StripeProvider, CardField, useConfirmPayment, useStripe, CardForm } from '@stripe/stripe-react-native'
import OrdersMiddleware from '../../middlewares/Order';
import { isLoaded, useFonts } from 'expo-font';
import colors from '../../../utils/colors';
import { currency } from 'expo-localization'
import backarrow from '../../assets/arrowBack.png'



function CardComponent({ Currency, isPakistan, Amount, Amount_without_stripe, User, Description, Books, navigation }) {
    const [fontsLoaded] = useFonts({
        Outfit: require('../../../assets/Outfit/static/Outfit-Black.ttf'),
        OutfitThin: require('../../../assets/Outfit/static/Outfit-Thin.ttf'),
        OutfitSemiBold: require('../../../assets/Outfit/static/Outfit-SemiBold.ttf')
    })
    const [cardDetails, setCardDetails] = useState(null);
    const [currentExchangeRate, setCurrentExchangeRate] = useState(0);
    const [loading, setLoading] = useState(false);
    const { createToken } = useStripe();
    const [order, setOrder] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://api.getgeoapi.com/v2/currency/convert?api_key=7fff062f53b27b6373ded160e89f0d3726c11d57&from=USD&to=PKR&amount=1&format=json", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log('Result : ', result)
                let response = JSON.parse(result)
                console.log(response)
                setCurrentExchangeRate(response.rates.PKR.rate)
            })
            .catch(error => {
                console.log('error', error)
                setCurrentExchangeRate(null)
            });
    }, [])


    const createOrder = (id) => {
        var data = {
            'Order_ID': id,
            'Payment_Method': 'Stripe',
            'Payment_Status': 'Pending',
            'Amount': Amount_without_stripe,
            'books': Books,
            'currency': isPakistan ? 'PKR' : 'USD',
            'dollarRate': isPakistan ? null : currentExchangeRate
        }

        OrdersMiddleware.postOrder(data)
            .then(res => {
                console.log('ORDER POSTED: ', res)
                setOrder({ ...order, content: res.content })
                console.log('WOW WOW Hurrah');
                // Mail to User of Purchase
                OrdersMiddleware.orderConfirmationMailToUser({
                    'Order_ID': id,
                    //'Book_ID': this.state.book?.Book_ID,
                    'Payment_Method': 'Stripe',
                    'email': User?.Email,
                    'name': User?.Full_Name,
                    'books': Books,
                })
                    .then(res => {
                        console.log('Mailed To User', res)
                        setOrder({ ...order, content: res.content })
                    })
                    .catch(error => {
                        console.log('Error While Mailing User')
                    })


                OrdersMiddleware.orderConfirmationMailToAuthor({
                    'Order_ID': id,
                    'Payment_Method': 'Stripe',
                    'books': Books,
                })
                    .then(res => {
                        console.log('Mailed To Author', res)
                        setOrder({ ...order, content: res.content })
                    })
                    .catch(error => {
                        console.log('Error While Mailing Author')
                    })

                OrdersMiddleware.orderUpdate({
                    'Order_ID': id,
                    'Payment_Method': 'Stripe',
                    'Payment_Status': 'Cleared',
                    'Reference_No': null,
                    'currency': isPakistan ? "PKR" : "USD",
                })
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })

                OrdersMiddleware.putBookInLibrary({
                    'books': Books
                })
                    .then(res => {
                        ToastAndroid.showWithGravityAndOffset('Transaction Successful', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 300)
                        dispatch(emptyCart())

                        navigation.navigate('library')
                        console.log(res)
                    })
                    .catch(err => {
                        console.log(err)
                    })


            })
            .catch(error => {
                console.log(err)
            })
    }


    const handlePayPress = async () => {
        // 1. Gather customer Billing Information
        console.log('cardDetails', cardDetails);
        setLoading(true)

        if (cardDetails === null) {
            ToastAndroid.showWithGravityAndOffset('Please enter the complete card details', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 300)
            setLoading(false)
            return
        }
        if (cardDetails.complete === false) {
            ToastAndroid.showWithGravityAndOffset('Please enter the complete card details', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 300)
            setLoading(false)
            return
        }


        // 2. Fetch the initial secret from the stripe
        const { error, token } = await createToken({
            type: 'Card',
        });

        if (error) {
            console.log(`Error: ${JSON.stringify(error)}`);
            ToastAndroid.showWithGravityAndOffset('Oh sorry due to some issue we are unable to process your payment. Try again', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 300)

            setLoading(false)
        } else {

            var stripeData = JSON.stringify({
                "currency": isPakistan ? 'pkr' : 'usd',
                "amount": Amount,
                "source": token.id,
                "receipt_email": User.Email,
                "description": Description,
                "books": Books
            })


            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://api.littlebookcompany.net/v1/api/stripe/charge',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: stripeData
            };


            try {

                axios.request(config)
                    .then((res) => {
                        if (res.data.message == 'charge posted successfully') {
                            var Order_ID = 'xxx-xxx-xxx-xxx'.replace(/[x]/g, (c) => {
                                let dataTimeNow = new Date().getTime()
                                var r = (dataTimeNow + Math.random() * 16) % 16 | 0;
                                dataTimeNow = Math.floor(dataTimeNow / 16)
                                return (c == "x" ? r : (r & 0x3 | 0x8)).toString(16)
                            })

                            createOrder(Order_ID);

                            setLoading(false)
                        } else if (res.data.message !== 'charge posted successfully') {
                            ToastAndroid.showWithGravityAndOffset('Oh sorry due to some issue we are unable to process your payment. Try again', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 300)

                            setLoading(false)
                        }
                    })
                    .catch((error) => {
                        ToastAndroid.showWithGravityAndOffset('Oh sorry due to some issue we are unable to process your payment. Try again', ToastAndroid.SHORT, ToastAndroid.TOP, 0, 300)
                        setLoading(false)
                    });
            } catch (error) {
                console.warn("PAYMENT ERR", error)
            }

        }
    }

    return (
        <View style={styles.container}>
            <View
                style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', position: 'absolute', top: '5%' }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBox}
                >
                    <Image source={backarrow} style={styles.BackIcon} />
                </TouchableOpacity>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <Image
                    style={styles.stripeLogo}
                    source={require('../../assets/stripe.png')}
                />
            </View>
            <CardField
                postalCodeEnabled={false}
                placeholders={{
                    number: "4242 4242 4242 4242"
                }}
                cardStyle={styles.card}

                style={styles.cardContainer}
                onCardChange={(cardDetails) => {
                    console.log(cardDetails)
                    setCardDetails(cardDetails)
                }}
            />
            {
                !loading && <TouchableOpacity style={styles.PayButton} onPress={handlePayPress}>
                    <Text style={styles.PayText}>Pay</Text>
                </TouchableOpacity>
            }

            {
                loading && <TouchableOpacity style={styles.PayButton}>
                    <ActivityIndicator size="small" color={colors.white} />
                </TouchableOpacity>
            }



            {/* {loading && <ActivityIndicator size="small" color={colors.darkBlue} />} */}
        </View>
    )
}

export default CardComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        margin: 20
    },
    input: {
        backgroundColor: '#efefefef',
        borderColor: '#000000',
        borderRadius: 8,
        fontSize: 20,
        height: 50,
        padding: 10
    },
    BackIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    card: {
        backgroundColor: '#efefefef',
        borderColor: colors.darkBlue,
        borderWidth: 2,
        borderRadius: 8
    },
    cardContainer: {
        height: 50,
        marginVertical: 30,
    },
    stripeLogo: {
        width: 60,
        height: 60,
    },
    cardForm: {
        height: 300,
        width: '100%'
    },
    PayButton: {
        backgroundColor: colors.lightBlue,
        padding: 10,
        borderRadius: 8
    },
    PayText: {
        textAlign: 'center',
        fontFamily: 'OutfitSemiBold',
        fontSize: 18,
        color: colors.white
    }
})
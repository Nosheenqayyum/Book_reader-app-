import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    ToastAndroid
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { StripeProvider } from '@stripe/stripe-react-native'
import * as Location from 'expo-location';
import axios from 'axios';
import { getLoggedInUser } from '../../commonRedux/selectors';
import { getAllcartItems } from '../../commonRedux/selectors';
import { emptyCart } from '../../commonRedux/cart/cartActions'
import CardComponent from '../../components/Card/CardComponent';

const stripe_Live = 'pk_live_51JZYy3HlUXQRtIaS5VkbuRxk5qaDdxOmFef5Ij6bmkwxFTZxow8ucnWrPOgNVBhuAnOC6Ab4qy2IskBniMUzUXDs00qLP6P4Ld';
const stripe_Test = 'pk_test_51JZYy3HlUXQRtIaSmoUf7WbsQBsSm9ScF17obbcxn7vXYW9VMEMKk8TepMlZsmURqAb3JX6wZol29BdQr7PUb5Ex00KOs2PRwF';

export default ({ navigation, route }) => {
    const users = useSelector(getLoggedInUser)
    const cart = useSelector(getAllcartItems)
    const dispatch = useDispatch()
    const [currency, setCurrency] = useState('');
    const [isPakistan, setIsPakistan] = useState(true);

    const [total, setTotal] = useState(0)
    const [descriptionString, setDescriptionString] = useState('')


    const LocationToAddress = (lat, long) => {
        const locationPublish = `${lat},${long}`;
        const key = 'AIzaSyDYcS2N3a-TNufxLrSh196U6rUifFlUF38'
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationPublish}&sensor=true&key=${key}`
        console.log('here');
        fetch(url)
            .then(response => response.json())
            .then((result) => {
                const { results } = result
                console.log(results)
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
                    setCurrency('PKR')
                } else {
                    setIsPakistan(false)
                    setCurrency('USD')
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
                console.log("RETURN")
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            // console.log('My Location : ',location.coords.latitude);
            // console.log('My Location : ',location.coords.longitude);

            LocationToAddress(location.coords.latitude, location.coords.longitude);
        })();
    }, [])

    useEffect(() => {
        let description = [];
        let total = 0;
        cart.forEach((book) => {
            total = total + parseInt(book.Price)
            description.push(book.Name)
        })

        setDescriptionString(description.toString());
        setTotal(total);

    }, [cart])

    const emptyCart = () => {
        dispatch(emptyCart)
    }

    return (
        <StripeProvider
            publishableKey='pk_live_51JZYy3HlUXQRtIaS5VkbuRxk5qaDdxOmFef5Ij6bmkwxFTZxow8ucnWrPOgNVBhuAnOC6Ab4qy2IskBniMUzUXDs00qLP6P4Ld'
            // publishableKey='pk_test_51JZYy3HlUXQRtIaSmoUf7WbsQBsSm9ScF17obbcxn7vXYW9VMEMKk8TepMlZsmURqAb3JX6wZol29BdQr7PUb5Ex00KOs2PRwF'
        >
            <CardComponent
                Currency={currency}
                isPakistan={isPakistan}
                Amount={total * 100}
                Amount_without_stripe={total}
                User={users}
                Description={descriptionString}
                Books={cart}
                emptyCart={emptyCart}
                navigation={navigation}
            />
        </StripeProvider>
    )
}


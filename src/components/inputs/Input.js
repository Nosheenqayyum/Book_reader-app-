import React from 'react'
import {View, Text} from 'react-native'

export default function Input(props) {
 const {msg, type} = props

  return (
   <View>
    <Text>
        {msg}
    </Text>
   </View>
  )
}

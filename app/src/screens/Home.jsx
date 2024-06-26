import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import axios from 'axios'

export default function Home() {
    useEffectt(() => {
        const testCall = async () => {
            const result = await axios.get(`${API_URL}/users`)
            console.log("Testcall: ", result)
        }
        testCall();
    }, [])

    return (
        <View>
            <Text>Home</Text>
        </View>
    )
}
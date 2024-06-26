import { View, Text, StyleSheet, TextInput, Button, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { onLogin, onRegister } = useAuth();

    useEffect(() => {
        const testCall = async () => {
            const result = await axios.get(`${API_URL}/users`)
            console.log("Testcall: ", result)
        }
        testCall();
    }, [])

    const login = async () => {
        const result = await onLogin(email, password);
        if (result && result.error) {
            alert(result.msg);
        }
    }

    const register = async () => {
        const result = await onRegister(email,password);
        if (result && result.error) {
            alert(result.msg);
        } else {
            login();
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://galaxies.dev/img/logos/logo--blue.png' }}
                style={styles.image}
            />
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                />
            </View>
            <Button onPress={login} title='Sign-In' />
            <Button onPress={register} title='Create account' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%'
    },
    form: {
        gap: 10,
        width: '60%'
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#FFF'
    },
    image: {
        width: '50%',
        height: '50%',
        resizeMode: 'contain'
    },
})
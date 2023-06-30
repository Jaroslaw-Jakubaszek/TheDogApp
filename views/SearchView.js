import React, { useState, useEffect } from "react";
import { View,Text, TextInput, Button, Image, StyleSheet, SafeAreaView, ActivityIndicator } from "react-native";


const SearchView = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [breed, setBreed] = useState('');
    const [dogImage, setDogImage] = useState(null);

    const imageLoader = () => {
        if (isLoading) {
            return (
                <View style={styles.loading}>
                <ActivityIndicator size="large" color="#e1c9bf" />
                </View>
            );
        }
        return null;
    };

    const searchDogImage = async () => {
        try {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
        const data = await response.json();

        if (data.status === 'success') {
            setIsLoading(true);
            setDogImage(data.message);
            setIsLoading(false);
        } else {
            setIsLoading(true);
            setDogImage(null);
            console.error('Nieprawidłowa nazwa rasy');
            setIsLoading(false);
        }
        } catch (error) {
        setIsLoading(true);
        setDogImage(null);
        console.error('Błąd ładowania obrazu', error);
        setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Wyszukaj pieska</Text>
            <TextInput
                style={styles.textinput}
                placeholder="Wpisz nazwę rasy"
                onChangeText={text => setBreed(text.toLowerCase())}
                value={breed}
            />
            <Button
                title="Szukaj"
                color='#e1c9bf'
                onPress={searchDogImage}
            />
            {imageLoader()}
            {dogImage && (
                <Image
                    style={ styles.images }
                    source={{ uri: dogImage }}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        justifyContent: 'center',
        padding: 20,

    },
    images: {
        width: 335, 
        height: 335, 
        marginTop: 16, 
        borderRadius: 10,
        alignSelf: "center",
    },
    textinput: {
        height: 40, 
        borderColor: '#e1c9bf', 
        borderWidth: 1, 
        marginBottom: 8, 
        borderRadius: 25, 
        padding: 10 
    },
    loading: {
        paddingVertical: 20
    },
    text: {
        color: '#492f24',
        fontSize: 30,
        fontFamily: "Bodoni 72 Oldstyle",
        fontWeight: "500",
        alignSelf: "center",
        padding: 15
    
    }
});


export default SearchView;
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

const Details = ({ route }) => {
    const navigation = useNavigation();
    const { title, poster_path, id, release_date, overview, popularity, vote_average } = route.params;
    const path = "https://image.tmdb.org/t/p/w500/";

    // console.log(title, poster_path, id, release_date, overview, rating);

    return (
        <View style={styles.container}>
            <Image source={{ uri: path + poster_path }} style={styles.image}></Image>
            <View style={styles.titleParent}>
                <Text style={styles.title}> {title}</Text>
            </View>
            <View style={styles.overviewParent}>
                <Text style={styles.overview}> {overview}</Text>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ color: 'white', fontSize: 20 }} > Popularity:  {popularity}</Text>
                    <Text style={{ color: 'white' }}> Vote Average: {vote_average}</Text>
                </View>
            </View>

            <View style={{}}>
                <Button color='black' title='Go Back' onPress={() => navigation.goBack()}></Button>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'darkred',
        justifyContent: 'space-between'
    },
    image: {
        width: 400,
        height: 400,
        resizeMode: 'stretch',
    },
    titleParent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: 'black',
        opacity: 0.7,
        position: 'relative',
        bottom: 60
    },
    title: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold'
    },

    overviewParent: {
        marginBottom: 15,
        paddingHorizontal: 5,
        position: 'relative',
        bottom: 35,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    overview: {
        color: 'white',
        lineHeight: 18
    }
})

export default Details;

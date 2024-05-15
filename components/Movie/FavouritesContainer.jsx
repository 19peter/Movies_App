import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import storage from '../../Utils/storage'
import { useFocusEffect } from '@react-navigation/native';


const FavouritesContainer = ({ title, poster_path, id, release_date , setFavourites }) => {
    const path = "https://image.tmdb.org/t/p/w500/";


    // useFocusEffect(
    //     useCallback(() => {
    //         storage.getIdsForKey('favourites').then(favs => {
    //             setFavsArray(favs);
    //         });
    //     }, [])
    // )

    const handleRemove = () => {
        storage.remove({
            key: 'favourites',
            id: id
        })

        setFavourites(old => old.filter((o) => o.id !== id));
    }


    return (
        <View style={styles.container}>
            <View>
                <Image source={{ uri: path + poster_path }} style={styles.image}>

                </Image>
            </View>
            <View style={styles.actionMenu}>
                <Text style={styles.title}>{title}</Text>


                <TouchableOpacity style={styles.button} onPress={handleRemove}>
                    <Icon name="delete" size={30} color={"black"} />
                </TouchableOpacity>



            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 30,
        width: 350,
        height: 350,
        backgroundColor: 'darkred',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },

    image: {
        width: 300,
        height: 300,
        // borderRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        resizeMode: 'stretch'
    },

    title: {
        // width: 200
        marginLeft: 20
    },

    actionMenu: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'firebrick',
        width: 300,
        justifyContent: 'space-between',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },

    button: {
        width: 50,
        height: 50,
        // backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FavouritesContainer;

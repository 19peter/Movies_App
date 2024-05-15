import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import storage from '@/Utils/storage';
import FavouritesContainer from '@/components/Movie/FavouritesContainer';
import { useFocusEffect } from '@react-navigation/native';

const Favourites = () => {
    const [favourites, setFavourites] = useState(null);
    useFocusEffect(
        useCallback(() => {
            storage.getAllDataForKey('favourites').then(favs => {
                setFavourites(favs);
            })
        }, [])
    );

    // if (!favourites) {
    //     return (
    //         <View style={styles.container}>
    //             <Text>No Favourites Available</Text>
    //         </View>
    //     )
    // }

    console.log(favourites);

    return (

        <View style={styles.container}>

            {
                favourites?.length === 0 ?
                    <View style={styles.notFound}>
                        <Text style={[styles.text, { fontSize: 100, paddingTop: 50}]}>X</Text>
                        <Text style={[styles.text, { fontSize: 20}]}>No Movies In Favourites</Text>
                    </View>
                    :
                    <FlatList
                        style={{ marginTop: 10 }}
                        data={favourites}
                        renderItem={({ item }) =>
                            <FavouritesContainer
                                key={item.id}
                                {...item}
                                setFavourites={setFavourites}
                            >

                            </FavouritesContainer>}
                        keyExtractor={item => item.id}
                    >
                    </FlatList>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'darkred',
        height: "100%"

    }, 
    notFound : {
        display: 'flex',
        justifyContent: "flex-start",
        alignItems: 'center',
        width: 300,
        height: 300,
        borderRadius: 200,
        borderWidth: 5,
        borderColor: 'black',
        opacity: 0.7,
        color: 'white',
        backgroundColor: 'black'
    }, 
    text : {
        color: 'white'
    }
})

export default Favourites;

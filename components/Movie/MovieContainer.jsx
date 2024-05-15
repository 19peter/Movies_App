import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import storage from '../../Utils/storage'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import routes from '@/Utils/routes';


const MovieContainer = ({ title, poster_path, id, release_date, overview, popularity, vote_average }) => {
    const path = "https://image.tmdb.org/t/p/w500/";
    // const [isCurrentlyFavourited, setIsCurrentlyFavourited] = useState(false);
    const [favsArray, setFavsArray] = useState([]);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            storage.getIdsForKey('favourites').then(favs => {
                if (favs.includes(id)) {
                    setFavsArray(favs);
                }
            });
        }, [])
    )

    const handleLike = () => {
        if (favsArray.includes(id)) {
            storage.remove({
                key: 'favourites',
                id: id
            })
            setFavsArray(old => old.filter((o) => id !== o))

        } else {
            storage.save({
                key: "favourites",
                id: id,
                data: {
                    release_date,
                    title,
                    poster_path,
                    id
                }
            })
            setFavsArray(old => [...old, id])
        }
    }

    const isFavourited = () => {
        if (favsArray.includes(id)) return true;
        return false;
    }

    const handleNavigate = () => {
        navigation.navigate(routes.details, {title, poster_path, id, release_date, overview, popularity, vote_average} )
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleNavigate}>
            <View>
                <Image source={{ uri: path + poster_path }} style={styles.image}>

                </Image>
            </View>
            </TouchableOpacity>
            <View style={styles.actionMenu}>
                <Text style={styles.title}>{title}</Text>




                <TouchableOpacity style={styles.button} onPress={handleLike}>
                    {
                        isFavourited() ?
                            <Icon name="heart" size={30} color={"red"} />
                            :
                            <Icon name="heart" size={30} color={'white'} />}
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
        backgroundColor: 'black',
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

export default MovieContainer;

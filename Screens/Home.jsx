import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useQuery, useQueryClient } from '@tanstack/react-query/src/index';
import { fetchMovies } from '../API/MoviesAPI'
import { Dropdown } from 'react-native-element-dropdown';
import MovieContainer from '../components/Movie/MovieContainer';

const Drawer = createDrawerNavigator();

const HomePage = () => {

    const queryClient = useQueryClient();

    const [search, setSearch] = useState('');
    const [searchResultMovies, setSearchResultMovies] = useState(null);
    const [filter, setFilter] = useState('popular');
    const [isFocus, setIsFocus] = useState(false);

    const handleSearch = (searchedText) => {
        setSearch(searchedText);
        let res = movies.data.filter((o) => o.title.includes(searchedText))
        setSearchResultMovies({ data: res })
    }

    const filters = [
        { label: "Popular", value: "popular" },
        { label: "Upcoming", value: 'upcoming' },
        { label: "Now Playing", value: "now_playing" },
        { label: "Top Rated", value: "top_rated" },

    ]


    let movies = useQuery({
        queryKey: ["movies", filter],
        queryFn: (filter) => {
            let { queryKey } = filter;
            // console.log(queryKey[1])
            return fetchMovies(queryKey[1])
        }
    })


    return (
        <View style={{ backgroundColor: 'black' }}>

            <View style={styles.topBar}>
                <TextInput
                    style={[styles.textInput, {backgroundColor: 'white'}] }
                    placeholder='Search'
                    value={search}
                    onChangeText={text => handleSearch(text)}
                ></TextInput>

                <Dropdown
                    style={[styles.dropdown, {backgroundColor: 'white'}]}
                    data={filters}
                    value={filter}
                    labelField="label"
                    valueField="value"
                    maxHeight={300}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setFilter(item.value);
                        setIsFocus(false);
                    }}
                ></Dropdown>

            </View>

            <SafeAreaView style={styles.container}>
                <View style={styles.MoviesContainer}>

                    {
                        movies.data ?

                            searchResultMovies ?
                                <FlatList
                                    data={searchResultMovies.data}
                                    renderItem={({ item }) =>
                                        <MovieContainer
                                            {...item}
                                            filter={filter}>
                                        </MovieContainer>}
                                    keyExtractor={item => item.id}
                                >
                                </FlatList>
                                :
                                <FlatList
                                    data={movies.data}
                                    renderItem={({ item }) =>
                                        <MovieContainer
                                            {...item}
                                            filter={filter}>
                                        </MovieContainer>}
                                    keyExtractor={item => item.id}
                                >
                                </FlatList>

                            :
                            <ActivityIndicator size='large' color='red'></ActivityIndicator>
                    }

                </View>
            </SafeAreaView >
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'black',
        minHeight: 800
    },

    topBar: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 20,
        backgroundColor: 'black'
    },
    textInput: {
        borderWidth: 1,
        width: 250,
        marginRight: 5,
        padding: 10,
        borderRadius: 20,
        borderColor: 'black',
    },
    dropdown: {
        height: 60,
        width: 120,
        borderRadius: 20,
        padding: 10
    },
    MoviesContainer: {

    }
})

export default HomePage;

import React from 'react';
import { StyleSheet, View , Text, Image} from 'react-native';

const Intro = () => {
    return (
        <View style={{display: 'flex', flex: 1,  backgroundColor : "black", justifyContent: 'center', alignItems: 'center'}}>
            <Image source={{
                uri: "https://static.vecteezy.com/system/resources/previews/008/350/760/non_2x/initial-m-logo-design-vector.jpg",
                width: 500,
                height: 500
            }}>
            </Image>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Intro;

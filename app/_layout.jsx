import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import routes from "../Utils/routes"

import { useColorScheme } from '@/hooks/useColorScheme';
import { Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Intro from '../Screens/Intro'
import Home from '../Screens/Home'
import Favourites from '../Screens/Favourites'
import Details from '../Screens/Details'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query/src/index'

import storage from '@/Utils/storage';
import { createStackNavigator } from '@react-navigation/stack';


SplashScreen.preventAutoHideAsync();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function StackComponent({ route, navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Details' initialParams={route.params} component={Details} ></Stack.Screen>

    </Stack.Navigator>
  )
}

function DrawerComp() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={routes.home} component={Home} options={{ unmountOnBlur: true }} />
      {/* <Drawer.Screen name={routes.details} component={StackComponent} options={{ unmountOnBlur: true }} /> */}
      <Drawer.Screen name={routes.favourites} component={Favourites} />
    </Drawer.Navigator>
  )
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });


  const [intro, setIntro] = useState(true);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);


  useEffect(() => {
    setTimeout(() => {
      setIntro(false);
    }, 3000);
  }, [])

  if (!loaded) {
    return null;
  }
  storage.clearMap();

  const queryClient = new QueryClient()

  return (
    intro ?
      <Intro></Intro>
      :
      <QueryClientProvider client={queryClient}>

        <View style={{ flex: 1, }}>
          <NavigationContainer independent={true}>

            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name='drawer' component={DrawerComp} ></Stack.Screen>
              <Stack.Screen name='Details' component={Details} ></Stack.Screen>
            </Stack.Navigator>

          </NavigationContainer>
        </View>

      </QueryClientProvider>
  );
}

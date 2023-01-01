import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from '../theme/Colors';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MoviesScreen from '../components/screens/MoviesScreen';
import DetailScreen from '../components/screens/DetailScreen';
import Movie from '../../assets/images/svg/movieIcon';
import Star from '../../assets/images/svg/starIcon';

const Tab = createBottomTabNavigator();
const NowPlayingStack = createNativeStackNavigator();

const tabBarActiveTintColor = Colors.yellow3;
const tabBarInactiveTintColor = Colors.grey;

function NowPlayingScreenStack() {
  return (
    <NowPlayingStack.Navigator screenOptions={{headerShown: false}}>
      <NowPlayingStack.Screen name="NowPlaying" component={MoviesScreen} />
      <NowPlayingStack.Screen name="Detail" component={DetailScreen} />
    </NowPlayingStack.Navigator>
  );
}

function TopRatedScreenStack() {
  return (
    <NowPlayingStack.Navigator screenOptions={{headerShown: false}}>
      <NowPlayingStack.Screen name="TopRated" component={MoviesScreen} />
      <NowPlayingStack.Screen name="Detail" component={DetailScreen} />
    </NowPlayingStack.Navigator>
  );
}

const getTabBarIcon = (Icon, e) => (
  <Icon
    fill={e.focused ? tabBarActiveTintColor : tabBarInactiveTintColor}
    height="60%"
    width="60%"
  />
);

const tabScreens = [
  {
    name: 'NowPlayingScreenStack',
    component: NowPlayingScreenStack,
    options: {
      tabBarLabel: 'Now Playing',
      tabBarActiveTintColor,
      tabBarInactiveTintColor,
      unmountOnBlur: true,
      tabBarIcon: e => getTabBarIcon(Movie, e),
    },
  },
  {
    name: 'TopRatedScreenStack',
    component: TopRatedScreenStack,
    options: {
      tabBarLabel: 'Top Rated',
      tabBarActiveTintColor,
      tabBarInactiveTintColor,
      unmountOnBlur: true,
      tabBarIcon: e => getTabBarIcon(Star, e),
    },
  },
];

const screenOptions = () => ({
  headerShown: false,
  tabBarStyle: {
    height: 80,
    paddingBottom: 16,
    backgroundColor: Colors.yellow1,
  },
});

const navigationTheme = {
  colors: {
    primary: Colors.black,
    text: Colors.yellow0,
    background: Colors.yellow1,
  },
};

const Navigator = () => {
  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: Colors.yellow1}} />
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.yellow1}}>
        <StatusBar barStyle="dark-content" hidden={false} />
        <NavigationContainer theme={navigationTheme}>
          <Tab.Navigator screenOptions={screenOptions}>
            {tabScreens.map(({name, component, options}) => {
              return (
                <Tab.Screen
                  key={name}
                  name={name}
                  component={component}
                  options={options}
                  listeners={{tabPress: () => {}}}
                />
              );
            })}
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

export default Navigator;

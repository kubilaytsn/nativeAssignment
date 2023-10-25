import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import GetStartedScreen from '../screens/GetStartedScreen';
import WalkThroughScreen from '../screens/WalkThroughScreen';
import PlansScreen from '../screens/PlansScreen';
import HomeScreen from '../screens/Home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../components/Loading';

const Tab = createBottomTabNavigator();

const tabBarOptions = {
  tabBarStyle: {
    height: 60,
    paddingTop: 5,
    paddingBottom: 10,
  },
};

const tabScreenOptions = (iconName: any) => ({
  tabBarIcon: (color: any) => (
    <Image source={getTabIcon(iconName)} style={{tintColor: color}} />
  ),
  headerShown: false,
  tabBarActiveTintColor: '#28AF6E',
});

const getTabIcon = (iconName: any) => {
  switch (iconName) {
    case 'tabbarhome':
      return require('../../assets/images/tabbarhome.png');
    case 'tabbardiagnose':
      return require('../../assets/images/tabbardiagnose.png');
    case 'tabbarScan':
      return require('../../assets/images/tabbarScan.png');
    case 'tabbargarden':
      return require('../../assets/images/tabbargarden.png');
    case 'tabbarprofile':
      return require('../../assets/images/tabbarprofile.png');
    default:
      return require('../../assets/images/tabbarhome.png');
  }
};
const Stack = createStackNavigator();

//TabBar burada oluşturuldu.
function HomeTab() {
  return (
    <Tab.Navigator screenOptions={tabBarOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          ...tabScreenOptions('tabbarhome'),
          tabBarActiveTintColor: '#28AF6E',
        }}
      />
      <Tab.Screen
        name="Diagnose"
        component={HomeScreen}
        options={{
          ...tabScreenOptions('tabbardiagnose'),
          tabBarActiveTintColor: '#28AF6E',
        }}
      />
      <Tab.Screen
        name="Scan"
        component={HomeScreen}
        options={{
          ...tabScreenOptions('tabbarScan'),
          tabBarLabel: '',
          tabBarActiveTintColor: '#28AF6E',
        }}
      />
      <Tab.Screen
        name="My Garden"
        component={HomeScreen}
        options={{
          ...tabScreenOptions('tabbargarden'),
          tabBarActiveTintColor: '#28AF6E',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeScreen}
        options={{
          ...tabScreenOptions('tabbarprofile'),
          tabBarActiveTintColor: '#28AF6E',
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const [storedValue, setStoredValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const type = useSelector((state: any) => state.type); //Redux persist kullanarak uygulama yeniden acıldıgında type true ise yönlendirmelerde aşağıda initialRoute olarak started ekranı acılmıyor.Home ekranına yönlendirme yapılıyor.

  useEffect(() => {
    const getValue = async () => {
      try {
        const value = await AsyncStorage.getItem('hideScreen');
        if (value !== null) {
          setStoredValue(value);
        }
      } catch (error) {
        console.error('AsyncStorage hatası:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getValue();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      key={storedValue}
      initialRouteName={`${storedValue === 'true' ? 'Home' : 'GetStarted'}`}>
      <Stack.Screen
        name="GetStarted"
        component={type ? HomeTab : GetStartedScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WalkThrough"
        component={type ? HomeTab : WalkThroughScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Plans"
        component={type ? HomeTab : PlansScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={HomeTab}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;

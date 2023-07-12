import { Feather } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { Logo } from './components';
import { Home, Settings } from './screens';

const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        title: '',
        headerTintColor: '#ffffff',
        headerPressColor: '#ffffff',
        drawerActiveTintColor: '#971cb7',
        drawerInactiveTintColor: '#363636',
        headerBackground: () => (
          <View
            style={{
              backgroundColor: '#971cb7',
              flex: 1,
              alignItems: 'center',
            }}
          >
            <Logo />
          </View>
        ),
      }}
    >
      <Drawer.Screen
        name='Home'
        component={Home}
        options={{
          drawerIcon: ({ focused, size, color }) => (
            <Feather name='home' color={color} size={size} />
          ),
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name='Settings'
        component={Settings}
        options={{
          drawerIcon: ({ focused, size, color }) => (
            <Feather name='settings' color={color} size={size} />
          ),
          drawerLabel: 'Settings',
        }}
      />
    </Drawer.Navigator>

  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <DrawerRoutes />
    </NavigationContainer>
  );
}

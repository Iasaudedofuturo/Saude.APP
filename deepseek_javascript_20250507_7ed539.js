import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeProvider } from 'styled-components';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import AppointmentsScreen from './src/screens/AppointmentsScreen';
import HealthUnitsScreen from './src/screens/HealthUnitsScreen';
import VaccinesScreen from './src/screens/VaccinesScreen';
import PreventionScreen from './src/screens/PreventionScreen';

// Theme
import theme from './src/styles/theme';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Início') {
                iconName = 'home';
              } else if (route.name === 'Consultas') {
                iconName = 'calendar';
              } else if (route.name === 'Postos') {
                iconName = 'hospital';
              } else if (route.name === 'Vacinas') {
                iconName = 'needle';
              } else if (route.name === 'Prevenção') {
                iconName = 'shield';
              }

              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme.colors.primary,
            tabBarInactiveTintColor: theme.colors.gray,
            tabBarStyle: {
              backgroundColor: theme.colors.white,
              paddingBottom: 5,
              height: 60,
            },
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: theme.colors.white,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        >
          <Tab.Screen name="Início" component={HomeScreen} />
          <Tab.Screen name="Consultas" component={AppointmentsScreen} />
          <Tab.Screen name="Postos" component={HealthUnitsScreen} />
          <Tab.Screen name="Vacinas" component={VaccinesScreen} />
          <Tab.Screen name="Prevenção" component={PreventionScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
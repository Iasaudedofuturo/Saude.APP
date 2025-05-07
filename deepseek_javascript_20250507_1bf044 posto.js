import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, PermissionsAndroid, Platform } from 'react-native';
import styled from 'styled-components/native';
import Geolocation from '@react-native-community/geolocation';
import HealthUnitCard from '../components/HealthUnitCard';
import api from '../services/api';

const HealthUnitsScreen = () => {
  const [healthUnits, setHealthUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permissão de Localização',
            message: 'O aplicativo precisa acessar sua localização para encontrar postos próximos.',
            buttonNeutral: 'Perguntar depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          setError('Permissão de localização negada');
          fetchHealthUnits();
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        fetchHealthUnits(latitude, longitude);
      },
      error => {
        console.error(error);
        setError('Não foi possível obter sua localização');
        fetchHealthUnits();
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const fetchHealthUnits = async (lat = null, lng = null) => {
    try {
      let url = '/health-units';
      if (lat && lng) {
        url += `?lat=${lat}&lng=${lng}`;
      }
      
      const response = await api.get(url);
      setHealthUnits(response.data);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar postos de saúde');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Postos de Saúde Próximos</Title>
      {userLocation && (
        <LocationText>
          Buscando postos próximos a sua localização atual
        </LocationText>
      )}
      <FlatList
        data={healthUnits}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <HealthUnitCard unit={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: ${props => props.theme.spacing.medium}px;
  background-color: ${props => props.theme.colors.white};
`;

const Title = styled.Text`
  font-family: ${props => props.theme.fonts.bold};
  font-size: 24px;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.small}px;
`;

const LocationText = styled.Text`
  font-family: ${props => props.theme.fonts.regular};
  font-size: 14px;
  color: ${props => props.theme.colors.darkGray};
  margin-bottom: ${props => props.theme.spacing.medium}px;
`;

const ErrorMessage = styled.Text`
  font-family: ${props => props.theme.fonts.regular};
  font-size: 16px;
  color: ${props => props.theme.colors.danger};
  text-align: center;
`;

export default HealthUnitsScreen;
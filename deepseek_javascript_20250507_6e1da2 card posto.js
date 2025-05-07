import React from 'react';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HealthUnitCard = ({ unit }) => {
  return (
    <Card>
      <CardHeader>
        <UnitName>{unit.name}</UnitName>
        <UnitType>{unit.type}</UnitType>
      </CardHeader>
      
      <CardBody>
        <InfoItem>
          <MaterialCommunityIcons name="map-marker" size={16} color={props => props.theme.colors.primary} />
          <InfoText>{unit.address}</InfoText>
        </InfoItem>
        
        <InfoItem>
          <MaterialCommunityIcons name="phone" size={16} color={props => props.theme.colors.primary} />
          <InfoText>{unit.phone || 'Não informado'}</InfoText>
        </InfoItem>
        
        <InfoItem>
          <MaterialCommunityIcons name="clock" size={16} color={props => props.theme.colors.primary} />
          <InfoText>{unit.workingHours || 'Não informado'}</InfoText>
        </InfoItem>
      </CardBody>
      
      <DistanceContainer>
        <DistanceText>{unit.distance ? `${unit.distance.toFixed(1)} km` : 'Distância não disponível'}</DistanceText>
      </DistanceContainer>
    </Card>
  );
};

const Card = styled.View`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.radius.medium}px;
  padding: ${props => props.theme.spacing.medium}px;
  margin-bottom: ${props => props.theme.spacing.medium}px;
  elevation: 2;
  shadow-color: ${props => props.theme.colors.black};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
`;

const CardHeader = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.gray};
  padding-bottom: ${props => props.theme.spacing.small}px;
  margin-bottom: ${props => props.theme.spacing.small}px;
`;

const UnitName = styled.Text`
  font-family: ${props => props.theme.fonts.bold};
  font-size: 18px;
  color: ${props => props.theme.colors.primary};
`;

const UnitType = styled.Text`
  font-family: ${props => props.theme.fonts.regular};
  font-size: 14px;
  color: ${props => props.theme.colors.darkGray};
  margin-top: 2px;
`;

const CardBody = styled.View``;

const InfoItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.small}px;
`;

const InfoText = styled.Text`
  font-family: ${props => props.theme.fonts.regular};
  font-size: 14px;
  color: ${props => props.theme.colors.darkGray};
  margin-left: ${props => props.theme.spacing.small}px;
`;

const DistanceContainer = styled.View`
  margin-top: ${props => props.theme.spacing.small}px;
  align-items: flex-end;
`;

const DistanceText = styled.Text`
  font-family: ${props => props.theme.fonts.bold};
  font-size: 14px;
  color: ${props => props.theme.colors.secondary};
`;

export default HealthUnitCard;
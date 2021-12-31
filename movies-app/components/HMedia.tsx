import React from 'react';
import styled from 'styled-components/native';
import Poster from './Poster';
import Votes from './Votes';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Movie } from '../api';

const HMovie = styled.View`
  padding: 0 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  opacity: 0.8;
  width: 80%;
`;

const Release = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 12px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 500;
  opacity: 0.6;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
`;

interface HMediaProps {
  posterPath: string;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
  fullData?: Movie;
}

const HMedia = ({ posterPath, originalTitle, overview, releaseDate, voteAverage, fullData }: HMediaProps) => {
  const navigation = useNavigation();
  const goToDetail = () => navigation.navigate('Stack', { screen: 'Detail', params: { ...fullData } });

  return (
    <TouchableOpacity onPress={goToDetail}>
      <HMovie>
        <Poster path={posterPath} />
        <HColumn>
          <Title>{originalTitle.length > 30 ? `${originalTitle.slice(0, 30)}...` : originalTitle}</Title>
          {releaseDate ? (
            <Release>
              {new Date(releaseDate).toLocaleDateString('ko', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Release>
          ) : null}
          {voteAverage ? <Votes votes={voteAverage} /> : null}
          <Overview>{overview !== '' && overview.length > 140 ? `${overview.slice(0, 140)}...` : overview}</Overview>
        </HColumn>
      </HMovie>
    </TouchableOpacity>
  );
};

export default HMedia;

import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useQuery } from 'react-query';
import { moviesApi, tvApi } from '../api';
import Loader from '../components/Loader';
import HList from '../components/HList';

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 80%;
  margin: 10px auto;
`;

const Search = () => {
  const [query, setQuery] = useState<string>('');
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery(['searchMovies', query], moviesApi.search, { enabled: false });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(['searchTv', query], tvApi.search, { enabled: false });

  const onChangeText = (text: string) => setQuery(text);

  const onSubmit = () => {
    if (query == '') {
      return;
    }
    searchMovies();
    searchTv();
  };

  const isLoading = tvLoading || moviesLoading;

  return (
    <Container>
      <SearchBar
        placeholder={'Search for Movie or TV Show'}
        placeholderTextColor={'grey'}
        returnKeyType={'search'}
        onChangeText={onChangeText}
        autoCapitalize={'none'}
        autoCorrect={false}
        onSubmitEditing={onSubmit}
      />
      {isLoading ? <Loader /> : null}
      {moviesData ? <HList title={'Movies Results'} data={moviesData.results} /> : null}
      {tvData ? <HList title={'TV Results'} data={tvData.results} /> : null}
    </Container>
  );
};

export default Search;

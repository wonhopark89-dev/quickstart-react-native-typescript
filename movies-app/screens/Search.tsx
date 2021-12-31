import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useQuery } from 'react-query';
import { moviesApi } from '../api';

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
  } = useQuery(['search', query], moviesApi.search, { enabled: false });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(['searchTv', query], moviesApi.search, { enabled: false });

  const onChangeText = (text: string) => setQuery(text);

  const onSubmit = () => {
    if (query == '') {
      return;
    }
    searchMovies();
    searchTv();
  };

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
    </Container>
  );
};

export default Search;

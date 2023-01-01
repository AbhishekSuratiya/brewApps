import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import Search from '../organisms/Search';
import MovieListItem from '../organisms/MovieListItem';
import Api from '../../api/Api';
import Constants from '../../utils/Constants';
import {useRoute} from '@react-navigation/native';
import ListSeparator from '../atoms/ListSeparator';

const MoviesScreen = props => {
  const {navigation} = props;
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const route = useRoute();

  const fetch = async params => {
    const {isReset} = params || {};
    setIsFetching(true);
    try {
      let response;
      if (route.name === 'NowPlaying') {
        response = await Api.fetchNowPlaying(isReset ? 1 : page);
      } else {
        response = await Api.fetchTopRated(isReset ? 1 : page);
      }
      const results = response.data.results;
      setMovies(prev => (isReset ? results : [...prev, ...results]));
      setPage(prev => (isReset ? 2 : prev + 1));
    } catch (e) {
      console.log(e);
    } finally {
      setIsFetching(false);
    }
  };

  const onRefresh = async () => {
    await fetch({isReset: true});
  };

  useEffect(() => {
    fetch();
  }, []);

  const renderMovieItem = ({item}) => {
    const {poster_path, original_title, overview, id} = item;
    return (
      <MovieListItem
        key={id}
        uri={Constants.PosterPath + poster_path}
        title={original_title}
        description={overview}
      />
    );
  };

  return (
    <View>
      {route.name === 'NowPlaying' && <Search />}
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        ItemSeparatorComponent={ListSeparator}
        ListHeaderComponent={ListSeparator}
        ListFooterComponent={ListSeparator}
        onEndReached={fetch}
        refreshing={isFetching}
        onRefresh={onRefresh}
        onEndReachedThreshold={1}
      />
    </View>
  );
};

export default MoviesScreen;

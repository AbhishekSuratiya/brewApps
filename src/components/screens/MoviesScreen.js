import React, {useEffect, useState} from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import Search from '../organisms/Search';
import MovieListItem from '../organisms/MovieListItem';
import Api from '../../api/Api';
import Constants from '../../utils/Constants';
import {useRoute} from '@react-navigation/native';
import ListSeparator from '../atoms/ListSeparator';
import {useSelector} from 'react-redux';

const MoviesScreen = props => {
  const {navigation} = props;
  const [movies, setMovies] = useState([]);
  const [moviesFiltered, setMoviesFiltered] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const route = useRoute();
  const query = useSelector(state => state.searchStore.query);

  useEffect(() => {
    if (!query.length) {
      setIsFetching(false);
      return;
    }
    setIsFetching(true);
    const debounce = setTimeout(() => {
      const moviesFilter = movies.filter(e =>
        e.original_title.toLowerCase().includes(query.toLowerCase()),
      );
      setMoviesFiltered(moviesFilter);
      setIsFetching(false);
    }, Constants.Debounce);
    return () => {
      clearTimeout(debounce);
    };
  }, [query]);

  const fetch = async params => {
    if (query.length > 0 && route.name === 'NowPlaying') {
      return;
    }
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
    fetch().then();
  }, []);

  const renderMovieItem = ({item}) => {
    const {poster_path, original_title, overview, id, release_date} = item;
    const onPress = () => {
      navigation.navigate('Detail', {
        title: original_title,
        description: overview,
        uri: Constants.PosterPath + poster_path,
        releaseDate: release_date,
      });
    };
    const onDelete = () => {
      if (query.length) {
        const remainingMovies = moviesFiltered.filter(e => e.id !== id);
        setMoviesFiltered(remainingMovies);
      }
      const remainingMovies = movies.filter(e => e.id !== id);
      setMovies(remainingMovies);
    };
    return (
      <MovieListItem
        key={id}
        uri={Constants.PosterPath + poster_path}
        title={original_title}
        description={overview}
        onPress={onPress}
        onDelete={onDelete}
      />
    );
  };

  const renderEmptyListItem = () => {
    return <Text style={styles.emptyText}>{'No Movies'}</Text>;
  };
  return (
    <View>
      {route.name === 'NowPlaying' && <Search />}
      <FlatList
        contentContainerStyle={styles.list}
        data={
          query.length > 0 && route.name === 'NowPlaying'
            ? moviesFiltered
            : movies
        }
        renderItem={renderMovieItem}
        ListEmptyComponent={!isFetching && renderEmptyListItem}
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

const styles = StyleSheet.create({
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  list: {
    minHeight: 200,
  },
});

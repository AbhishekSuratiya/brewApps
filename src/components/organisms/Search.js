import React, {useRef} from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../theme/Colors';
import Elevation from '../../theme/Elevation';
import SearchIcon from '../../../assets/images/svg/searchIcon';
import CrossIcon from '../../../assets/images/svg/crossIcon';
import {useDispatch, useSelector} from 'react-redux';
import {searchAction} from '../../redux/reducers/searchReducer';

const Search = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const handleInput = text => {
    dispatch(searchAction.setSearchQuery(text));
  };
  const clearQuery = () => {
    dispatch(searchAction.setSearchQuery(''));
  };
  const handleCancel = () => {
    clearQuery();
    Keyboard.dismiss();
  };
  const query = useSelector(state => state.searchStore.query);

  return (
    <View style={styles.root}>
      <View style={styles.inputWrapper}>
        <View style={styles.search}>
          <SearchIcon fill={Colors.grey} />
        </View>
        <TextInput
          ref={inputRef}
          style={styles.input}
          maxLength={30}
          onChangeText={handleInput}
          placeholder={'Search'}
          placeholderTextColor={Colors.grey}
          value={query}
        />
        <TouchableOpacity style={styles.clear} onPress={clearQuery}>
          <CrossIcon fill={Colors.grey} />
        </TouchableOpacity>
      </View>
      {query.length > 0 && (
        <TouchableOpacity onPress={handleCancel}>
          <Text style={{color: Colors.black}}>{'Cancel'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderColor: Colors.lightGrey,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 4,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    ...Elevation.style.number1,
    marginRight: 8,
  },
  search: {
    width: 30,
    padding: 8,
  },
  input: {
    fontSize: 16,
    color: Colors.black,
    flex: 1,
  },
  clear: {
    width: 30,
    padding: 8,
  },
});

import React from 'react';
import {Text, TextInput, View} from 'react-native';
import Colors from '../../theme/Colors';
import Elevation from '../../theme/Elevation';
import SearchIcon from '../../../assets/images/svg/searchIcon';
import CrossIcon from '../../../assets/images/svg/crossIcon';

const Search = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingHorizontal: 16,
        paddingBottom: 12,
        borderColor: Colors.lightGrey,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          borderRadius: 4,
          height: 30,
          flexDirection: 'row',
          alignItems: 'center',
          ...Elevation.style.number1,
          marginRight: 8,
        }}>
        <View
          style={{
            width: 30,
            padding: 8,
          }}>
          <SearchIcon fill={Colors.grey} />
        </View>
        <TextInput
          style={{
            fontSize: 16,
            color: Colors.black,
            flex: 1,
          }}
          maxLength={30}
          onChangeText={() => {}}
          placeholder={'Search'}
          placeholderTextColor={Colors.grey}
        />
        <View
          style={{
            width: 30,
            padding: 8,
          }}>
          <CrossIcon fill={Colors.grey} />
        </View>
      </View>
      <Text style={{color: Colors.grey}}>{'Cancel'}</Text>
    </View>
  );
};

export default Search;

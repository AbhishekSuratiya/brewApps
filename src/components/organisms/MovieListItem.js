import React from 'react';
import {Image, Text, View} from 'react-native';

function MovieListItem({uri, title, description}) {
  return (
    <View style={{flexDirection: 'row', paddingHorizontal: 8}}>
      <Image style={{width: 100, height: 150}} source={{uri}} />
      <View style={{flex: 1, paddingLeft: 8}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 8}}>
          {title}
        </Text>
        <Text ellipsizeMode="tail" numberOfLines={5}>
          {description}
        </Text>
      </View>
    </View>
  );
}

export default MovieListItem;

import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BackIcon from '../../../assets/images/svg/backIcon';
import Colors from '../../theme/Colors';

const DetailScreen = props => {
  const {navigation, route} = props;
  const {title, description, uri, releaseDate} = route.params;
  return (
    <View style={styles.flexible}>
      <TouchableOpacity style={styles.wrapper} onPress={navigation.goBack}>
        <BackIcon size={16} fill={Colors.grey} height="24" width="24" />
        <Text style={styles.back}>{'Back'}</Text>
      </TouchableOpacity>
      <ImageBackground
        source={{uri}}
        style={styles.flexible}
        resizeMode={'cover'}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.releaseData}>{releaseDate}</Text>
          <Text style={styles.desc}>{description}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  flexible: {flex: 1},
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  back: {
    fontSize: 20,
    marginLeft: 8,
    color: Colors.grey,
  },
  content: {
    backgroundColor: Colors.blackTransparent,
    padding: 16,
    marginTop: 'auto',
    marginHorizontal: 16,
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  releaseData: {
    color: Colors.white,
    fontSize: 16,
    marginTop: 8,
    fontWeight: 'bold',
  },
  desc: {
    color: Colors.white,
    fontSize: 16,
    marginTop: 8,
  },
});

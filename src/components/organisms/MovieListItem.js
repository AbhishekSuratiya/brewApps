import React, {useRef} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Animated,
  StyleSheet,
} from 'react-native';
import Elevation from '../../theme/Elevation';
import Colors from '../../theme/Colors';
import DeleteIcon from '../../../assets/images/svg/deleteIcon';

function MovieListItem({uri, title, description, onPress, onDelete}) {
  const moveToLeft = useRef(new Animated.Value(0)).current;

  const animate = () => {
    Animated.timing(moveToLeft, {
      toValue: -500,
      duration: 500,
      useNativeDriver: true,
    }).start(onDelete);
  };

  return (
    <Animated.View style={{transform: [{translateX: moveToLeft}]}}>
      <TouchableOpacity onPress={onPress} style={styles.root}>
        <Image style={styles.img} source={{uri}} />
        <View style={styles.titleDel}>
          <View style={styles.row}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.delIcon} onPress={animate}>
              <DeleteIcon height={20} width={20} fill={Colors.red} />
            </TouchableOpacity>
          </View>
          <Text ellipsizeMode="tail" numberOfLines={5}>
            {description}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default MovieListItem;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingTop: 4,
    paddingRight: 4,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  delIcon: {
    paddingRight: 8,
    paddingTop: 8,
  },
  titleDel: {
    flex: 1,
    paddingLeft: 8,
  },
  img: {
    width: 100,
    height: 150,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  root: {
    flexDirection: 'row',
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: Colors.cream,
    ...Elevation.style.number1,
  },
});

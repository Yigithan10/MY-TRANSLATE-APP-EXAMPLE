import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChangeLangs = props => {
  const {onPress} = props;

  const theme = useColorScheme();
  const color = theme == 'dark' ? 'white' : 'black';
  const backColor = theme == 'dark' ? 'black' : 'white';

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Ionicons style={styles.icon} name={'return-up-forward-outline'} size={25} color={color} />
      <Ionicons style={styles.icon} name={'return-down-back-outline'} size={25} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#20B2AA',
    borderRadius: 50,
    padding: 10
  },
  icon: {
  },
});

export default ChangeLangs;

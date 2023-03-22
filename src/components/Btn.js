import React from 'react';
import {StyleSheet, Text, TouchableOpacity, useColorScheme} from 'react-native';

const Btn = props => {
  const {text, onPress} = props;

  const theme = useColorScheme();
  const color = theme == 'dark' ? 'white' : 'black';
  const backColor = theme == 'dark' ? 'black' : 'white';

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, {backgroundColor: '#5F9EA0'}]}>
      <Text style={[styles.btnText, {color: color}]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '40%',
    maxWidth: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    margin: 5,
  },
  btnText: {
    fontSize: 21,
    fontWeight: '200',
    letterSpacing: 2,
  },
});

export default Btn;

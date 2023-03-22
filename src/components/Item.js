import React from 'react';
import {StyleSheet, Text, TouchableOpacity, useColorScheme} from 'react-native';

const Item = props => {
  const {item, onPress} = props;

  const theme = useColorScheme();
  const color = theme == 'dark' ? 'white' : 'black';
  const backColor = theme == 'dark' ? 'black' : 'white';

  return (
    // Flat List Item
    <TouchableOpacity style={styles.itemStyle} onPress={onPress}>
      <Text style={[styles.itemText, {color: color}]}>{item.name.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    padding: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '300',
    letterSpacing: 5,
  }
});

export default Item;

import React from 'react';
import {useColorScheme, View} from 'react-native';

const ItemSeparator = () => {
  const theme = useColorScheme();
  const color = theme == 'dark' ? 'white' : 'black';
  const backColor = theme == 'dark' ? 'black' : 'white';

  return (
    // Flat List Item Separator
    <View
      style={{
        height: 0.5,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: color,
      }}
    />
  );
};

export default ItemSeparator;

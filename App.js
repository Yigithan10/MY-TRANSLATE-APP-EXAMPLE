import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  StatusBar,
  useColorScheme,
  ScrollView,
  TouchableOpacity,
  NativeModules,
  Platform,
} from 'react-native';
import ChangeLangs from './src/components/ChangeLangs';
import {height, width} from './src/components/Dimensions';
import Item from './src/components/Item';
import ItemSeparator from './src/components/ItemSeparator';
import Btn from './src/components/Btn';
import {languages} from './src/data/Languages';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const theme = useColorScheme();
  const color = theme == 'dark' ? 'white' : 'black';
  const backColor = theme == 'dark' ? 'black' : 'white';

  const deviceLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
      : NativeModules.I18nManager.localeIdentifier;

  const [search, setSearch] = useState('');
  const [mainLangText, setMainLangText] = useState(' ');
  const [learnLangText, setLearnLangText] = useState(' ');

  const [mainLang, setMainLang] = useState('');
  const [mainLangCode, setMainLangCode] = useState('');
  const [learnLang, setLearnLang] = useState('');
  const [learnLangCode, setLearnLangCode] = useState('');

  const [selectMain, setSelectMain] = useState(false);
  const [selectLearn, setSelectLearn] = useState(false);

  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  var translate = require('react-node-google-translate');

  const getData = async () => {
    try {
      const valueMain = await AsyncStorage.getItem('langMain');
      const valueMainCode = await AsyncStorage.getItem('langMainCode');
      const valueLearn = await AsyncStorage.getItem('langLearn');
      const valueLearnCode = await AsyncStorage.getItem('langLearnCode');
      if (
        valueMain !== null &&
        valueMainCode !== null &&
        valueLearn !== null &&
        valueLearnCode !== null
      ) {
        setMainLang(valueMain);
        setMainLangCode(valueMainCode);
        setLearnLang(valueLearn);
        setLearnLangCode(valueLearnCode);
      } else {
        let code = deviceLanguage[0] + deviceLanguage[1];
        languages.find(item => {
          if (item.code === code) {
            if (item.code !== 'en') {
              setMainLang(item.name);
              setMainLangCode(item.code);

              setLearnLang('English');
              setLearnLangCode('en');

              storeData(item.name, item.code, 'English', 'en');
            } else {
              setMainLang('English');
              setMainLangCode('en');

              setLearnLang('German');
              setLearnLangCode('de');

              storeData('English', 'en', 'German', 'de');
            }
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const storeData = async (main, mainCode, learn, learnCode) => {
    try {
      await AsyncStorage.setItem('langMain', main);
      await AsyncStorage.setItem('langMainCode', mainCode);
      await AsyncStorage.setItem('langLearn', learn);
      await AsyncStorage.setItem('langLearnCode', learnCode);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
    setFilteredDataSource(languages);
    setMasterDataSource(languages);
  }, []);

  useEffect(() => {
    storeData(mainLang, mainLangCode, learnLang, learnLangCode);
  }, [mainLang, mainLangCode, learnLang, learnLangCode]);

  useEffect(() => {
    if (mainLangText.length > 2) {
      translate(
        {
          text: mainLangText,
          source: mainLangCode,
          target: learnLangCode,
        },
        function (result) {
          console.log(result);
          setLearnLangText(result);
        },
      );
    } else {
      setLearnLangText('');
    }
  }, [mainLangText]);

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const handlerMainLang = () => {
    setSelectMain(true);
  };

  const handlerLearnLang = () => {
    setSelectLearn(true);
  };

  const handlerChangeLang = () => {
    let str = mainLang;
    let strCode = mainLangCode;
    let strText = mainLangText;
    setMainLang(learnLang);
    setMainLangCode(learnLangCode);
    setMainLangText(learnLangText);
    setLearnLang(str);
    setLearnLangCode(strCode);
    setLearnLangText(strText);
  };

  const handlerItemPress = pressItem => {
    if (
      selectMain &&
      !selectLearn &&
      pressItem.name != mainLang &&
      pressItem.name != learnLang
    ) {
      console.log('pres');
      setMainLang(pressItem.name);
      setMainLangCode(pressItem.code);
      setSelectMain(false);
    } else if (
      !selectMain &&
      selectLearn &&
      pressItem.name != mainLang &&
      pressItem.name != learnLang
    ) {
      console.log('pres2');
      setLearnLang(pressItem.name);
      setLearnLangCode(pressItem.code);
      setSelectLearn(false);
    }
  };

  const handlerClose = () => {
    setSelectMain(false);
    setSelectLearn(false);
  };

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: backColor}]}>
      <StatusBar
        animated={true}
        backgroundColor={backColor}
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        // translucent={true}
      />
      <View style={styles.upContain}>
        {!selectLearn && <Btn text={mainLang} onPress={handlerMainLang} />}
        {!selectMain && !selectLearn ? (
          <ChangeLangs onPress={handlerChangeLang} />
        ) : (
          <Text></Text>
        )}
        {!selectMain && <Btn text={learnLang} onPress={handlerLearnLang} />}
      </View>
      <View
        style={{
          height: 1,
          alignSelf: 'center',
          width: '95%',
          backgroundColor: color,
        }}
      />
      <ScrollView style={styles.downContain}>
        {selectMain || selectLearn ? (
          <View>
            <View style={styles.textInputContain}>
              <TextInput
                style={[styles.textInputStyle, {borderColor: color}]}
                onChangeText={text => searchFilterFunction(text)}
                value={search}
                placeholderTextColor={color}
                color={color}
                placeholder="Search Here"
              />
              <TouchableOpacity onPress={handlerClose}>
                <Ionicons
                  style={styles.icon}
                  name={'close-outline'}
                  size={30}
                  color={color}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={filteredDataSource}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={<ItemSeparator />}
              renderItem={({item}) => (
                <Item item={item} onPress={() => handlerItemPress(item)} />
              )}
            />
          </View>
        ) : (
          <View style={styles.rowInput}>
            <TextInput
              editable
              multiline
              numberOfLines={10}
              maxLength={100}
              onChangeText={text => setMainLangText(text)}
              value={mainLangText}
              style={[styles.input, {borderColor: color, color: color}]}
            />
            <TextInput
              editable={false}
              multiline
              numberOfLines={10}
              maxLength={100}
              value={learnLangText}
              style={[styles.input, {borderColor: color, color: color}]}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upContain: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: 'red',
    padding: 15,
  },
  downContain: {
    width: width,
  },
  icon: {
    margin: 5,
    paddingRight: 10,
  },
  textInputContain: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },
  textInputStyle: {
    width: '85%',
    borderWidth: 1,
    borderRadius: 25,
    height: 50,
    padding: 5,
    paddingLeft: 10,
    margin: 4,
  },
  rowInput: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    width: '45%',
    height: height * 0.4,
    borderWidth: 0.5,
    borderRadius: 20,
    padding: 10,
    paddingLeft: 7,
    margin: 10,
    textAlignVertical: 'top',
  },
});

export default App;

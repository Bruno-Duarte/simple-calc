/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  TextInput,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const App: () => React$Node = () => {

  const [exp, setExp] = React.useState('');
  const [history, setHistory] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    const fetchStoragedData = async () => {
      const response = await getData();
      if (response) {
        setHistory(response);
        setIsLoaded(true);
      }
    }
    fetchStoragedData();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      storeData(history);
      console.log(history);
    }
  }, [history]);
  
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <TextInput style={styles.input} showSoftInputOnFocus={false} value={exp} />
        </View>
        <View style={styles.body}>
          <View style={styles.row}>
            <Item value='7' func={() => {
              console.log('Você clicou no 7');
              const newExp = exp + '7';
              setExp(newExp);
            }} />
            <Item value='8' func={() => {
              const newExp = exp + '8';
              setExp(newExp);
            }} />
            <Item value='9' func={() => {
              const newExp = exp + '9';
              setExp(newExp);
            }} />
            <Item value='+' func={() => {
              const newExp = exp + '+';
              setExp(newExp);
            }} />
          </View>
          <View style={styles.row}>
            <Item value='4' func={() => {
              const newExp = exp + '4';
              setExp(newExp);
            }} />
            <Item value='5' func={() => {
              const newExp = exp + '5';
              setExp(newExp);
            }} />
            <Item value='6' func={() => {
              const newExp = exp + '6';
              setExp(newExp);
            }} />
            <Item value='-' func={() => {
              const newExp = exp + '-';
              setExp(newExp);
            }} />
          </View>
          <View style={styles.row}>
            <Item value='1' func={() => {
              const newExp = exp + '1';
              setExp(newExp);
            }} />
            <Item value='2' func={() => {
              const newExp = exp + '2';
              setExp(newExp);
            }} />
            <Item value='3' func={() => {
              const newExp = exp + '3';
              setExp(newExp);
            }} />
            <Item value='*' func={() => {
              const newExp = exp + '*';
              setExp(newExp);
            }} />
          </View>
          <View style={styles.row}>
            <Item value='C' func={() => {
              const newHistory = [...history];
              newHistory.push(exp);
              setHistory(newHistory);
              setExp('');
            }} />
            <Item value='0' func={() => {
              const newExp = exp + '0';
              setExp(newExp);
            }} />
            <Item value='=' func={() => {
              
            }} />
            <Item value='/' func={() => {
              const newExp = exp + '/';
              setExp(newExp);
            }} />
          </View>
        </View>
      </View>
    </>
  );
};

const Item = (props) => {
  return (
    <View style={styles.buttonWrap}>
      <TouchableHighlight onPress={props.func}>
        <View style={styles.button}>
          <Text style={styles.key}>{props.value}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const storeData = async (value) => {
  console.log('aa')
  try {
    value = JSON.stringify(value);
    await AsyncStorage.setItem('@storage_Key', value)
  } catch (e) {
    // saving error
  }
}

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: App
  }
});

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  header: {
    flex: 1,
    padding: 8,
  },
  body: {
    flex: 4,
    paddingBottom: 50,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    height: 100,
    width: "100%",
    borderWidth: 1,
    fontSize: 40
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    borderWidth: 1,
    width: 90,
  },
  buttonWrap: {
    padding: 5,
  },
  key: {
    fontSize: 60,
  }
});


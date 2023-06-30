import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomBar from './components/bottom-bar';
import SearchView from './views/SearchView';
import ListView from './views/ListView';
import { useState } from 'react';
import { VIEW_NAME } from './constants';
import Constants from 'expo-constants';
import React from 'react';

export default function App() {
    const [currentView, setCurrentView] = useState(VIEW_NAME.LIST)
    return (
      <View style={styles.container}>
        {currentView === VIEW_NAME.LIST && <ListView />}
        {currentView === VIEW_NAME.SEARCH && <SearchView />}
        <BottomBar selectView={setCurrentView} currentView={currentView}/>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: Constants.statusBarHeight
    }
});

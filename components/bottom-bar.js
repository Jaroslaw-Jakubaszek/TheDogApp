import React from 'react'
import {View, Text,  StyleSheet, TouchableOpacity} from 'react-native'
import {FontAwesome5, FontAwesome} from '@expo/vector-icons'
import { VIEW_NAME } from '../constants';

const colorWhenSelected = '#492f24';
const colorWhenNonSelected = '#e1c9bf';

const BottomBar = (props) => {
    return (
        <View style={styles.container}>
        <BottomBarIcon viewName={VIEW_NAME.SEARCH} iconName='search' {...props}/>
        <BottomBarIcon viewName={VIEW_NAME.LIST} iconName='list' {...props}/>
    </View>
    );
};

const BottomBarIcon = ({viewName, iconName, selectView, currentView}) =>{
    return (
    <TouchableOpacity onPress={()=>{
        selectView(viewName)
    }}>
        <FontAwesome5 name={iconName} size={27} color={currentView === viewName ? colorWhenSelected : colorWhenNonSelected} />
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 15,
        backgroundColor: "white",
        
        elevation:9
    },
});
export default BottomBar;
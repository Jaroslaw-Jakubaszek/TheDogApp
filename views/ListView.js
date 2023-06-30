import React, { useState, useEffect }from "react";
import { Center, Box, View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator} from "react-native";
import { setSyntheticLeadingComments } from "typescript";


const dogURL = "https://dog.ceo/api/breeds/list/all";

const ListView = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
        fetchData();
    }, []);
  
    const fetchData = async () => {
        setIsLoading(true);
        const response = await fetch(dogURL);
        const jsonData = await response.json();
  
        const breeds = Object.keys(jsonData.message);
        const paginatedData = breeds.slice((page - 1) * 10, page * 10);
  
        setData([...data, ...paginatedData]);
        setIsLoading(false);
    };
  
    const renderFooter = () => {
        if (isLoading) {
            return (
            <View style={styles.footer}>
                <ActivityIndicator size="large" color="#e1c9bf" />
            </View>
            );
        }
        return null;
    };
  
    const handleLoadMore = () => {
        if (!isLoading) {
            setPage(page + 1);
            fetchData();
        }
    };
  
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Lista ras</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{ padding: 20 }}>
                        <Text>{item}</Text>
                    </View>
                )}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                ListFooterComponent={renderFooter}
            />
        </SafeAreaView>
    );
};
    
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignSelf: 'center', 
        width: 350
    },
    footer: {
        paddingVertical: 20
    },
    text: {
        color: '#492f24',
        fontSize: 30,
        fontFamily: "Bodoni 72 Oldstyle",
        fontWeight: "500",
        alignSelf: "center",
        padding: 15
    }
});

export default  ListView;
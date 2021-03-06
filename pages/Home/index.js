import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemEvento from '../../components/itemEvento';


const Home = () => {

    const [token, setToken] = useState('');
    const [eventos, setEventos] = useState([]);

    // const getToken = async () => {
    //     setToken(await AsyncStorage.getItem('@jwt'));
    // }

    
    // useEffect(()=>{
    //     getToken();

    // }, [])

    useEffect(() => {
        listarEventos();
    }, []); 

    const listarEventos = () => {
        fetch('http://192.168.3.55:5000/api/eventos')
            .then(response => response.json())
            .then(data => {
                setEventos(data.data)
                console.log(data.data);
            })
            .catch(err => console.error(err));
    }

    const renderItem = ({ item }) => (
        <ItemEvento nome={item.nome} imagem={item.urlImagem} link={item.link} />
      );

    return(
        <View>
            <Text>HOME</Text>
            {/* <Text>{token}</Text> */}
            <FlatList
                data={eventos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default Home;
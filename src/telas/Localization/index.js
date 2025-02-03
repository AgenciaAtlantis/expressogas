import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Dimensions, PermissionsAndroid, SafeAreaView, StatusBar, ScrollView, Image } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios'
import style from './styles'
import Menu from '../Menu'
import Header from '../Header'

export default function Localization({ route: { params }, navigation }) {
    const { width, height } = Dimensions.get('screen')
    const [region, setRegion] = useState(null)
    const baseUrl = 'https://api.clubedorevendedordegas.com.br/'
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);

    const { driver_id } = params

    console.log(driver_id);
    useEffect(() => {
        getMyLocation()
    }, [])

    function getMyLocation() {
        Geolocation.getCurrentPosition(info => {
            setRegion({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            })
        },
            () => {
                console.log("deu erro!")
            },
            {
                enableHighAccuracy: true,
                timeout: 2000

            })
    }

    axios
        .get(baseUrl + 'Localizacao/1' + reseller)
        .then(response => {
            setLat(Number(response.data.latitude))
            setLon(Number(response.data.longitude))
        })
        .catch(err => {

        })

    const MINUTE_MS = 3000;
    const reseller = 'expresso_gas_';  
    useEffect(() => {
        const interval = setInterval(() => {
            Geolocation.getCurrentPosition(info => {
                // axios
                //     .put(baseUrl + 'AtualizarLocalizacao', { driver_id: 1, latitude: info.coords.latitude, longitude: info.coords.longitude })
                //     .then(response => {
                //         console.log(response)
                //     })
                //     .catch(err => {
                //         axios
                //             .post(baseUrl + 'CadastrarLocalizacao', { driver_id: 1, latitude: info.coords.latitude, longitude: info.coords.longitude })
                //             .then(response => {
                //                 console.log('cadastro feito')
                //             })
                //             .catch(err => {
                //                 console.log(err)
                //             })
                //     })

                axios
                    .get(baseUrl + 'Localizacao/' + Number(driver_id) + "/" + reseller)
                    .then(response => {
                        setLat(Number(response.data.latitude))
                        setLon(Number(response.data.longitude))
                    })
                    .catch(err => {

                    })


            })
        }, MINUTE_MS);

        return () => clearInterval(interval);
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar />
            <Header navigation={navigation} />
            <View style={styles.container}>
                <MapView
                    onMapReady={() => {
                        Platform.OS === 'android' ?
                            PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                                .then(() => {
                                    console.log('USUÁRIO ACEITOU')
                                })

                            : ''
                    }}
                    style={{ width: width, height: height }}
                    region={region}
                    zoomEnabled={true}
                    minZoomLevel={17}
                    showsUserLocation={true}
                    loadingEnabled={true}
                >
                    <Marker
                        coordinate={{
                            latitude: lat,
                            longitude: lon
                        }}
                    >
                        {/* <Image
                            style={styles.tinyLogo}
                            source={require('../../../assets/caminhao.png')}
                        /> */}
                    </Marker>
                </MapView>
            </View>
            <Menu navigation={navigation} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    tinyLogo: {
        width: 30,
        height: 30,
        transform: [{ rotate: "-30deg" }]
    }
})
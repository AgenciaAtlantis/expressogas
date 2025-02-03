import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from '../../store/ducks/cart';
import { addExpress } from '../../store/ducks/expressCart';

import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  StatusBar,
  Pressable,
  FlatList,
  Button,
  TouchableOpacity
} from 'react-native'

//import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage'

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faBars,
  faCirclePlus,
  faCircleMinus
} from '@fortawesome/free-solid-svg-icons'

//React native shadow 2
import { Shadow } from 'react-native-shadow-2'

import express from '../../../assets/express.png'

import style from './styles'

import Menu from './../Menu'
import Header from './../Header'
import { cleanProducts, addProducts } from '../../store/ducks/products'

export default function Home(navigation) {
  navigation = navigation.navigation
  const cart = useSelector((state) => state.cart)

  const dispatch = useDispatch();
  const baseUrl = 'https://api.clubedorevendedordegas.com.br/'

  const [data, setData] = useState([])
  const dataArray = []

  const [total, setTotal] = useState(0)
  const [totalExpress, setTotalExpress] = useState(0)

  const [warning, setWarning] = useState()
  const [loading, setLoading] = useState(false)

  const [qnt, setQnt] = useState({ list: [] })
  const amounts = { list: [] }
  //const amounts = new Map()

  const [primaryColor, setPrimaryColor] = useState('#db2800')
  const [secundaryColor, setSecundaryColor] = useState('#cda900')
  const reseller = 'expresso_gas_'; 

  // useEffect(() => {
  //   // const unsubscribe = navigation.addListener('focus', () => {
  //   axios
  //     .get('https://api.clubedorevendedordegas.com.br/TodosUsuariosRevenda')
  //     .then(response => {
  //       response.data.map(key => {
  //         if (key.db_name == reseller) {
  //           if (key.type_reseller == 'Ultragaz') {
  //             setPrimaryColor('#000fff');
  //             setSecundaryColor('#00ff00');
  //           } else if (key.type_reseller == 'Liquigás') {
  //             setPrimaryColor('#02714e');
  //             setSecundaryColor('#f48835');
  //           } else if (key.type_reseller == 'Copagaz') {
  //             setPrimaryColor('#02714e');
  //             setSecundaryColor('#f48835');
  //           } else if (key.type_reseller == 'Supergasbras') {
  //             setPrimaryColor('#016ca0');
  //             setSecundaryColor('#ffbe00');
  //           } else if (key.type_reseller == 'Nacional Gás') {
  //             setPrimaryColor('#eb4034');
  //             setSecundaryColor('#545454');
  //           } else if (key.type_reseller == 'Consigaz') {
  //             setPrimaryColor('#153170');
  //             setSecundaryColor('#da251c');
  //           } else if (key.type_reseller == 'NGC') {
  //             setPrimaryColor('#eb4034');
  //             setSecundaryColor('#545454');
  //           } else if (key.type_reseller == 'Servigás') {
  //             setPrimaryColor('#4da291');
  //             setSecundaryColor('#ee8e59');
  //           } else if (key.type_reseller == 'Independente') {
  //             setPrimaryColor('#016ca0');
  //             setSecundaryColor('#bdbdbd');
  //           }
  //         }
  //       })
  //     })
  //   // })

  //   // return unsubscribe
  // }, [])

  async function readData() {
    try {
      const id = await AsyncStorage.getItem('@user_input')
      if (id !== null) {
        global.clientId = id
      }
    } catch (e) {
      console.log('Failed to fetch the input from storage: ', e)
    }
  }

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTotal(global.Shops.length)
      loadListExpress()
    })

    return unsubscribe
  }, [navigation])

  useEffect(() => {
    readData()
    loadProds()
    global.Shops = []
    global.products = []
  }, [])

  async function loadListExpress() {
    setTotalExpress(0)
    let count = 0
    if (global.clientId) {
      await axios
        .get(baseUrl + 'TodosListaExpress/' + reseller)
        .then(response => {
          //Sucesso
          response.data.map((item, i) => {
            if (item.client_id == global.clientId) {
              count++
              setTotalExpress(count)
            }
          })
        })
        .catch(err => {
          setWarning('ops! ocorreu um erro' + err)
        })
    }
  }

  async function loadProds() {
    if (loading) return

    setLoading(true)

    await axios
      .get(baseUrl + 'TodosProdutos/' + reseller)
      .then(response => {
        for (c = 0; c < response.data.length; c++) {
          if (response.data[c].whatsapp == '1') {
            amounts.list.push({ name: 1 })
            var dateNowFormat = new Date();
            var dateNowTime = dateNowFormat.getTime();
            var dateNow = new Date(dateNowTime);
            let promotional_value = null;
            if (response.data[c].promotional_date_end !== null) {

              var datePromocional = new Date(Number(response.data[c].promotional_date_end));
              var dayPromocional = datePromocional.getUTCDate();
              var monthPromocional = datePromocional.getMonth() + 1;

              var dayNow = dateNow.getUTCDate();
              var monthNow = dateNow.getMonth() + 1;
              if (monthNow == monthPromocional) {
                if (dayNow <= dayPromocional) {
                  promotional_value = parseFloat(response.data[c].promotional_value.replace('R$', '').replace('.', '').replace(',', '.'))
                } else {
                  promotional_value = null
                }
              } else {
                promotional_value = null
              }
            }

            dataArray.push({
              id: response.data[c].id,
              name: response.data[c].name,
              value: parseFloat(response.data[c].value.replace('R$', '').replace('.', '').replace(',', '.')),
              promotional_value: promotional_value,
              promotional_date: response.data[c].promotional_date_end,
              description: response.data[c].description,
              qnt: c,
              imagem: response.data[c].imagem
            })
          }
        }
        setQnt({ list: amounts.list })
        setData(dataArray)
        loadListExpress()

      })
      .catch(err => {
        console.log('ops! ocorreu um erro' + err)
      })
  }

  async function pushItemExpress(product_id, name, qnt) {
    let productExist = false

    axios.get(baseUrl + 'TodosListaExpress/' + reseller).then(response => {
      response.data.map((item, i) => {
        if (
          item.client_id == global.clientId &&
          item.product_id == product_id
        ) {
          productExist = item.id
        }
      })
    })

    setTimeout(() => {
      if (global.clientId && productExist) {
        axios
          .put(baseUrl + 'AtualizarListaExpress', {
            id: productExist,
            quant: qnt,
            db: reseller
          })
          .then(response => {
            if (response.status == '200') {
              setWarning(`${qnt} ${name} adicionado na lista Express!`)
              setTimeout(() => setWarning(''), 3000)
              loadListExpress()
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else if (global.clientId) {
        axios
          .post(baseUrl + 'CadastrarListaExpress', {
            client_id: global.clientId,
            product_id: product_id,
            quant: qnt,
            db: reseller
          })
          .then(response => {
            if (response.status == '200') {
              setWarning(`${qnt} ${name} adicionado na lista Express!`)
              setTimeout(() => setWarning(''), 3000)
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        navigation.navigate('Login', 'Home')
      }
    }, 150)
  }

  renderItem = ({ item }) => {
    if (item.name !== undefined) {
      return (
        <Shadow
          distance={5}
          startColor={'#00000010'}
          radius={10}
          containerViewStyle={style.conteiner_card}
          viewStyle={{ alignSelf: 'stretch' }}
        >
          <View style={style.card}>
            <Image source={{ uri: item.imagem }} style={style.product_img} />
            <View>
              <View style={style.conteiner}>
                <Text style={style.product_name}> {item.name} </Text>
                <TouchableOpacity
                  onPress={() => {
                    pushItemExpress(item.id, item.name, qnt.list[item.qnt].name)
                  }}
                >
                  {/* <Image source={express} style={style.icon_cart} /> */}
                </TouchableOpacity>
              </View>
              <Text style={style.sub_text}> {item.description} </Text>
              {
                (item.promotional_value !== null) ?
                  (
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Text style={style.price_text_promotional}>{item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </Text>
                      <Text style={style.price_text_promotional_value}>{item.promotional_value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </Text>
                    </View>
                  ) : (
                    <Text style={[style.price_text, { color: primaryColor }]}>{item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </Text>
                  )}
              <View style={style.conteiner_btn}>
                <View style={style.conteiner}>
                  <TouchableOpacity
                    onPress={() => {
                      let array = qnt.list
                      if (array[item.qnt].name > 1) {
                        array[item.qnt].name = array[item.qnt].name - 1
                      }
                      setQnt({ list: array })
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCircleMinus}
                      size={26}
                      style={[style.product_btn, { color: primaryColor }]}
                    />
                  </TouchableOpacity>
                  <Text style={{ paddingHorizontal: 5 }}>
                    {' '}
                    {qnt.list[item.qnt] == undefined ? 1 : qnt.list[item.qnt].name}{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      let array = qnt.list
                      array[item.qnt].name = array[item.qnt].name + 1
                      setQnt({ list: array })
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      size={26}
                      style={[style.product_btn, { color: primaryColor }]}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={[style.btn_card, { backgroundColor: secundaryColor }]}
                  onPress={() => {
                    for (let i = 1; i <= qnt.list[item.qnt].name; i++) {
                      dispatch(addItem(item))
                    }
                    dispatch(addProducts({ id: item.id, product: `${qnt.list[item.qnt].name}x ${item.name}` }))
                    // global.products.push(`${qnt.list[item.qnt].name}x ${item.name}`)

                    // setTotal(global.Shops.length)
                    // dispatch(addItem(item))
                    setWarning(
                      `${qnt.list[item.qnt].name} ${item.name
                      } Adicionado ao carrinho`
                    )
                    setTimeout(() => setWarning(''), 3000)
                    navigation.navigate('Carrinho')
                  }}
                >
                  <Text style={{ color: '#fff' }}>Comprar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Shadow >
      )
    }

  }

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        <Header navigation={navigation} />
        <View style={warning ? style.conteiner_warning : { display: 'none' }}>
          <Text style={style.text_warning}>{warning}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        <Menu navigation={navigation} />
      </SafeAreaView>
    </>
  )
}

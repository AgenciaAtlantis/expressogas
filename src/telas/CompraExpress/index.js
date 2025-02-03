import React, { Component, useState, useEffect } from 'react'

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
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

//React native shadow 2
import { Shadow } from 'react-native-shadow-2'

import express from '../../../assets/express.png'


import style from './styles'
import Menu from '../Menu'
import Header from '../Header'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, cleanCart } from '../../store/ducks/cart';

export default function CompraExpress({ navigation }) {
  const cartItem = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const baseUrl = 'https://api.clubedorevendedordegas.com.br/'
  const data = []
  const [dataList, setData] = useState([])
  const [count, setCount] = useState(0)
  const [value, setValue] = useState(0)
  const [warning, setWarning] = useState()
  const [loading, setLoading] = useState(true)
  const [primaryColor, setPrimaryColor] = useState('#db2800')
  const [secundaryColor, setSecundaryColor] = useState('#cda900')
  const axios = require('axios').default
  /*
  useFocusEffect(
    React.useCallback(() => {
      if (global.clientId) {
        console.log('Logado')
        loadListExpress()
      }
    })
  )*/

  // React.useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     axios
  //       .get('https://api.clubedorevendedordegas.com.br/TodosUsuariosRevenda')
  //       .then(response => {
  //         response.data.map(key => {
  //           if (key.db_name == reseller) {
  //             if (key.type_reseller == 'Ultragaz') {
  //               setPrimaryColor('#000fff');
  //               setSecundaryColor('#00ff00');
  //             } else if (key.type_reseller == 'Liquigás') {
  //               setPrimaryColor('#02714e');
  //               setSecundaryColor('#f48835');
  //             } else if (key.type_reseller == 'Copagaz') {
  //               setPrimaryColor('#02714e');
  //               setSecundaryColor('#f48835');
  //             } else if (key.type_reseller == 'Supergasbras') {
  //               setPrimaryColor('#f62d01');
  //               setSecundaryColor('#ffbe00');
  //             } else if (key.type_reseller == 'Nacional Gás') {
  //               setPrimaryColor('#eb4034');
  //               setSecundaryColor('#545454');
  //             } else if (key.type_reseller == 'Consigaz') {
  //               setPrimaryColor('#153170');
  //               setSecundaryColor('#da251c');
  //             } else if (key.type_reseller == 'NGC') {
  //               setPrimaryColor('#eb4034');
  //               setSecundaryColor('#545454');
  //             } else if (key.type_reseller == 'Servigás') {
  //               setPrimaryColor('#4da291');
  //               setSecundaryColor('#ee8e59');
  //             } else if (key.type_reseller == 'Independente') {
  //               setPrimaryColor('#016ca0');
  //               setSecundaryColor('#bdbdbd');
  //             }
  //           }
  //         })
  //       })
  //   })

  //   return unsubscribe
  // }, [navigation])

  // React.useEffect(() => {
  //   // const unsubscribe = navigation.addListener('focus', () => {
  //     axios
  //       .get('https://api.clubedorevendedordegas.com.br/TodosUsuariosRevenda')
  //       .then(response => {
  //         response.data.map(key => {
  //           if (key.db_name == reseller) {
  //             if (key.type_reseller == 'Ultragaz') {
  //               setPrimaryColor('#000fff');
  //               setSecundaryColor('#00ff00');
  //             } else if (key.type_reseller == 'Liquigás') {
  //               setPrimaryColor('#02714e');
  //               setSecundaryColor('#f48835');
  //             } else if (key.type_reseller == 'Copagaz') {
  //               setPrimaryColor('#02714e');
  //               setSecundaryColor('#f48835');
  //             } else if (key.type_reseller == 'Supergasbras') {
  //               setPrimaryColor('#f62d01');
  //               setSecundaryColor('#ffbe00');
  //             } else if (key.type_reseller == 'Nacional Gás') {
  //               setPrimaryColor('#eb4034');
  //               setSecundaryColor('#545454');
  //             } else if (key.type_reseller == 'Consigaz') {
  //               setPrimaryColor('#153170');
  //               setSecundaryColor('#da251c');
  //             } else if (key.type_reseller == 'NGC') {
  //               setPrimaryColor('#eb4034');
  //               setSecundaryColor('#545454');
  //             } else if (key.type_reseller == 'Servigás') {
  //               setPrimaryColor('#4da291');
  //               setSecundaryColor('#ee8e59');
  //             } else if (key.type_reseller == 'Independente') {
  //               setPrimaryColor('#016ca0');
  //               setSecundaryColor('#bdbdbd');
  //             }
  //           }
  //         })
  //       })
  //   // })

  //   // return unsubscribe
  // }, [])

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadListExpress()
    })

    return unsubscribe
  }, [navigation])
  /*
  useEffect(() => {
    loadListExpress()
  }, [])*/

  async function loadListExpress() {
    setData([])
    data.length = 0
    if (global.clientId) {
      setLoading(false)
      await axios
        .get(baseUrl + 'TodosListaExpress/' + reseller)
        .then(response => {
          //Sucesso
          if (response.data.length == 1) {
            if (response.data[0].client_id == global.clientId) {
              getProduct(response.data[0].product_id, response.data[0].id, response.data[0].quant)
            } else {
              setData([]);
            }
          } else {
            // response.data.map(item => {
            for (var i = 0; i < response.data.length; i++) {
              let item = response.data[i];
              console.log(item)
              if (item.client_id == global.clientId) {
                getProduct(item.product_id, item.id, item.quant)
              } else {
                setData([]);
              }
            }
            // })
          }
        })
        .catch(err => {
          // setWarning('ops! ocorreu um erro' + err)
        })
      setTimeout(() => {
        setLoading(true)
      }, 500)
    } else {
      setLoading(true)
    }
  }
  const reseller = 'expresso_gas_';  
  async function getProduct(id, idExpress, qnt) {
    await axios
      .get(baseUrl + 'Produto/' + id + reseller)
      .then(response => {
        data.push({
          id: response.data.id,
          name: response.data.name,
          category_id: response.data.category_id,
          value: response.data.value,
          description: response.data.description,
          stock: response.data.stock,
          imagem: response.data.imagem,
          express_id: idExpress,
          qnt: qnt
        })
        let v = 0
        setData(data)

        for (let c = 0; c < data.length; c++) {
          var value = data[c].value.split(',');
          if (value.length > 1) {
            var formatValue = Number(value[0] + '.' + value[1]);
            v += formatValue * data[c].qnt
          } else {
            var formatValue = Number(value[0]);
            v += formatValue * data[c].qnt
          }

          if (c + 1 == data.length) {
            setValue(v)
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  async function deleteItem(id) {
    await axios
      .delete(baseUrl + 'DeletarListaExpress/' + id + reseller)
      .then(response => {
        loadListExpress()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const componentCarrinho = param => {
    if (param == 'header') {
      return (
        <View style={style.conteiner_title}>
          <Text style={style.title}>Minha Lista Express</Text>
          <Image source={express} style={style.icon_cart} />
        </View>
      )
    } else {
      if (global.clientId) {
        if (dataList.length == 0) {
          return (
            <>
              <View style={style.conteiner_title}>
                <Text style={style.title}>
                  Lista Express vazia, adicione seu primeiro item
                </Text>
              </View>
              <TouchableOpacity
                style={style.login_btn}
                onPress={() => {
                  navigation.navigate('Home')
                }}
              >
                <Text style={style.text_sub_login2}>
                  Ir para lista de produtos
                </Text>
              </TouchableOpacity>
            </>
          )
        }

        return (
          <View>
            {row()}
            <View style={style.conteiner_total}>
              <Text style={style.product_total}>Total do pedido </Text>
              <Text style={style.price_total}>R$ {value.toFixed(2).replace(".", ",")}</Text>
            </View>
            {row()}
            <View style={{ alignItems: 'center' }}>
              <Text style={style.title}>{warning}</Text>
            </View>
            <TouchableOpacity
              style={style.buy_btn}
              onPress={() => {
                if (value == 0) {
                  setWarning('Carrinho vazio')
                } else {
                  /* vamos colocar global.products aqui */
                  let products = []
                  dataList.map((item, i) => {
                    dispatch(cleanCart())
                    dispatch(addItem({
                      id: item.id,
                      name: item.name,
                      category_id: item.category_id,
                      value: item.value,
                      description: item.description,
                      stock: item.stock,
                      imagem: item.imagem,
                      express_id: item.express_id,
                      qnt: item.qnt
                    }))
                    products.push(`${item.qnt}x ${item.name}`)
                    if (i + 1 == dataList.length)
                      global.products = products
                  })

                  navigation.navigate('Pedido')
                }
              }}
            >
              <Text style={{ color: '#fff' }}> Fechar pedido</Text>
            </TouchableOpacity>
          </View>
        )
      } else {
        return (
          <>
            <View style={style.conteiner_title}>
              <Text style={style.title}>
                Primeiro entre com seu login para ver sua Lista Express
              </Text>
            </View>
            <TouchableOpacity
              style={[style.login_btn, { backgroundColor: secundaryColor }]}
              onPress={() => {
                navigation.navigate('Login', 'CompraExpress')
              }}
            >
              <Text style={style.text_sub_login2}> Entrar </Text>
            </TouchableOpacity>
          </>
        )
      }
    }
  }

  renderItem = ({ item, i }) => {
    var value = item.value.split(',');
    let formatValue = 0;
    if (value.length > 1) {
      formatValue = Number(value[0] + '.' + value[1]);
    } else {
      formatValue = Number(value[0]);
    }
    return (
      <Shadow
        distance={0.8}
        startColor={'#00000010'}
        radius={10}
        containerViewStyle={style.conteiner_card}
        viewStyle={{ alignSelf: 'stretch' }}
      >
        <View style={style.card}>
          <View style={{ with: '25%' }}>
            <Image source={{ uri: item.imagem }} style={style.product_img} />
          </View>
          <View style={{ with: '65%' }}>
            <View style={style.conteiner_product}>
              <Text style={style.product_name}>{item.qnt}x {item.name}</Text>
            </View>
            <Text style={style.sub_text}> {item.description} </Text>
            <Text style={style.price_text}> R$ {(formatValue * item.qnt).toFixed(2).replace(".", ",")} </Text>
          </View>
          <View style={{ with: '10%' }}>
            <TouchableOpacity
              onPress={() => {
                deleteItem(item.express_id);
                setTimeout(() => { navigation.navigate('Home') }, 100)
              }}
            >
              <Text style={style.cancel_btn}> X </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Shadow>
    )
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        <Header navigation={navigation} />
        <View style={{ flex: 1 }}>
          <FlatList
            data={dataList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListHeaderComponent={componentCarrinho('header')}
            ListFooterComponent={componentCarrinho('footer')}
            style={loading ? {} : { display: 'none' }}
          />
          <View
            style={
              loading
                ? { display: 'none' }
                : {
                  flex: 1,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  padding: 10
                }
            }
          >
            <ActivityIndicator size='large' color='#000' />
          </View>
        </View>
        <Menu navigation={navigation} />
      </SafeAreaView>
    </>
  )
}

function row() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 15
      }}
    >
      <View style={{ flex: 1, height: 1, backgroundColor: 'grey' }} />
    </View>
  )
}

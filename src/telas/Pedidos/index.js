import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'

import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity
} from 'react-native'

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars, faLocationDot } from '@fortawesome/free-solid-svg-icons'

//React native shadow 2
import { Shadow } from 'react-native-shadow-2'

import style from './styles'
import Menu from '../Menu'
import Header from '../Header'

export default function Pedidos({ navigation }) {
  const baseUrl = 'https://api.clubedorevendedordegas.com.br/'

  const [data, setData] = useState([])
  const dataArray = []

  const [prod, setProd] = useState([])
  const prods = []

  const [refresh, setRefresh] = useState(false)
  reseller = 'central_gas';
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setData([])
      setProd([])
      loadProds()
    })

    return unsubscribe
  }, [navigation])

  async function loadProds() {
    setRefresh(true)
    dataArray.length = 0
    prods.length = 0
    await axios
      .post(baseUrl + 'PedidoCliente', {
        client_id: global.clientId,
        db: reseller
      })
      .then(response => {
        response.data.reverse().map((item, i) => {
          if (i > 9) return
          if (item.client_id == global.clientId) {
            let array = item.product_id.split(',')
            prods.length = 0
            let text = ''

            array.map((id, i) => {
              prods.length = 0
              axios
                .get(baseUrl + 'Produto/' + id + "/" + reseller)
                .then(response => {
                  prods.push(response.data)
                  setProd(prods)

                  text = ''

                  if (i + 1 == array.length) {
                    dataArray.push({
                      id: item.id,
                      value: item.total,
                      status: item.status,
                      date: item.order_date,
                      name: item.quick_client.split('/')[0],
                      address: item.quick_client.split('/')[1],
                      products: item.products
                    })
                    setData(dataArray)
                  }
                })
                .catch(err => {
                  console.log('ops! erro ' + err)
                })
            })
          }
        })
      })
      .catch(err => {
        console.log('ops! erro pedidos ' + err)
      })
    setRefresh(false)
  }

  function productsExist(array, id) {
    for (c = 0; c < array.length; c++) {
      if (array[c].id == id) return true
    }
  }

  function getOrdered(id) {
    var driver_id = '';
    axios
      .get(baseUrl + 'Pedido/' + id + "/" + reseller)
      .then(response => {
        driver_id = response.data.driver_id
      })

    return driver_id

  }


  renderItem = ({ item }) => (
    <Shadow
      distance={0.5}
      startColor={'#00000010'}
      radius={20}
      containerViewStyle={style.conteiner_card}
      viewStyle={{ alignSelf: 'stretch' }}
    >
      <View
        style={
          item.status == 'Entregue' ||
            item.status == 'Cancelado' ||
            item.status == 'Finalizado'
            ? [{ backgroundColor: '#CDDEEE' }, style.card]
            : [
              { padding: 15, borderColor: '#f62d01', borderWidth: 0.5 },
              style.card
            ]
        }
      >
        <View style={{ width: '100%' }}>
          <View style={[style.conteiner, { width: '100%' }]}>
            <Text style={style.price_text}>
              {' '}
              #{item.id} -{' '}
              <Text
                style={
                  item.status == 'Entregue' ||
                    item.status == 'Cancelado' ||
                    item.status == 'Finalizado'
                    ? style.text_status
                    : style.price_text
                }
              >
                {' '}
                {item.status ? item.status : 'Enviado'}{' '}
              </Text>
            </Text>
            <Text style={[style.text_sub, { marginLeft: 15, fontSize: 12 }]}>
              {' '}
              {item.date}{' '}
            </Text>
          </View>

          <Text style={style.title2}>{item.name}</Text>

          <View
            style={
              item.status == 'Á caminho'
                ? style.conteiner_dados
                : { display: 'none' }
            }
          >
            <View style={style.row}>
              <View style={style.conteiner_icon}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={style.icon_local}
                  size={16}
                />
              </View>

              <View>
                <Text style={style.sub_text}>{item.address}</Text>
              </View>
            </View>
          </View>

          <Text style={style.price_text}> R$ {item.value},00 | {item.products} </Text>
          <TouchableOpacity
            style={
              item.status == 'Á caminho' ? style.btn_card : { display: 'none' }
            }
            onPress={() => {
              navigation.navigate('Localization', { driver_id: getOrdered(item.id) })
            }}
          >
            <Text style={style.text_btn}>Acompanhar pedido</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Shadow>
  )

  const componentCarrinho = () => {
    return (
      <View style={style.conteiner_title}>
        <Text style={style.title}>Minha Lista de Pedidos</Text>
      </View>
    )
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        <Header navigation={navigation} />
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            onRefresh={() => loadProds()}
            refreshing={refresh}
            ListHeaderComponent={componentCarrinho}
          />
        </View>
        <Menu navigation={navigation} />
      </SafeAreaView>
    </>
  )
}
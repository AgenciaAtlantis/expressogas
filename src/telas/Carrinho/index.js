import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import { removeItem } from '../../store/ducks/cart';
import { removeProduct } from '../../store/ducks/products';
//navigation and drawer
import { useFocusEffect } from '@react-navigation/native'

//React native shadow 2
import { Shadow } from 'react-native-shadow-2'

//images
import cart from '../../../assets/card_page.png'

import style from './styles'
import Menu from '../Menu'
import Header from '../Header'

export default function Carrinho({ navigation }) {
  const cartItem = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const baseUrl = 'https://api.clubedorevendedordegas.com.br/'
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(false)

  const [warning, setWarning] = useState()

  const [value, setValue] = useState(0)

  const [loading, setLoading] = useState(false)
  const [primaryColor, setPrimaryColor] = useState('#db2800')
  const [secundaryColor, setSecundaryColor] = useState('#cda900')
  const reseller = 'expresso_gas_'
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
  //             setPrimaryColor('#f62d01');
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

  // useEffect(() => {
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

  useFocusEffect(
    React.useCallback(() => {
      onRefresh()
    })
  )

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(false)
      setTimeout(() => {
        setLoading(true)
      }, 500)
    })

    return unsubscribe
  }, [navigation])

  function onRefresh() {
    let v = 0
    let formatValue = 0;
    for (let c = 0; c < cartItem.length; c++) {
      var dateNowFormat = new Date();
      var dateNowTime = dateNowFormat.getTime();
      var dateNow = new Date(dateNowTime);

      if (cartItem[c].promotional_value !== null) {
        var datePromocional = new Date(parseFloat(cartItem[c].promotional_date));
        var dayPromocional = datePromocional.getUTCDate();
        var monthPromocional = datePromocional.getMonth() + 1;

        var dayNow = dateNow.getUTCDate();
        var monthNow = dateNow.getMonth() + 1;

        if (monthNow == monthPromocional) {
          if (dayNow <= dayPromocional) {
            v = parseFloat(cartItem[c].promotional_value)
          } else {
            var value = cartItem[c].value;
            // if (value[1] !== undefined) {
            //   formatValue = parseFloat(value[0] + '.' + value[1]);
            // } else {
            //   formatValue = parseFloat(value[0]);
            // }
            v += value
          }
        } else {
          var value = cartItem[c].value;
          // if (value[1] !== undefined) {
          //   formatValue = Number(value[0] + '.' + value[1]);
          // } else {
          //   formatValue = Number(value[0]);
          // }
          v += value
        }
      } else {
        var value = cartItem[c].value;
        // if (value[1] !== undefined) {
        //   formatValue = Number(value[0] + '.' + value[1]);
        // } else {
        //   formatValue = Number(value[0]);
        // }
        v += value
      }

      if (c + 1 == cartItem.length) {
        setValue(v)
      }
    }
    if (!cartItem.length) {
      setValue(0)
    }
    if (value != 0) {
      setWarning(null)
    }
  }

  /* 
  Limpar carrinho code 
  <View>
    <TouchableOpacity
      style={[style.btn_card, { width: 150, marginVertical: 5 }]}
      onPress={() => {
        global.Shops=[]
        global.products=[]
        onRefresh()           
      }}
    >
      <Text style={{ color: '#fff' }}>Limpar carrinho</Text>
    </TouchableOpacity>
  </View>
  */
  function removeItemCart(id) {
    dispatch(removeItem(id))
    dispatch(removeProduct(id))
  }

  renderItem = ({ item }) => (
    <Shadow
      distance={5}
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
            <Text style={style.product_name}> {item.name}</Text>
          </View>
          <Text style={style.sub_text}> {item.description} </Text>
          {
            (item.promotional_value !== null) ?
              (
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text style={[style.price_text, { color: primaryColor }]}> {item.promotional_value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </Text>
                </View>
              ) : (
                <Text style={[style.price_text, { color: primaryColor }]}> {item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </Text>
              )}
        </View>
        <View style={{ with: '10%' }}>
          <TouchableOpacity
            onPress={() => {
              removeItemCart(item.id)
              onRefresh()
            }}
          >
            <Text style={style.cancel_btn}> X </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Shadow>
  )

  const Item = ({ name, imagem, description, promotional_value, value, id }) => (
    <Shadow
      distance={1}
      startColor={'#00000010'}
      radius={10}
      containerViewStyle={style.conteiner_card}
      viewStyle={{ alignSelf: 'stretch' }}
    >
      <View style={style.card}>
        <View style={{ with: '25%' }}>
          <Image source={{ uri: imagem }} style={style.product_img} />
        </View>
        <View style={{ with: '65%' }}>
          <View style={style.conteiner_product}>
            <Text style={style.product_name}> {name}</Text>
          </View>
          <Text style={style.sub_text}> {description} </Text>
          {
            (promotional_value !== null) ?
              (
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text style={[style.price_text, { color: primaryColor }]}> {promotional_value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </Text>
                </View>
              ) : (
                <Text style={[style.price_text, { color: primaryColor }]}> {value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </Text>
              )}
        </View>
        <View style={{ with: '10%' }}>
          <TouchableOpacity
            onPress={() => {
              removeItemCart(id)
              onRefresh()
            }}
          >
            <Text style={style.cancel_btn}> X </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Shadow>
  );

  const componentCarrinho = param => {
    if (param == 'header') {
      return (
        <View>
          <View style={style.conteiner_title}>
            <Text style={style.title}>Meu Carrinho</Text>
            <Image source={cart} style={[style.icon_cart, { backgroundColor: secundaryColor, borderRadius: 30 }]} />
          </View>
        </View>
      )
    } else {
      if (cartItem.length == 0) {
        return (
          <>
            <View style={style.conteiner_title}>
              <Text style={style.title}>
                Carrinho, adicione seu primeiro item
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
      } else {
        return (
          <View>
            {row()}
            <View style={style.conteiner_total}>
              <Text style={style.product_total}>Total do pedido </Text>
              <Text style={[style.price_total, { color: primaryColor }]}>{value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
            </View>
            {row()}
            <View style={{ alignItems: 'center' }}>
              <Text style={style.title}>{warning}</Text>
            </View>
            <TouchableOpacity
              style={[style.buy_btn, { backgroundColor: primaryColor }]}
              onPress={() => {
                if (value == 0) {
                  setWarning('Carrinho vazio')
                } else {
                  if (global.clientId) {
                    navigation.navigate('Pedido')
                  } else {
                    navigation.navigate('Login', 'Pedido')
                  }
                }
              }}
            >
              <Text style={{ color: '#fff' }}> Fechar pedido</Text>
            </TouchableOpacity>
          </View>
        )
      }
    }
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        <Header navigation={navigation} />
        <View style={{ flex: 1 }}>
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

          <FlatList
            data={cartItem}
            renderItem={({ item, index }) => <Item name={item.name} imagem={item.imagem} description={item.description} promotional_value={item.promotional_value} value={item.value} id={item.id} />}
            keyExtractor={(item, index) => String(index)}
            onRefresh={() => onRefresh()}
            refreshing={refresh}
            ListHeaderComponent={componentCarrinho('header')}
            ListFooterComponent={componentCarrinho('footer')}
            style={loading ? {} : { display: 'none' }}
          />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

import React, { Component, useState, useEffect, useReducer } from 'react'
import axios from 'axios'

import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  StatusBar,
  Pressable,
  TouchableOpacity,
  TextInput,
  ScrollView,
  useWindowDimensions,
  Modal,
  ActivityIndicator
} from 'react-native'

//Forms
import { RadioButton } from 'react-native-paper'
import { MaskedTextInput, unMask, mask } from 'react-native-mask-text'

//navigation and drawer
import { useFocusEffect } from '@react-navigation/native'

//Moment
import moment from 'moment'

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faCopy,
  faThumbsUp,
  faThumbsDown
} from '@fortawesome/free-solid-svg-icons'

import cart from '../../../assets/card_page.png'
import sucess from '../../../assets/realizada.png'

//icons paymentMethods
import icon_pay_cash from '../../../assets/icons_pay/dinheiro.png'
import icon_pay_card from '../../../assets/icons_pay/cartao.png'
import icon_pay from '../../../assets/icons_pay/pix.png'

import Menu from '../Menu'
import Header from '../Header'

//Copy
import * as Clipboard from 'expo-clipboard'

import style from './styles'
import { useSelector, useDispatch } from 'react-redux'
import { cleanCart } from '../../store/ducks/cart'
import { cleanProducts, addProducts } from '../../store/ducks/products'
import { generateCardHash } from 'pagarme-card-hash';

export default function Pedido({ navigation }) {
  const cartItem = useSelector(state => state.cart);
  const products = useSelector(state => state.product)
  const dispatch = useDispatch();
  const baseUrl = 'https://api.clubedorevendedordegas.com.br/'

  const [data, setData] = useState([])

  const today = new Date()
  const [sales, setSales] = useState(null)

  const [value, setValue] = useState(0)

  const [pays, setPays] = useState([])
  const [pay, setPay] = useState()

  const [cash, setCash] = useState(null)
  const [cupom, setCupom] = useState({})
  const [cupomData, setCupomData] = useState({})
  const [descontoCupom, setDescontoCupom] = useState({ value: 0 })

  const [user, setUser] = useState({})

  const [warning, setWarning] = useState()
  const size = useWindowDimensions()
  const [image, setImage] = useState(false)

  const [loading, setLoading] = useState(false)

  const [setores, setSetores] = useState([]);
  const [cardNumber, setCardNumber] = useState();
  const [cardCVV, setCardCVV] = useState();
  const [cardVal, setCardVal] = useState();
  const [cardName, setCardName] = useState();
  let setorCheck = true;
  const [primaryColor, setPrimaryColor] = useState('#db2800')
  const [secundaryColor, setSecundaryColor] = useState('#cda900')

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

  const player_id = global.player_id

  useFocusEffect(
    React.useCallback(() => {
      onRefresh()
    })
  )

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setWarning('')
      setCardCVV('')
      setCardNumber('')
      setCardVal('')
      setCardName('')
      setLoading(false)
      setTimeout(() => {
        setLoading(true)
      }, 700)
      setImage(false)
      loadSalesChannel()
      loadSetores()
      loadPays()
      loadUser(global.clientId)
    })

    return unsubscribe
  }, [navigation])

  async function loadSetores() {
    await axios
      .get(baseUrl + 'TodosSetores/' + reseller)
      .then(response => {
        setSetores(response.data)
      })
      .catch(err => {
        setWarning('Erro no canal de vendas')
      })
  }

  async function loadSalesChannel() {
    await axios
      .get(baseUrl + 'TodosCanaisVendas/' + reseller)
      .then(response => {
        response.data.map(key => {
          if (key.name == 'APP') {
            setSales(key.id)
          }
        })
      })
      .catch(err => {
        setWarning('Erro no canal de vendas')
      })
  }

  async function loadPays() {
    await axios
      .get(baseUrl + 'TodasFormasPagamentos/' + reseller)
      .then(response => {
        setPays(response.data.reverse())
      })
      .catch(err => {
        console.log('ops! ' + err)
      })
  }
  const reseller = 'expresso_gas_';  
  async function loadUser(id) {
    await axios
      .get(baseUrl + 'ClienteFisico/' + id + '/' + reseller)
      .then(response => {
        setUser(response.data[0])
      })
      .catch(err => {
        console.log('ops! erro no cliente ' + err)
      })
  }

  async function checkCupom() {
    const codigo = cupom.value
    await axios
      .get(baseUrl + 'TodosCupons/' + reseller)
      .then(response => {
        response.data.map((item, i) => {
          if (item.code == codigo) {
            var date = item.date_end.split('/')
            var dateEU = new Date(date[2], date[1] - 1, date[0])
            let dateTime = dateEU.getTime()

            if (item.quant > 0 && dateTime >= today.getTime()) {
              setDescontoCupom({ value: item.value })
              setCupomData(item)
            } else {
              setWarning('Cupom inválido')
              setTimeout(() => {
                setWarning('')
              }, 3000)
              setDescontoCupom({ value: 0 })
            }
          } else if (response.data.length == i + 1) {
            setWarning('Cupom não localizado')
            setTimeout(() => {
              setWarning('')
            }, 3000)
            setDescontoCupom({ value: 0 })
          }
        })
      })
      .catch(err => {
        console.log('ops! erro no cliente ' + err)
      })
  }

  function onRefresh() {
    let v = 0
    let formatValue = 0;
    var dateNowFormat = new Date();
    var dateNowTime = dateNowFormat.getTime();
    var dateNow = new Date(dateNowTime);

    for (let c = 0; c < cartItem.length; c++) {
      if (cartItem[c].promotional_value !== null) {
        var datePromocional = new Date(Number(cartItem[c].promotional_date));
        var dayPromocional = datePromocional.getUTCDate();
        var monthPromocional = datePromocional.getMonth() + 1;

        var dayNow = dateNow.getUTCDate();
        var monthNow = dateNow.getMonth() + 1;

        if (monthNow == monthPromocional) {
          if (dayNow <= dayPromocional) {
            v += cartItem[c].qnt > 1 ? parseFloat(cartItem[c].promotional_value) * cartItem[c].qnt : parseFloat(cartItem[c].promotional_value)
          } else {
            var value = cartItem[c].value;
            // if (value[1] !== undefined) {
            //   formatValue = Number(value[0] + '.' + value[1]);
            // } else {
            //   formatValue = Number(value[0]);
            // }
            v += cartItem[c].qnt > 1 ? parseFloat(value) * cartItem[c].qnt : parseFloat(value)
          }
        } else {
          var value = cartItem[c].value;
          // if (value[1] !== undefined) {
          //   formatValue = Number(value[0] + '.' + value[1]);
          // } else {
          //   formatValue = Number(value[0]);
          // }
          v += cartItem[c].qnt > 1 ? parseFloat(value) * cartItem[c].qnt : parseFloat(value)
        }
      } else {
        var value = cartItem[c].value;
        // if (value[1] !== undefined) {
        //   formatValue = Number(value[0] + '.' + value[1]);
        // } else {
        //   formatValue = Number(value[0]);
        // }
        v += cartItem[c].qnt > 1 ? parseFloat(value) * cartItem[c].qnt : parseFloat(value)
      }

      if (c + 1 == cartItem.length) {
        setValue(v)
      }
    }
  }

  async function sendRequest(data) {
    var product_id = ''
    let arrayProduct = [];
    for (let c = 0; c < data.length; c++) {
      if (c + 1 == data.length) {
        product_id += `${data[c].id}`
      } else {
        product_id += `${data[c].id},`
      }
    }
    for (let i = 0; i < products.length; i++) {
      arrayProduct.push(products[i].product);
    }

    // let hash = '';
    // if (cardNumber !== '' && cardCVV !== '' && cardName !== '' && cardVal !== '') {
    //   hash = await generateCardHash(
    //     {
    //       number: cardNumber,
    //       holderName: cardName,
    //       expirationDate: cardVal,
    //       cvv: cardCVV,
    //     },
    //     '<your encryption key>'
    //   );
    // }

    if (!pay) {
      setWarning('Selecione uma forma de pagamento')
    } else {
      await axios
        .post(baseUrl + 'CadastrarPedido/', {
          client_id: user.id,
          sale_channel: sales,
          product_id: product_id,
          products: arrayProduct.toString(),
          payment_id: pay,
          payment_value: value - descontoCupom.value,
          total: value - descontoCupom.value,
          order_date: moment(today).format('DD/MM/YYYY hh:mm:ss'),
          typeClient: 'fisico',
          obs: cash ? `Troco para  ${cash}` : null,
          quick_client: `${user.name}/${user.street},  ${user.number} - ${user.neighborhood} - ${user.city}/${user.phone}`,
          player_id: player_id,
          status: 'Recebido',
          db: reseller
        })
        .then(response => {
          if (response.status == '200') {
            setWarning('Pedido enviado!')
            dispatch(cleanCart([]))
            dispatch(cleanProducts([]))
            setImage(true)
            setTimeout(() => setImage(false), 1500)
            setTimeout(() => navigation.navigate('Pedidos'), 1500)

            if (descontoCupom.value > 0) {
              axios
                .put(baseUrl + 'AtualizarCupom', {
                  id: cupomData.id,
                  quant: cupomData.quant - 1,
                  db: reseller
                })
                .then(response => {
                  console.log('Cumpon atualizado ', response.data)
                })
                .catch(err => {
                  console.log('Erro ao atualizar ', err)
                })
            }
            axios.post(baseUrl + "Notificar", {
              app_id: "0eab63cd-71a3-48dc-b40c-7b1849c44f74",
              contents: {
                en: "Que legal, seu pedido foi recebido! 👏"
              },
              include_player_ids: [global.player_id]
            }).then(response => {
              console.log(response)
            }).catch(err => {
              console.log(err)
            })

            let messageClient = `Olá ${user.name}, o seu pedido foi feito com sucesso! \n \n Pedido nº ${response.data.id} \n \n Itens: ➡ ⁠ ${arrayProduct.toString()} \n \n 🏪 Entrega em: \n ${user.name},  ${user.street} - ${user.number} \n \n Total: ${(value - descontoCupom.value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} \n \n Obrigado pela preferência, se precisar de algo é só chamar! 😉`;

            axios
              .post(`https://evolution.clubedorevendedordegas.com.br/message/sendText/${reseller}`,
                {
                  number: "55" + user.phone + "@s.whatsapp.net",
                  textMessage: {
                    text: messageClient
                  },
                  delay: 1200
                }, {
                headers: {
                  'Content-Type': 'application/json',
                  'apikey': 'B6D711FCDE4D4FD5936544120E713976'
                }
              })
              .then((response) => {
                // console.log(response);
              })
              .catch((err) => {
                console.log(err)
              })

          }
        })
        .catch(err => {
          setWarning('Problemas na finalização do pedido!')
          console.log(err)
        })
    }
  }

  async function copyToClipboard(text) {
    await Clipboard.setStringAsync(text)
  }

  return (
    <>
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={image}
        style={{
          width: size.width,
          height: size.height,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Image
          source={sucess}
          resizeMode='contain'
          style={{ width: '100%', height: '90%', marginTop: 10 }}
        />
      </Modal>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        <Header navigation={navigation} />
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

        <ScrollView style={loading ? {} : { display: 'none' }}>
          <View style={style.conteiner_title}>
            <Text style={style.title}>Finalização pedido</Text>
            <Image source={cart} style={[style.icon_cart, { backgroundColor: secundaryColor, borderRadius: 30 }]} />
          </View>
          {row()}
          <View style={style.conteiner_pays}>
            <Text style={[style.desc_text, { color: primaryColor }]}>Selecione a forma de pagamento</Text>
            <View>
              {pays.map(item => {
                if (item.name == 'Dinheiro') {
                  return (
                    <View>
                      <Pressable
                        style={
                          item.id === pay ? [style.selected, { backgroundColor: primaryColor }] : style.unselected
                        }
                        onPress={() => setPay(item.id)}
                      >
                        <Image
                          source={icon_pay_cash}
                          style={[style.icon_pay]}
                        />
                        <Text style={[style.option, { color: secundaryColor }]}> {item.name}</Text>
                      </Pressable>
                      <View
                        style={
                          item.id === pay
                            ? style.conteiner_pay_select
                            : style.conteiner_none
                        }
                      >
                        <Text style={style.sub_text}>Precisa de troco?</Text>
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center'
                            }}
                          >
                            <RadioButton
                              status={
                                cash !== 0 && cash !== null && cash !== '$ 0,00'
                                  ? 'checked'
                                  : 'unchecked'
                              }
                              onPress={() => setCash(1)}
                            />
                            <Text style={[style.option, { marginRight: 10, color: secundaryColor }]}>
                              Sim
                            </Text>

                            <RadioButton
                              status={
                                cash == 0 || cash == null || cash == '$ 0,00'
                                  ? 'checked'
                                  : 'unchecked'
                              }
                              onPress={() => setCash(null)}
                            />
                            <Text style={[style.option, { color: secundaryColor }]}>Não</Text>
                          </View>
                          <View
                            style={
                              cash == 0 || cash == null || cash == '$ 0,00'
                                ? style.conteiner_none
                                : {}
                            }
                          >
                            <Text style={style.sub_text}>
                              Troco para quanto?
                            </Text>
                            <MaskedTextInput
                              style={style.input}
                              keyboardType='numeric'
                              returnKeyType='done'
                              onChangeText={text => setCash(text)}
                              type='currency'
                              options={{
                                prefix: 'R$ ',
                                decimalSeparator: ',',
                                groupSeparator: '.',
                                precision: 2
                              }}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  )
                }
                if (item.name == 'Débito' || item.name == 'Crédito') {
                  return (
                    <Pressable
                      style={
                        item.id === pay ? [style.selected, { backgroundColor: primaryColor }] : style.unselected
                      }
                      onPress={() => setPay(item.id)}
                    >
                      <Image source={icon_pay_card} style={style.icon_pay} />
                      <Text style={[style.option, { color: secundaryColor }]}> Cartão {item.name}</Text>
                    </Pressable>
                  )
                }
                if (item.name == 'Débido (Pagar pelo APP)' || item.name == 'Crédito (Pagar pelo APP)') {
                  return (
                    <View>
                      <Pressable
                        style={
                          item.id === pay ? style.selected : style.unselected
                        }
                        onPress={() => setPay(item.id)}
                      >
                        <Image
                          source={icon_pay_card}
                          style={style.icon_pay}
                        />
                        <Text style={style.option}> {item.name}</Text>
                      </Pressable>
                      <View
                        style={
                          item.id === pay
                            ? style.conteiner_pay_select
                            : style.conteiner_none
                        }
                      >
                        <View>
                          <Text style={style.sub_text}>Número do cartão</Text>
                          <MaskedTextInput
                            mask="9999.9999.9999.9999"
                            style={style.input}
                            keyboardType='numeric'
                            onChangeText={text => setCardNumber(text)}
                          />
                        </View>
                        <View>
                          <Text style={style.sub_text}>Nome impresso no cartão</Text>
                          <MaskedTextInput
                            style={style.input}
                            onChangeText={text => setCardName(text)}
                          />
                        </View>
                        <View>
                          <View>
                            <Text style={style.sub_text}>CVV</Text>
                            <TextInput
                              style={style.input}
                              keyboardType='numeric'
                              onChangeText={text => setCardCVV(text)}
                            />
                          </View>
                          <View>
                            <Text style={style.sub_text}>Validade</Text>
                            <MaskedTextInput
                              mask="99/99"
                              style={style.input}
                              keyboardType='numeric'
                              onChangeText={text => setCardVal(text)}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  )
                }
                return (
                  <View>
                    <Pressable
                      style={
                        item.id === pay ? [style.selected, { backgroundColor: primaryColor }] : style.unselected
                      }
                      onPress={() => setPay(item.id)}
                    >
                      <Image source={icon_pay} style={style.icon_pay} />
                      <Text style={[style.option, { color: secundaryColor }]}> {item.name}</Text>
                    </Pressable>
                    <View
                      style={
                        item.id === pay
                          ? style.conteiner_pay_select
                          : style.conteiner_none
                      }
                    >
                      <Text
                        style={[
                          style.sub_text3,
                          { fontWeight: 'bold', fontSize: 16, color: primaryColor }
                        ]}
                      >
                        Chave Pix
                      </Text>
                      <View style={style.conteiner_basic}>
                        <Text style={style.sub_text3}>{item.obs}</Text>
                        <TouchableOpacity
                          onPress={() => copyToClipboard(item.obs)}
                        >
                          <FontAwesomeIcon
                            icon={faCopy}
                            style={[style.sub_text3, { color: primaryColor }]}
                            size={26}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )
              })}
            </View>
          </View>

          <View style={style.conteiner_pays}>
            <View style={style.conteiner_basic}>
              <Text style={[style.title2, { color: primaryColor }]}>
                Possui cupom?{' '}
                <FontAwesomeIcon
                  icon={
                    warning == 'Cupom não localizado' || warning == 'Cupom inválido'
                      ? faThumbsDown
                      : faThumbsUp
                  }
                  style={
                    descontoCupom.value > 0 || warning == 'Cupom não localizado' || warning == 'Cupom inválido'
                      ? style.sub_text3
                      : { display: 'none', color: primaryColor }
                  }
                  size={20}
                />
              </Text>
            </View>

            <View style={style.input}>
              <TextInput
                placeholder='Cupom'
                onChangeText={text => setCupom({ value: text })}
                onBlur={checkCupom}
              />
            </View>

            <View style={descontoCupom.value > 0 ? {} : { display: 'none' }}>
              <Text style={[style.price_total, { fontSize: 15 }]}>
                Desconto de {(descontoCupom.value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
              </Text>
              <Text style={[style.price_total, { fontSize: 15 }]}>
                Total da compra {(value - descontoCupom.value).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
              </Text>
            </View>
          </View>

          <View style={style.conteiner_dados}>
            <Text style={[style.desc_text, { fontSize: 14 }]}>
              Confirme os dados da entrega
            </Text>
            <View style={style.row}>
              <Text>Nome: </Text>
              <Text style={style.sub_text}>{user.name}</Text>
            </View>
            <View style={style.row}>
              <Text>Endereço: </Text>
              <Text style={style.sub_text}>
                {user.street}, {user.number} - {user.neighborhood} - {user.city}
              </Text>
            </View>
            <View style={style.row}>
              <Text>Telefone: </Text>
              <Text style={style.sub_text}>
                {mask(user.phone, '(99) 99999-9999')}
              </Text>
            </View>
            <View style={style.row}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Alterar', 'Pedido')}
              >
                <Text style={style.sub_text2}> Alterar </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems: 'center', marginBottom: 10 }}>
            <Text style={[{ color: '#E00', fontSize: 18, fontWeight: 'bold' }]}>
              {warning}
            </Text>
          </View>
          {
            // setores.map(key => {
            //   let setorList = key.list_neighborhoods.trim().toLowerCase().split(', ');
            //   let userSetor = user.neighborhood;
            //   if (userSetor !== undefined) {
            //     userSetor = userSetor.toLowerCase();
            //   }
            //   if (setorList.includes(userSetor)) {
            //     setorCheck = true;
            //   }
            // })
          }
          {
            setorCheck ? (
              <TouchableOpacity
                style={[style.buy_btn, { backgroundColor: primaryColor }]}
                onPress={() => {
                  sendRequest(cartItem)
                }}
              >
                <Text style={{ color: '#fff' }}> Enviar pedido</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ alignItems: 'center', marginBottom: 40 }}>
                <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}> Infelizmente não fazemos entrega em sua região!</Text>
              </View>
            )
          }

        </ScrollView>

        <Menu navigation={navigation} />
      </SafeAreaView >
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
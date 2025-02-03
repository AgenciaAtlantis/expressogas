import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'

import {
  StyleSheet,
  SafeAreaView,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  View,
  Modal,
  Pressable
} from 'react-native'

//Forms
import { MaskedTextInput, unMask } from 'react-native-mask-text'

import style from './styles'

import Menu from '../Menu'
import Header from '../Header'


export default function Atualizar({ route, navigation }) {
  const baseUrl = 'https://api.clubedorevendedordegas.com.br/'

  const [warning, setWarning] = useState()

  //update date
  const [cep, setCep] = useState({ name: '' })
  const [uf, setUf] = useState({ name: '' })
  const [city, setCity] = useState({ name: '' })
  const [neighborhood, setNeighborhood] = useState({ name: '' })
  const [street, setStreet] = useState({ name: '' })
  const [number, setNumber] = useState({ name: '' })
  const [complement, setComplement] = useState({ name: '' })
  const [referencePoint, setReferencePoint] = useState({ name: '' })

  const [phone, setPhone] = useState({ name: '' })
  const [email, setEmail] = useState({ name: '' })
  const [oldEmail, setOldEmail] = useState({ name: '' })
  const [password, setPassword] = useState({ name: '' })

  const [primaryColor, setPrimaryColor] = useState('#db2800')
  const [secundaryColor, setSecundaryColor] = useState('#cda900')
  const [modalVisible, setModalVisible] = useState(false);

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

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadUser()
    })

    return unsubscribe
  }, [navigation])
  const reseller = 'expresso_gas_';
  async function loadUser() {
    await axios
      .get(baseUrl + 'ClienteFisico/' + global.clientId + "/" + reseller)
      .then(response => {
        setUf({ name: response.data[0].state })
        setCity({ name: response.data[0].city })
        setNeighborhood({ name: response.data[0].neighborhood })
        setStreet({ name: response.data[0].street })

        setNumber({ name: response.data[0].number.toString() })
        setComplement({ name: response.data[0].complement })
        setReferencePoint({ name: response.data[0].reference_point })

        setPhone({ name: response.data[0].phone })
        setOldEmail(response.data[0].email)
        setEmail({ name: response.data[0].email })
        setPassword({ name: response.data[0].password })
      })
      .catch(err => {
        console.log('ops! ocorreu um erro' + err)
      })
  }

  async function checkCep() {
    await axios
      .get('https://viacep.com.br/ws/' + cep + '/json/')
      .then(response => {
        setUf({ name: response.data.uf })
        setCity({ name: response.data.localidade })
        setNeighborhood({ name: response.data.bairro })
        setStreet({ name: response.data.logradouro })

        setNumber({ name: '' })
        setComplement({ name: '' })
        setReferencePoint({ name: '' })
      })
      .catch(err => {
        console.log('ops! erro no cep ' + err)
      })
  }

  async function updateUser() {
    if (
      number.name !== '' &&
      street.name !== '' &&
      city.name !== '' &&
      uf.name !== '' &&
      neighborhood.name !== '' &&
      password.name !== '' &&
      phone.name !== ''
    ) {
      const body = {
        id: global.clientId,
        number: number.name,
        street: street.name,
        city: city.name,
        state: uf.name,
        neighborhood: neighborhood.name,
        complement: complement.name,
        reference_point: referencePoint.name,
        email: email.name,
        password: password.name,
        phone: phone.name,
        db: reseller
      }
      await axios
        .put(baseUrl + 'AtualizarCadastroFisico', body)
        .then(response => {
          console.log(response)

          navigation.navigate(route.params)
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      setWarning('Nenhum campo pode ser vazio')
    }
  }

  async function clearAll() {
    try {
      await AsyncStorage.clear()
      global.clientId = null
      global.photoUser = 'https://api.clubedorevendedordegas.com.br/files/clients/placeholder.jpg'
      console.log('Storage successfully cleared!')
    } catch (e) {
      console.log('Failed to clear the async storage: ', e)
    }
  }

  const deleteUser = async () => {
    await axios
      .delete(baseUrl + 'DeletarClienteFisico/' + global.clientId + reseller)
      .then(response => {
        global.clientId = null
        navigation.navigate('Home')
        clearAll()
      })
      .catch(err => {
        console.log('ops! ocorreu um erro' + err)
      })
  }

  const ModalConfirm = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>Você tem certeza que deseja excluir sua conta?</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Pressable
                style={[style.button, { backgroundColor: primaryColor }]}
                onPress={() => {
                  deleteUser()
                  setModalVisible(false)
                }}>
                <Text style={style.textStyle}>Sim</Text>
              </Pressable>
              <Pressable
                style={[style.button, { backgroundColor: secundaryColor }]}
                onPress={() => setModalVisible(false)}>
                <Text style={style.textStyle}>Não</Text>
              </Pressable>
            </View>

          </View>
        </View>
      </Modal>
    )
  }

  return (
    <>
      <SafeAreaView style={[style.conteiner_screen, { backgroundColor: primaryColor }]}>
        <ModalConfirm />
        <StatusBar />
        <Header navigation={navigation} />
        <ScrollView style={style.conteiner_scroll}>
          <Text style={style.text_desc}>Endereço</Text>
          <MaskedTextInput
            style={style.input}
            onChangeText={text => {
              setCep(unMask(text))
            }}
            onBlur={checkCep}
            defaultValue={cep.name}
            placeholder='Cep'
            keyboardType='numeric'
            autoComplete='off'
            mask='99999-999'
          />
          <TextInput
            style={style.input}
            onChangeText={text => setUf({ name: text })}
            placeholder='Estado'
            defaultValue={uf.name}
          />
          <TextInput
            style={style.input}
            onChangeText={text => setCity({ name: text })}
            placeholder='Cidade'
            defaultValue={city.name}
          />
          <TextInput
            style={style.input}
            onChangeText={text => setNeighborhood({ name: text })}
            placeholder='Bairro'
            defaultValue={neighborhood.name}
          />
          <TextInput
            style={style.input}
            onChangeText={text => setStreet({ name: text })}
            placeholder='Rua'
            defaultValue={street.name}
          />
          <TextInput
            style={style.input}
            onChangeText={text => setNumber({ name: text })}
            defaultValue={number.name}
            keyboardType='numeric'
            placeholder='Número'
          />
          <TextInput
            style={style.input}
            onChangeText={text => setComplement({ name: text })}
            defaultValue={complement.name}
            placeholder='Complemento'
          />
          <TextInput
            style={style.input}
            onChangeText={text => setReferencePoint({ name: text })}
            defaultValue={referencePoint.name}
            placeholder='Ponto de referência'
          />
          <Text style={style.text_desc}>Informação dos usuários</Text>
          <TextInput
            style={style.input}
            onChangeText={text => setPhone({ name: text })}
            placeholder='Whatsapp'
            autoComplete='tel-national'
            keyboardType='numeric'
            defaultValue={phone.name}
          />
          <TextInput
            style={style.input}
            onChangeText={text => setEmail({ name: text })}
            defaultValue={email.name}
            placeholder='Email'
          />
          <TextInput
            style={style.input}
            onChangeText={text => setPassword({ name: text })}
            defaultValue={password.name}
            placeholder='Senha'
          />
          <View style={{ alignItems: 'center' }}>
            <Text style={style.errorMessage}>{warning}</Text>
          </View>
          <TouchableOpacity
            style={[style.btn, { backgroundColor: secundaryColor }]}
            onPress={() => {
              updateUser()
            }}
          >
            <Text style={style.text_sub}> Alterar meu dados</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[style.btn, { backgroundColor: 'transparent', marginVertical: 0 }]}
            onPress={() => {
              setModalVisible(true)
            }}
          >
            <Text style={style.text_sub}> Excluir conta</Text>
          </TouchableOpacity>
        </ScrollView>
        {/* <Menu navigation={navigation} /> */}
      </SafeAreaView>
    </>
  )
}

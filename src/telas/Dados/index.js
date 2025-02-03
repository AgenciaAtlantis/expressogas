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
  ActivityIndicator,
  Alert,
} from 'react-native'

//Forms
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { MaskedTextInput, unMask, MaskedText } from 'react-native-mask-text'

//import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage'

import style from './styles'

import Menu from '../Menu'
import Header from '../Header'


export default function Dados({ route, navigation }) {
  const baseUrl = 'https://api.clubedorevendedordegas.com.br/'

  const [warning, setWarning] = useState()
  const [loading, setLoading] = useState(false)

  //search cliente
  const [clientId, setClientId] = useState(null)
  const [tel, setTel] = useState({})
  const [cpf, setCpf] = useState({})
  const [bd, setBd] = useState({})

  //update date
  const [cepMask, setCepMask] = useState({ cep: '' })
  const [uf, setUf] = useState()
  const [city, setCity] = useState()
  const [neighborhood, setNeighborhood] = useState()
  const [street, setStreet] = useState()
  const [number, setNumber] = useState()
  const [complement, setComplement] = useState()
  const [referencePoint, setReferencePoint] = useState()
  const [cepCheck, setCepCheck] = useState(false)

  //Validade code (Default = false)
  const [validadeCode, setValidadeCode] = useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTel({ value: null })
      setValues({})
      setCepMask({ cep: '' })
      setCepCheck(false)
    })

    return unsubscribe
  }, [navigation])

  const fieldsValidationSchema = yup.object().shape({
    email: yup
      .string()
      .required('O email não pode ser vazio')
      .email('Digite um email válido'),
    password: yup
      .string()
      .required('A senha não pode ser vazia')
      .min(6, 'A senha deve conter pelo menos 6 dígitos'),
    name: yup.string().required('O nome não pode ser vazio'),
    cpf: newClient
      ? yup
        .string()
        .required('O CPF não pode ser vazio')
        .min(11)
      : null,
    birthdate: newClient ? yup.number() : null,
    //address
    number: yup.number().required('O N° não pode ser vazio'),
    street: yup.string().required('A rua não pode ser vazia'),
    city: yup.string().required('A cidade não pode ser vazia'),
    state: yup.string().required('O estado não pode ser vazia'),
    neighborhood: yup.string().required('O bairro não pode ser vazia'),
    complement: yup
      .string()
      .required('O complemento não pode ser vazio, caso more em casa informe')
  })

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(fieldsValidationSchema)
  })

  const onSubmit = data => cadastraCliente(data)

  useEffect(() => {
    register('email')
    register('password')
    register('name')
    register('cpf')
    register('password')
    register('email')
    register('phone')
    register('birthdate')
    register('obs')

    //address
    register('cep')
    register('number')
    register('street')
    register('city')
    register('state')
    register('neighborhood')
    register('complement')
    register('reference_point')
  }, [register])

  const [state, setValues] = useState({
    cep: '',
    state: '',
    city: '',
    neighborhood: '',
    street: '',
    name: '',
  })
  const [newClient, setNewClient] = useState(true)
  const [phone, setPhone] = useState('');
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
  //             setPrimaryColor('#000');
  //             setSecundaryColor('#eb4034');
  //           }
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
  //             setPrimaryColor('#000');
  //             setSecundaryColor('#eb4034');
  //           }
  //         }
  //       })
  //     })
  //   // })

  //   // return unsubscribe
  // }, [])


  async function cadastraCliente() {
    state.phone = tel.value
    // fieldsValidationSchema.isValid(data).then(async function () {
    if (state.name == undefined) {
      Alert.alert("AVISO", "O campo nome não pode ser vázio")
      return
    }
    // else if (state.cep == undefined) {
    //   Alert.alert("AVISO", "O campo CEP não pode ser vázio")
    //   return
    // } 
    else if (state.number == undefined) {
      Alert.alert("AVISO", "O campo número não pode ser vázio")
      return
    } else if (state.street == undefined) {
      Alert.alert("AVISO", "O campo rua não pode ser vázio")
      return
    } else if (state.city == undefined) {
      Alert.alert("AVISO", "O campo cidade não pode ser vázio")
      return
    } else if (state.state == undefined) {
      Alert.alert("AVISO", "O campo estado não pode ser vázio")
      return
    } else if (state.neighborhood == undefined) {
      Alert.alert("AVISO", "O campo bairro não pode ser vázio")
      return
    } else if (state.cpf == "") {
      Alert.alert("AVISO", "O campo CPF não pode ser vázio")
      return
    } else if (state.password == undefined) {
      Alert.alert("AVISO", "O campo senha não pode ser vázio")
      return
    } else {
      const body = {
        name: state.name,
        cep: state.cep,
        number: state.number,
        street: state.street,
        city: state.city,
        state: state.state,
        neighborhood: state.neighborhood,
        complement: state.complement,
        reference_point: state.reference_point,
        password: state.password,
        phone: tel.value,
        db: reseller
      }

      if (newClient) {
        await axios
          .post(baseUrl + 'CadastrarClienteFisico', body)
          .then(response => {
            global.clientId = response.data.id
            saveLogin(response.data.id)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        body.id = clientId

        console.log(body)
        await axios
          .put(baseUrl + 'AtualizarCadastroFisico', body)
          .then(response => {
            global.clientId = clientId
            saveLogin(clientId)
            console.log('aqui')
          })
          .catch(err => {
            console.log(err)
          })
      }

      await axios
        .post(baseUrl + 'Login', {
          email: state.cpf,
          password: state.password,
          db: reseller
        })
        .then(response => {
          global.clientId = response.data.id
          saveLogin(response.data.id)
          global.userName = response.data.name
          global.userPhoto = response.data.photo
          global.photoUser = response.data.photo
          navigation.navigate(route.params)
        })
        .catch(err => {
          console.log('ops! erro login ' + err)
        })
    }
  }

  async function saveLogin(id) {
    try {
      await AsyncStorage.setItem('@user_input', id.toString())
      console.log('Data successfully saved')
    } catch (e) {
      console.log('Failed to save the data to the storage')
    }
  }
  const reseller = 'expresso_gas_';  
  async function searchClient() {
    const telInput = unMask(getValues('phone'))
    setTel({ value: getValues('phone') })

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)

    await axios
      .post(baseUrl + 'PegarPeloNumero', {
        phone: telInput,
        db: reseller
      })
      .then(response => {
        if (response.data.id == 0) {
          setWarning('Cliente não cadastrado')
          setNewClient(true)
          setClientId(false)
          setTimeout(() => {
            setWarning('')
          }, 15000)
          return
        }
        setClientId(response.data.id)
        setWarning('Cliente localizado')
        setTimeout(() => {
          setWarning('')
        }, 15000)

        axios
          .get(`https://api.clubedorevendedordegas.com.br/ClienteFisico/${String(response.data.id)}/${reseller}`)
          .then(response => {
            const item = response.data[0]

            // if (item.cpf) {
            //   setCpf({ value: item.cpf.toString() })
            //   setValue('cpf', item.cpf)
            // }
            // if (item.birthdate) {
            //   setBd({ value: item.birthdate.toString() })
            //   setValue('birthdate', item.birthdate)
            // }

            if (state.street == '') {
              state.state = item.state
              state.city = item.city
              state.neighborhood = item.neighborhood
              state.street = item.street
              state.complement = item.complement
              state.phone = item.phone
              state.number = item.number.toString()
              state.name = item.name
              // setValue('email', item.email)
              // setValue('obs', item.obs)
              state.reference_point = item.reference_point


              // setValues({
              //   cep: null,
              //   state: item.state,
              //   city: item.state,
              //   neighborhood: item.neighborhood,
              //   street: item.street,
              //   number: item.number.toString(),
              //   complement: item.complement,
              //   name: item.name,
              //   reference_point: item.reference_point,
              // })
            } else {
              // setValue('name', item.name)
              // setValues({
              //   cep: null,
              //   state: state.state,
              //   city: state.state,
              //   neighborhood: state.neighborhood,
              //   street: state.street,
              //   number: state.number.toString(),
              //   complement: state.complement,
              //   name: item.name,
              //   reference_point: state.reference_point,
              // })
            }

            setClientId(item.id)

            setNewClient(false)


          })
          .catch(err => {
            setWarning('Erro ao buscar clientes')
            console.log('ops! Erro pegar pelo telefone' + err)
          })
      })
      .catch(err => {
        setWarning('Erro ao buscar clientes')
        console.log('ops! Erro pegar pelo id ' + err)
      })
  }

  const TextField = ({ error, ...inputProps }) => (
    <>
      <TextInput
        style={[style.input, !!error && style.borderError]}
        {...inputProps}
        returnKeyType='done'
      />
      {!!error && <Text style={style.errorMessage}>{error.message}</Text>}
    </>
  )

  const MaskTextField = ({ error, ...inputProps }) => (
    <>
      <MaskedTextInput
        style={[style.input, !!error && style.borderError]}
        {...inputProps}
        returnKeyType='done'
      />
      {!!error && (
        <Text style={style.errorMessage}>
          Campo não pode ser vazio ou incompleto
        </Text>
      )}
    </>
  )

  async function checkCep() {
    const cepInput = unMask(state.cep)
    setCepMask({ cep: state.cep })
    console.log(cepInput)
    await axios
      .get('https://viacep.com.br/ws/' + cepInput + '/json/')
      .then(response => {
        state.cep = cepInput
        state.state = response.data.uf
        state.city = response.data.localidade
        state.neighborhood = response.data.bairro
        state.street = response.data.logradouro

        // setValues({
        //   cep: cepInput,
        //   state: response.data.uf,
        //   city: response.data.localidade,
        //   neighborhood: response.data.bairro,
        //   street: response.data.logradouro,
        //   name: state.name
        // })
        setCepCheck(true)
      })
      .catch(err => {
        console.log('ops! erro no cep ' + err)
      })
  }

  if (!global.clientId) {
    return (
      <>
        <SafeAreaView style={[style.conteiner_screen, { backgroundColor: primaryColor }]}>
          <StatusBar />
          <Header navigation={navigation} />
          <View
            style={
              loading
                ? {
                  flex: 1,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  padding: 10
                }
                : { display: 'none' }
            }
          >
            <ActivityIndicator size='large' color='#fff' />
          </View>

          <ScrollView
            style={loading ? { display: 'none' } : style.conteiner_scroll}
          >
            {/* <View
              style={warning ? style.conteiner_warning : { display: 'none' }}
            >
              <Text style={style.text_warning}>{warning}</Text>
            </View> */}

            {/* {validadeCode == true ? (
              <>
                <Text style={[style.text_desc, { marginVertical: 10, fontSize: 16, fontWeight: 'bold' }]}>
                  Informe seu tel, caso já seja nosso cliente, talvez tenhamos
                  algumas informações para ajudá-lo no cadastro 😉
                </Text>

                <Text style={style.text_desc}>Buscar</Text>
                <MaskTextField
                  style={style.input}
                  onChangeText={text => setValue('phone', unMask(text))}
                  placeholder='Whatsapp'
                  autoComplete='tel-national'
                  keyboardType='numeric'
                  mask='(99) 99999-9999'
                  onBlur={searchClient}
                />
              </>
            ) : (<Text style={[style.text_desc, { marginVertical: 10, fontSize: 16, fontWeight: 'bold' }]}>
              Preencha suas informações de cadastro
            </Text>)} */}


            <Text style={style.text_desc}>Endereço</Text>
            <View>
              <Text style={{ color: '#fff' }}>
                Insira o cep para puxar o endereço
              </Text>
              <MaskTextField
                style={style.input}
                error={errors?.cep}
                onChangeText={text => {
                  state.cep = text
                }}
                onBlur={checkCep}
                placeholder='CEP'
                keyboardType='numeric'
                autoComplete='off'
                mask='99999-999'
              />
              <View style={cepMask.cep !== '' ? style.conteinerFlex : { height: 0 }}>
                <Text style={style.text_desc}>{cepMask.cep}</Text>
              </View>

              <View style={style.conteinerFlex}>
                <TouchableOpacity
                  style={[style.btn, { width: '45%', marginRight: 25, backgroundColor: secundaryColor }]}
                  onPress={() => {
                    setCepMask({ cep: '' })
                    setCepCheck(true)
                  }}
                >
                  <Text style={style.text_sub}>Não sei o CEP</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[style.btn, { width: '45%', marginLeft: 5, backgroundColor: secundaryColor }]}
                  onPress={() => {
                    setValues('')
                    setCepMask({ cep: '' })
                  }}
                >
                  <Text style={style.text_sub}>Limpar Endereço</Text>
                </TouchableOpacity>
              </View>
            </View>
            {cepCheck ? (
              <>
                <TextField
                  style={style.input}
                  error={errors?.state}
                  onChangeText={text => state.state = text}
                  placeholder='Estado'
                  defaultValue={state.state}
                  required
                />
                <TextField
                  style={style.input}
                  error={errors?.city}
                  onChangeText={text => state.city = text}
                  placeholder='Cidade'
                  defaultValue={state.city}
                  required
                />
                <TextField
                  style={style.input}
                  error={errors?.neighborhood}
                  onChangeText={text => state.neighborhood = text}
                  placeholder='Bairro'
                  defaultValue={state.neighborhood}
                  required
                />
                <TextField
                  style={style.input}
                  error={errors?.street}
                  onChangeText={text => {
                    state.street = text
                    // setValue('street', text)
                  }}

                  placeholder='Rua'
                  defaultValue={state.street}
                  required
                />
                <TextField
                  style={style.input}
                  error={errors?.number}
                  onChangeText={text => state.number = text}
                  keyboardType='numeric'
                  placeholder='Número'
                  defaultValue={state.number}
                  required
                />
                <TextField
                  style={style.input}
                  onChangeText={text => state.complement = text}
                  placeholder='Complemento (Opcional)'
                  defaultValue={state.complement}
                />
                <TextField
                  style={style.input}
                  onChangeText={text => state.reference_point = text}
                  placeholder='Ponto de referência (Opcional)'
                  defaultValue={state.reference_point}
                />
              </>
            ) : ('')}


            <Text style={style.text_desc}>Cadastro de cliente</Text>

            {validadeCode == true ? (
              <MaskedText
                style={[style.input, { color: '#9D9D9D' }]}
                placeholder='Whatsapp'
                id='whatsappClient'
                autoComplete='tel-national'
                keyboardType='numeric'
                mask='(99) 99999-9999'
                value={tel.value}
              />
            ) : (
              <MaskTextField
                style={style.input}
                onChangeText={text => setValue('phone', unMask(text))}
                id='whatsappClient'
                placeholder='Whatsapp'
                autoComplete='tel-national'
                keyboardType='numeric'
                mask='(99) 99999-9999'
                value={tel.value}
                onBlur={searchClient}
              />
            )
            }

            < TextField
              style={
                !newClient ? [style.input, { color: '#9D9D9D' }] : style.input
              }
              placeholder='Nome'
              error={errors?.name}
              onChangeText={text => state.name = text}
              autoComplete='name'
              defaultValue={state.name}
              required
            />

            {/* <MaskedText
              style={
                cpf.value
                  ? [style.input, { color: '#9D9D9D' }]
                  : { display: 'none' }
              }
              mask='999.999.999-99'
            >
              {cpf.value}
            </MaskedText> */}

            {/* <MaskTextField
              style={!cpf.value ? style.input : { display: 'none' }}
              error={!cpf.value ? errors?.cpf : null}
              onChangeText={text => state.cpf = unMask(text)}
              placeholder='CPF'
              keyboardType='numeric'
              autoComplete='off'
              mask='999.999.999-99'
              value={state.cpf}
              required
            /> */}

            {/* <MaskedText
              style={
                bd.value
                  ? [style.input, { color: '#9D9D9D' }]
                  : { display: 'none' }
              }
              mask='99/99/9999'
            >
              {bd.value}
            </MaskedText> */}

            {/* <MaskTextField
              style={!bd.value ? style.input : { display: 'none' }}
              onChangeText={text => state.birthdate = unMask(text)}
              placeholder='Data de Nascimento (Opcional)'
              keyboardType='numeric'
              autoComplete='birthdate-full'
              mask='99/99/9999'
              value={state.birthdate}
            /> */}
            {/* <TextInput
              style={style.input}
              onChangeText={text => state.obs = text}
              placeholder='Observação (Opcional)'
              value={state.obs}
            />

            <TextField
              style={style.input}
              placeholder='Email (Opcional)'
              onChangeText={text => state.email = text}
              autoComplete='email'
              keyboardType='email-address'
              value={state.email}
            /> */}
            <TextField
              style={style.input}
              error={errors?.password}
              onChangeText={text => state.password = text}
              placeholder='Senha de Acesso'
              secureTextEntry={true}
              required
            />
            <TouchableOpacity
              style={[style.btn, { backgroundColor: secundaryColor }]}
              onPress={cadastraCliente}
            >
              <Text style={style.text_sub}> Salvar meu dados</Text>
            </TouchableOpacity>
          </ScrollView>
          {/* <Menu navigation={navigation} /> */}
        </SafeAreaView>
      </>
    )
  }
}
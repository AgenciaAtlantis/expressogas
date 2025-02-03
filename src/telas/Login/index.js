import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'

import {
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native'

//import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

//images
import icon from '../../../assets/logo.png'

import OneSignal from 'react-native-onesignal';

import style from './styles'
import { login } from '../../store/ducks/user';
import { useSelector, useDispatch } from 'react-redux'

export default function Login({ route, navigation }) {
  const dispatch = useDispatch();
  const ONESIGNAL_APP_ID = '0eab63cd-71a3-48dc-b40c-7b1849c44f74'

  const startOneSignal = async () => {

    OneSignal.setAppId(ONESIGNAL_APP_ID);

    // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
    OneSignal.promptForPushNotificationsWithUserResponse();

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
      console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
      let notification = notificationReceivedEvent.getNotification();
      console.log("notification: ", notification);
      const data = notification.additionalData
      console.log("additionalData: ", data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    });

    OneSignal.addPermissionObserver(event => {
      console.log("OneSignal: permission changed:", event);
    });

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log("OneSignal: notification opened:", notification);
    });

    OneSignal.addSubscriptionObserver(event => {
      console.log("OneSignal: subscription changed to userId:", event.to.userId);
    });

    const deviceState = await OneSignal.getDeviceState();
    global.player_id = deviceState.userId
  }

  startOneSignal()

  //permanencia de dados
  async function saveLogin(id) {
    try {
      await AsyncStorage.setItem('@user_input', id.toString())
      console.log('Data successfully saved')
    } catch (e) {
      console.log('Failed to save the data to the storage')
    }
  }

  const baseUrl = 'https://api.clubedorevendedordegas.com.br/'

  const [warning, setWarning] = useState()

  const [login, setLogin] = useState()
  const [password, setPassword] = useState()
  const [primaryColor, setPrimaryColor] = useState('#db2800')
  const [secundaryColor, setSecundaryColor] = useState('#cda900')
  const [logo, setLogo] = useState(icon);
  const reseller = 'expresso_gas_';  

  useEffect(() => {
    axios
      .get("https://api.clubedorevendedordegas.com.br/Configuracoes/" + reseller)
      .then((response) => {
        setLogo(response.data[0]['logoMenu']);
      })

      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [])

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
      setWarning('')
      if (!global.clientId) {
        setLogin('')
        setPassword('')
      }
    });

    return unsubscribe;
  }, [navigation]);

  async function forgetPassword() {
    await axios
      .post(baseUrl + 'EsqueciASenha', {
        email: login,
        userType: 'fisico',
        db: reseller
      })
      .then(response => {
        setWarning('Acesse seu email')
        console.log(response.data)
      })
      .catch(err => {
        setWarning('Dados inválidos')
        console.log(err)
      })
  }

  async function requestLogin() {
    await axios
      .post(baseUrl + 'Login', {
        email: login,
        password: password,
        db: reseller
      })
      .then(response => {
        setWarning('Login realizado com sucesso')
        global.clientId = response.data.id
        saveLogin(response.data.id)
        global.userName = response.data.name
        global.userPhoto = response.data.photo
        global.photoUser = response.data.photo
        navigation.navigate(route.params)
        console.log(route.params, 'aqui')
      })
      .catch(err => {
        setWarning('Dados inválidos')
        console.log(err)
      })
  }
  return (
    <>
      <SafeAreaView>
        <StatusBar />
        <View style={[style.conteiner_screen, { backgroundColor: primaryColor }]}>
          <Image source={icon} style={style.icon} />

          <View style={[style.conteiner, style.conteiner_login]}>
            <Text style={style.text_login}>Fazer Login</Text>
            <View style={{ width: '100%' }}>
              <TextInput
                style={style.input}
                onChangeText={setLogin}
                value={login}
                placeholder='CPF ou Celular'
              />
              <TextInput
                style={style.input}
                onChangeText={setPassword}
                value={password}
                placeholder='Senha'
                secureTextEntry={true}
              />
              <Text style={{ color: '#fff' }}>{warning}</Text>
              <TouchableOpacity
                onPress={() => {
                  forgetPassword()
                }}
              >
                <Text style={style.text_sub_login}>Não lembro a senha</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[style.login_btn, { backgroundColor: secundaryColor }]}
                onPress={() => {
                  requestLogin()
                }}
              >
                <Text style={style.text_sub_login2}> Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 60 }}>
            <Text style={style.text_sub_login}>Ainda não tem cadastro?</Text>
            <TouchableOpacity
              style={style.conteiner}
              onPress={() => {
                console.log(route.params)
                navigation.navigate('Dados', route.params)
              }}
            >
              <Text style={[style.text_sub_login, { fontSize: 18 }]}>
                Cadastrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}
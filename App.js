import React, { useReducer, useState, useEffect } from 'react'
import { Provider } from 'react-redux';
import store from './src/store'
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  PermissionsAndroid
} from 'react-native'
import axios from 'axios'

//navigation and drawer
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'

//Image


//pages
import CompraExpress from './src/telas/CompraExpress'
import Home from './src/telas/Home'
import Carrinho from './src/telas/Carrinho'
import Login from './src/telas/Login'
import Dados from './src/telas/Dados'
import Pedido from './src/telas/Pedido'
import Pedidos from './src/telas/Pedidos'
import Alterar from './src/telas/Atualizar'

//FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import OneSignal from 'react-native-onesignal';
import Constants from "expo-constants";
import { WebView } from 'react-native-webview';

export default function App() {
  const [qntPedidos, setQnt] = useState(0)
  const [photo, setPhoto] = useState();
  const [name, setName] = useState('user');
  const [image, setImage] = useState('https://api.clubedorevendedordegas.com.br/files/clients/placeholder.jpg');
  const [primaryColor, setPrimaryColor] = useState('#db2800')
  const [secundaryColor, setSecundaryColor] = useState('#cda900')

  // useEffect(() => {
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
  // }, [])

  const MINUTE_MS = 2000;

  const reseller = 'expresso_gas_';



  useEffect(() => {
    const interval = setInterval(() => {
      if (global.clientId !== undefined && global.clientId !== null && global.clientId !== '') {
        axios.get('https://api.clubedorevendedordegas.com.br/ClienteFisico/' + global.clientId + '/' + reseller)
          .then(response => {
            setName(response.data[0].name);
            if (response.data[0].photo !== null) {
              setImage(response.data[0].photo);
            }

          }).catch(err => {
            console.log(err, 'Cliente Físico')
          })
        axios
          .post('https://api.clubedorevendedordegas.com.br/PedidoCliente', {
            client_id: global.clientId,
            db: reseller
          })
          .then(response => {
            setQnt(response.data.length)
          }).catch(err => {
            console.log(err, 'Qnt pedido client')
          })
      }

    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, [])


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

  // const permissionNotification = async () => {
  //   await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
  //     .then(() => {
  //       console.log('USUÁRIO ACEITOU NOTIFICAÇÃO')
  //     })
  // };

  // permissionNotification();

  const imageUploaderStyles = StyleSheet.create({
    container: {
      elevation: 2,
      height: 200,
      width: 200,
      backgroundColor: '#efefef',
      position: 'relative',
      borderRadius: 999,
      overflow: 'hidden',
    },
    uploadBtnContainer: {
      opacity: 0.7,
      position: 'absolute',
      right: 0,
      bottom: 0,
      backgroundColor: 'lightgrey',
      width: '100%',
      height: '25%',
    },
    uploadBtn: {
      display: 'flex',
      alignItems: "center",
      justifyContent: 'center'
    }
  })

  const addImage = async () => {
    let timestamp = Date.now()
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!_image.cancelled) {
      setImage(_image.assets[0].uri);
      global.photoUser = _image.assets[0].uri
      let splitType = _image.assets[0].mimeType.split('/');

      const formData = new FormData();
      formData.append('id', global.clientId);
      formData.append('image', {
        uri: _image.assets[0].uri,
        type: _image.assets[0].mimeType,
        name: global.clientId + '.' + splitType[1],
        db: reseller
      });
      formData.append('photo', "https://api.clubedorevendedordegas.com.br/files/clients/" + global.clientId + '.' + splitType[1]);
      axios({
        url: 'https://api.clubedorevendedordegas.com.br/AtualizarCadastroFisico',
        method: 'PUT',
        data: formData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        }
      })
    };
  }

  function DrawerList(props) {
    const width = useWindowDimensions().width * 0.7
    return (
      <DrawerContentScrollView {...props}>
        <View style={styles.menuContainer}>
          <View style={{ backgroundColor: primaryColor, width: width }}>
            <View>
              <DrawerItem
                label='Home'
                labelStyle={{ color: '#fff' }}
                onPress={() => {
                  props.navigation.navigate('Home')
                }}
              />
            </View>
          </View>

          <View style={{ backgroundColor: primaryColor, width: width }}>
            <View>
              <DrawerItem
                label='Compra Express'
                labelStyle={{ color: '#fff' }}
                onPress={() => {
                  props.navigation.navigate('CompraExpress')
                }}
              />
            </View>
          </View>

          <View style={{ backgroundColor: primaryColor, width: width }}>
            <View>
              <DrawerItem
                label='Carrinho'
                labelStyle={{ color: '#fff' }}
                onPress={() => {
                  props.navigation.navigate('Carrinho')
                }}
              />
            </View>
          </View>

          {global.clientId ? (
            <View style={{ backgroundColor: primaryColor, width: width }}>
              <View>
                <DrawerItem
                  label='Meus dados'
                  labelStyle={{ color: '#fff' }}
                  onPress={() => {
                    props.navigation.navigate('Alterar', 'Home')
                  }}
                />
              </View>
            </View>
          ) : null}

          {global.clientId ? (
            <View style={{ backgroundColor: primaryColor, width: width }}>
              <View>
                <DrawerItem
                  label='Lista de pedidos'
                  labelStyle={{ color: '#fff' }}
                  onPress={() => {
                    props.navigation.navigate('Pedidos')
                  }}
                />
              </View>
            </View>
          ) : null}

          {global.clientId ? (
            logout(width, props.navigation)
          ) : (
            <View style={{ backgroundColor: primaryColor, width: width }}>
              <View>
                <DrawerItem
                  label='Login'
                  labelStyle={{ color: '#fff' }}
                  onPress={() => {
                    props.navigation.navigate('Login', 'Home')
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </DrawerContentScrollView>
    )
  }

  function logout(width, navigation) {
    if (global.clientId) {
      return (
        <View style={{ backgroundColor: primaryColor, width: width }}>
          <View>
            <DrawerItem
              label='Sair'
              icon={() => (
                <FontAwesomeIcon
                  icon={faArrowRightToBracket}
                  size={12}
                  style={{ color: '#fff', marginLeft: 2 }}
                />
              )}
              labelStyle={{ color: '#fff' }}
              onPress={() => {
                global.clientId = null
                navigation.navigate('Home')
                clearAll()
              }}
            />
          </View>
        </View>
      )
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

  function DrawerMenu() {
    return (
      <LeftDrawer.Navigator
        drawerContent={props => DrawerList(props)}
        id='LeftDrawer'
        screenOptions={{
          drawerPosition: 'left',
          headerShown: false,
          drawerStyle: {
            backgroundColor: primaryColor
          },
          drawerInactiveTintColor: '#9D9D9D',
          drawerActiveTintColor: '#fff'
        }}
      >
        <LeftDrawer.Screen name='Home' component={Home} options={{}} />
        <LeftDrawer.Screen
          name='CompraExpress'
          component={CompraExpress}
          options={{}}
        />
        <LeftDrawer.Screen name='Carrinho' component={Carrinho} options={{}} />
        <LeftDrawer.Screen name='Login' component={Login} options={{}} />
        <LeftDrawer.Screen name='Dados' component={Dados} options={{}} />
        <LeftDrawer.Screen name='Pedido' component={Pedido} options={{}} />
        <LeftDrawer.Screen name='Alterar' component={Alterar} options={{}} />
        <LeftDrawer.Screen name='Pedidos' component={Pedidos} options={{}} />
      </LeftDrawer.Navigator>
    )
  }
  function RightDrawerContent(props) {
    const width = useWindowDimensions().width * 0.7
    return (
      <View style={styles.drawerProfile}>
        {global.clientId ? (
          <View
            style={[styles.menuContainer, { justifyContent: 'flex-start' }]}
          >
            <View style={imageUploaderStyles.container}>
              {
                image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
              }
              <View style={imageUploaderStyles.uploadBtnContainer}>
                <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                  <Text>Alterar foto</Text>
                  <AntDesign name="camera" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={[
                styles.menuContainer,
                { justifyContent: 'space-between' }
              ]}
            >
              <Text style={[styles.title_text, { color: primaryColor }]}>{name}</Text>

              <View style={qntPedidos ? { alignItems: 'center' } : { display: 'none' }}>
                <Text style={styles.sub_text}>Pedidos feitos:</Text>
                <Text style={styles.desc_text}>{qntPedidos}</Text>
              </View>

              <TouchableOpacity
                onPress={() => props.navigation.navigate('Alterar', 'Home')}
              >
                <Text
                  style={[
                    styles.sub_text,
                    {
                      textDecorationStyle: 'solid',
                      textDecorationLine: 'underline',
                      color: primaryColor
                    }
                  ]}
                >
                  {' '}
                  Alterar meus dados{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: primaryColor,
              width: width,
              borderRadius: 50
            }}
          >
            <View>
              <DrawerItem
                label='Fazer login'
                labelStyle={{ color: '#fff' }}
                onPress={() => {
                  props.navigation.navigate('Login', 'Home')
                }}
              />
            </View>
          </View>
        )}
      </View>
    )
  }

  function RightDrawerScreen() {
    return (
      <RightDrawer.Navigator
        id='RightDrawer'
        drawerContent={props => <RightDrawerContent {...props} />}
        screenOptions={{
          drawerPosition: 'right',
          headerShown: false
        }}
      >
        <RightDrawer.Screen name='HomeDrawer' component={DrawerMenu} />
      </RightDrawer.Navigator>
    )
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RightDrawerScreen />
      </NavigationContainer>
    </Provider>
  )

}

const LeftDrawer = createDrawerNavigator()
const RightDrawer = createDrawerNavigator()

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuItemsCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  conteiner: {
    flexDirection: 'row'
  },
  login_btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#016ca0',
    borderRadius: 20,
    paddingVertical: 8,
    marginHorizontal: 20
  },
  text_sub: {
    color: '#016ca0'
  },
  profile_img: {
    width: 140,
    height: 140,
    borderRadius: 100
  },
  drawerProfile: {
    backgroundColor: '#D9DADA',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 20
  },
  title_text: {
    color: '#016ca0',
    fontSize: 18,
    lineHeight: 25,
    fontWeight: 'bold',
    marginVertical: 10
  },
  desc_text: {
    color: '#016ca0',
    fontSize: 22,
    fontWeight: 'bold'
  },
  sub_text: {
    color: '#016ca0',
    fontSize: 18
  }
})

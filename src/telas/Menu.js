import React, { useState, useEffect } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native'
import axios from 'axios'
import { cleanCart } from '../store/ducks/cart/'
import { addExpress, cleanExpress } from '../store/ducks/expressCart';
import icon_home from '../../assets/icons/home.png'
import icon_express from '../../assets/icons/express.png'
import icon_local from '../../assets/icons/local.png'
import icon_card from '../../assets/icons/card.png'

import style from './Home/styles'
import { useSelector, useDispatch } from 'react-redux'

export default function tabBar(navigation) {
  const length = useSelector(state => state.cart.length);
  const dispatch = useDispatch();
  const [totalExpress, setTotalExpress] = useState();
  const [total, setTotal] = useState();
  const baseUrl = 'https://api.clubedorevendedordegas.com.br/'
  navigation = navigation.navigation

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
  //               setPrimaryColor('#016ca0');
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
  // }, [])


  const MINUTE_MS = 2000;

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof global.Shops == 'object') {
        setTotal(global.Shops.length);
      }
    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, [])

  // useEffect(() => {
  //   // const interval = setInterval(() => {
  //   // if (typeof global.clientId !== undefined) {
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
  //   // }

  //   // }, MINUTE_MS);
  //   // return () => clearInterval(interval);
  // }, [])
  const reseller = 'expresso_gas_';  
  async function loadListExpress() {
    setTotalExpress(0)
    let count = 0
    if (global.clientId) {
      await axios
        .get(baseUrl + 'TodosListaExpress/' + reseller)
        .then(response => {
          //Sucesso
          dispatch(cleanExpress())
          response.data.map((item, i) => {
            if (item.client_id == global.clientId) {
              dispatch(addExpress(item));
            }
          })
        })
        .catch(err => {
          setWarning('ops! ocorreu um erro' + err)
        })
    }
  }

  const lengthExpress = useSelector(state => state.expressCart.length);
  useEffect(() => {
    loadListExpress()
  }, [])

  return (
    <View style={[style.tabbar, { backgroundColor: primaryColor }]}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={icon_home} style={[style.icon_tabbar, { color: secundaryColor }]} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Carrinho')}>
        <View
          style={
            length == 0 && lengthExpress == 0
              ? { alignItems: 'center', display: 'none' }
              : { alignItems: 'center', position: 'absolute' }
          }
        >
          <View
            style={!length == 0 ? [style.conteiner_total, { backgroundColor: primaryColor }] : { display: 'none' }}
          >
            <Text style={style.text_total}>{length}</Text>
          </View>
        </View>
        <Image source={icon_card} style={[style.icon_tabbar_center, {
          backgroundColor: secundaryColor, borderRadius: 40,
        }]} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
        navigation.navigate('Pedidos')
      }}>
        <View
          style={
            length == 0
              ? { alignItems: 'center', display: 'none' }
              : { alignItems: 'center', position: 'absolute' }
          }
        >
          <View
            style={
              lengthExpress !== 0 ? style.conteiner_total2 : { display: 'none' }
            }
          >
            <Text style={style.text_total}>{lengthExpress}</Text>
          </View>
        </View>
        <Image source={icon_express} style={[style.icon_tabbar, { color: secundaryColor }]} />
      </TouchableOpacity>

    </View>
  )
}
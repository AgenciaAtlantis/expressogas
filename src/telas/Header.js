import React, { useReducer, useState, useEffect } from 'react'
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native'
import icon from '../../assets/logo.png'
import axios from 'axios'
import {
  faBars,
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import style from './Home/styles'


export default function appBar(navigation) {
  navigation = navigation.navigation
  const [image, setImage] = useState('https://api.clubedorevendedordegas.com.br/files/clients/placeholder.jpg');
  const [primaryColor, setPrimaryColor] = useState('#db2800')
  const [secundaryColor, setSecundaryColor] = useState('#cda900')
  const [logo, setLogo] = useState(icon);

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
  const reseller = 'expresso_gas_';  
  useEffect(() => {
    const interval = setInterval(() => {
      if (global.clientId !== undefined) {
        axios.get('https://api.clubedorevendedordegas.com.br/ClienteFisico/' + global.clientId + reseller)
          .then(response => {
            if (response.data[0].photo !== null) {
              setImage(response.data[0].photo);
            }
          })
      }

    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, [])

  // useEffect(() => {
  //   // const interval = setInterval(() => {
  //   // if (typeof global.clientId !== undefined) {
  //   axios
  //     .get('https://api.clubedorevendedordegas.com.br/TodosUsuariosRevenda/')
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

  useEffect(() => {
    axios
      .get("https://api.clubedorevendedordegas.com.br/Configuracoes/" + reseller)
      .then((response) => {
        // setLogo(response.data[0]['logoMenu']);
      })

      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [])

  return (
    <View style={[style.appbar, { backgroundColor: primaryColor }]}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <FontAwesomeIcon
          icon={faBars}
          style={[style.icon, { color: secundaryColor }]}
          size={26}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={logo} style={style.icone_gas} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => { console.log(navigation.getParent('RightDrawer')); navigation.getParent('RightDrawer').openDrawer() }}>
        <Image source={{ uri: image }} style={style.profile_img} />
      </TouchableOpacity>
    </View>
  )
}
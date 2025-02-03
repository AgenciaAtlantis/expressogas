import {
    StyleSheet
} from 'react-native'

export default StyleSheet.create({
    appbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#f62d01',
        paddingVertical: 8,
        paddingHorizontal: 10
      },
      icon: {
        color: '#f62d01'
      },
      icone_gas: {
        width: 22,
        height: 34
      },
      profile_img: {
        width: 32,
        height: 32,
        borderRadius: 50
      },
      tabbar: {
        backgroundColor: '#f62d01',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
      },
      icon_tabbar: {
        height: 34,
        width: 34
      },
      icon_tabbar_center: {
        height: 50,
        width: 50
      },
      conteiner_card: {
        marginVertical: 15,
        marginHorizontal: 35,
      },
      card: {
        marginVertical: 5,
        marginHorizontal: 15,
        paddingHorizontal: 15 ,
        paddingVertical: 10,
        flexDirection: 'row',
        borderRadius: 20
      },
      product_img: {
        width: 120,
        height: 120,
        marginRight: 20
      },
      product_name: {
        color: '#9D9D9D',
        fontSize: 20,
        fontWeight: 'bold'
      },
      sub_text: {
        color: '#9D9D9D',
        fontSize: 14
      },
      price_text: {
        color: '#f62d01',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5
      },
      text_sub: {
        color: '#f62d01'
      },
      conteiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      },
      conteiner_btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
      },
      btn_card: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginHorizontal: 20,
        backgroundColor: '#f62d01',
        borderRadius: 20,
      },
  text_btn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: '#fff'
  },
      icon_cart: {
        height: 34,
        width: 34,
        borderRadius: 20
      },
      conteiner_title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 20
      },
      title: {
        fontSize: 18,
        color: '#9D9D9D'
      },
      title2: {
        fontSize: 20,
        color: '#9D9D9D',
        fontWeight: 'bold'
      },
      text_status: {
        color: '#e00',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5
      },
      conteiner_dados: {
        marginVertical: 5,
        width: '90%'
      },
      icon_local: {
        color: '#fff',
        alignSelf: 'center'
      },
      conteiner_icon: {
        backgroundColor: '#f62d01',
        width: 25,
        height: 25,
        borderRadius: 50,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        marginRight: 10
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
})
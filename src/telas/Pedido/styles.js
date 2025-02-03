import {
    StyleSheet
} from 'react-native'

export default StyleSheet.create({
    appbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#2e3192 ',
        paddingVertical: 8,
        paddingHorizontal: 10
      },
      icon: {
        color: '#2e3192 '
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
        backgroundColor: '#2e3192 ',
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
      icon_pay: {
        height: 55,
        width: 55,
        marginRight: 5
      },
      conteiner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20
      },
      conteiner_card: {
        marginVertical: 10,
        marginHorizontal: 10
      },
      card: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      },
      product_img: {
        width: 100,
        height: 100,
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
      sub_text2: {
        color: '#2e3192 '
      },
      sub_text3: {
        color: '#2e3192 '
      },
      desc_text: {
        color: '#2e3192 ',
        fontSize: 14,
        marginVertical: 3
      },
      product_btn: {
        color: '#2e3192 '
      },
      conteiner_product: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        backgroundColor: '#2e3192 ',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginLeft: 10
      },
      icon_cart: {
        height: 44,
        width: 44
      },
      center: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
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
        fontSize: 18,
        color: '#2e3192 '
      },
      cancel_btn: {
        color: '#9D9D9D',
        marginBottom: 80,
        marginRight: 20,
        fontSize: 18,
        fontWeight: 'bold'
      },
      buy_btn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2e3192 ',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginBottom: 40,
        marginHorizontal: 60
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonClose: {
        backgroundColor: '#2196F3'
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center'
      },
      product_total: {
        color: '#9D9D9D',
        fontSize: 20,
        fontWeight: 'bold'
      },
      price_total: {
        color: '#2e3192 ',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 5
      },
      conteiner_total: {
        alignItems: 'flex-end',
        marginHorizontal: 10,
        marginVertical: 5
      },
      conteiner_pays: { marginHorizontal: 20, marginVertical: 10 },
      option: {
        color: '#eeb757',
        fontWeight: 'bold',
        fontSize: 16
      },
      unselected: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EDEDED',
        marginVertical: 5,
        borderRadius: 10,
        padding: 10
      },
      selected: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2e3192 ',
        marginTop: 5,
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        color: '#fff'
      },
      conteiner_none: {
        display: 'none'
      },
      conteiner_pay_select: {
        borderColor: '#2e3192 ',
        borderWidth: 1,
        padding: 5
      },
      conteiner_dados: {
        backgroundColor: '#EDEDED',
        paddingHorizontal: 20,
        paddingVertical: 40,
        marginVertical: 20
      },
      row: {
        flexDirection: 'row',
        marginBottom: 5
      },
      conteiner_basic: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      input: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        borderColor: '#fff',
        backgroundColor: '#fff'
      }
})
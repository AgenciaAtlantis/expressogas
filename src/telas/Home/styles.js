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
    color: '#eeb757'
  },
  icone_gas: {
    width: 100,
    height: 40
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
    width: 34,
  },
  icon_tabbar_center: {
    height: 70,
    width: 70,
    position: "absolute",
    top: -45,
    left: -40
  },
  conteiner_card: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  card: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  product_img: {
    width: 120,
    height: 120,
    marginRight: 20
  },
  product_name: {
    color: '#9D9D9D',
    fontSize: 18,
    fontWeight: 'bold',
    width: 140
  },
  sub_text: {
    color: '#9D9D9D',
    fontSize: 14,
    width: 180
  },
  price_text: {
    color: '#f62d01',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5
  },
  price_text_promotional_value: {
    color: '#f62d01',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5
  },
  price_text_promotional: {
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
  product_btn: {
    color: '#f62d01'
  },
  conteiner: {
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
    backgroundColor: '#eeb757',
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 10
  },
  icon_cart: {
    height: 34,
    width: 34,
    borderRadius: 20
  },
  conteiner_warning: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#eeb757',
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 20
  },
  text_warning: {
    color: '#fff'
  },
  conteiner_total: {
    backgroundColor: '#4067bf',
    width: 15,
    height: 15,
    borderRadius: 20,
    position: 'absolute',
    left: 10,
    top: -48,
    alignItems: 'center',
    zIndex: 9999
  },
  conteiner_total2: {
    backgroundColor: '#4067bf',
    width: 15,
    height: 15,
    borderRadius: 20,
    position: 'absolute',
    left: 22,
    top: -10,
    alignItems: 'center',
    zIndex: 9999
  },
  text_total: {
    color: '#fff',
    fontSize: 11
  }
})

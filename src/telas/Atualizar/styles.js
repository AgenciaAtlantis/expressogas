import {
    StyleSheet
} from 'react-native'

export default StyleSheet.create({
    conteiner_screen: {
        backgroundColor: '#f62d01',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    conteiner_scroll: {
        width: '80%',
        marginVertical: 10
    },
    text_desc: {
        color: '#fff',
        fontSize: 18
    },
    text_sub_login: {
        color: '#f62d01'
    },
    input: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        borderColor: '#fff',
        backgroundColor: '#fff'
    },
    conteiner: {
        alignItems: 'center',
        marginVertical: 10
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeb757',
        borderRadius: 20,
        paddingVertical: 8,
        marginVertical: 10
    },
    text_sub: {
        color: 'white'
    },
    borderError: {
        borderWidth: 1,
        borderColor: 'rgba(200,0,50,1)'
    },
    errorMessage: {
        fontSize: 12,
        color: 'rgba(200,0,50,1)',
        textAlign: 'center',
        marginTop: 5
    },
    title: {
        fontSize: 18,
        color: '#9D9D9D'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
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
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: '40%',
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})

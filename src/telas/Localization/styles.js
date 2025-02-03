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
        backgroundColor: '#f62d01',
        borderRadius: 20,
        paddingVertical: 8,
        marginVertical: 15
    },
    text_sub: {
        color: '#f62d01'
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
    }
})

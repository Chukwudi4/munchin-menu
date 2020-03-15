import React from 'react'
import {Text, View, Image, StyleSheet} from 'react-native'
import {
    widthPercentageToDP as w,
    heightPercentageToDP as h
} from 'react-native-responsive-screen'
export function Card({url, title, cardStyle, subtitle}) {
    return(
        <View style={[styles.itemView, {...cardStyle}]}>
            <Image style={styles.itemImage} source={{uri: url}} />
            <Text style={styles.itemTitle} >{title}</Text>
            <Text style={styles.itemSubtitle} >{subtitle}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    itemView: {
        width: w(41),
        height: h(30),
        borderRadius: w(2),
        borderColor: '#000',
        borderWidth: w(0),
        justifyContent: 'flex-start',
        alignItems: 'center',
        elevation: 1
    },
    itemImage: {
        width: '100%',
        height: '70%',
        borderRadius: w(2),
    },
    itemTitle: {
        fontSize: w(4),
        paddingTop: w(2),
        fontWeight: 'bold',
        textAlign: 'center',
        width: "90%"
    },
    itemSubtitle: {
        fontSize: w(3),
        textAlign: 'center'
    }
})
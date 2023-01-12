import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import Vectores from '../../functions/Vector';
import Images from "../../assets/images/Images";

const getImage = (name) => {
    for (let i = 0; i < Images.length; i++) {
        if (Images[i].name == name) {
            return Images[i].src;
        }
    }
    return null;
}

export default function Player(props) {
    const { player, selected, setSelected } = props;
    console.log(player);
    console.log(selected);
    
    var aldeanoImagen = getImage(`aldeano.jpg`);

    const getColorPlayer = () => {
        return {
            backgroundColor: player.color,
        }
    }

    return (
        <TouchableOpacity
        onPress={() =>{setSelected(player.id)}}
        style={selected == player.id?[styles.container, getColorPlayer(),styles.selected]:[styles.container, getColorPlayer()]}
        >
            <View style={[styles.row, styles.principal]}>
                <View style={styles.column}>
                    <Image source={aldeanoImagen} style={styles.image} />
                    <Text style={styles.rol}>aldeano</Text>
                </View>
                <Text style={styles.id}>{player.id}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: Vectores.vh(15),
        maxHeight: Vectores.vh(30),
        width: "90%",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 5,
        paddingVertical: 5,
        opacity: 0.7,
    },
    selected: {
        borderWidth:5,
        borderColor: "black"
    },
    row: {
        width: "100%",
        height:"100%",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    column: {
        width: "40%",
        height:"100%",
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    principal: {
        width: "100%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
     id: {
        fontSize: 36,
        fontWeight: '900',
        letterSpacing: 4,
        marginVertical: Vectores.vh(1),
        color: "white",
        textAlign: 'center',
    },
    rol: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginVertical: Vectores.vh(1),
        color: "white",
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    input: {
        fontSize: Vectores.vw(5),
        height: Vectores.vh(5),
        width: "80%",
        padding: Vectores.vw(2),
        borderWidth: 1,
        borderColor: "white",
    },
    image: {
        width: Vectores.vw(20),
        height: Vectores.vw(20),
        resizeMode: "contain",
        marginLeft: "auto",
        marginRight: "auto",
    },
});

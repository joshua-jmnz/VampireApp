import React, { useEffect, useState } from "react";
import { View, Text, Alert, Modal, StyleSheet, Pressable, TouchableOpacity, Image } from "react-native";
import Vectores from "../functions/Vector";
import Button from "./VampireButton";
import Images from "../assets/images/Images"

const getImage = (name) => {
    for (let i = 0; i < Images.length; i++) {
        if (Images[i].name == name) {
            return Images[i].src;
        }
    }
    return null;
}

var vampireImagen = getImage(`vampiro.jpg`);

export default function Die(props) {
    const { setInGame, endGame, die, setDie, setMeeting } = props;
    console.log(die);
    const [image, setImage] = useState(null);
    useEffect(() => {
        if (die) {
            let aux = getImage(`${die.caracter}.jpg`);
            console.log("imagen", aux);
            setImage(aux);
        }
    }, [die]);
    return (
        <View style={styles.container}>
            <Text style={[styles.ins, styles.title]}>Ha muerto</Text>
            <Text style={[styles.name, { color: die.color }]}>{die.id}</Text>
            <Text style={styles.ins}>Roles</Text>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Image source={image} style={styles.image} />
                    <Text style={styles.caracter}>{die.caracter}</Text>
                </View>
                {
                    die.vampire ?
                        <View style={styles.column}>
                            <Image source={vampireImagen} style={styles.image} />
                            <Text style={[styles.caracter, styles.vampiro]}>Vampiro</Text>
                        </View>
                        : null
                }
            </View>
            {
                endGame ?
                    <>
                        <Text style={[styles.ins, styles.title]}>JUEGO TERMINADO</Text>
                        <Text style={styles.ins}>{endGame}</Text>
                        <Button text={"Terminar"} size={"medium"} type={"secondary"} fnc={() => { setDie(null); setInGame(false); }} />
                    </>
                    :
                    <>
                        <Button text={"Continuar"} size={"medium"} type={"secondary"} fnc={() => { setDie(null); setMeeting(true) }} />

                    </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 52,
        fontWeight: '900',
        letterSpacing: 4,
        marginVertical: Vectores.vh(1),
    },
    image: {
        width: Vectores.vw(20),
        height: Vectores.vw(20),
        resizeMode: "contain",
        marginLeft: "auto",
        marginRight: "auto",
    },
    row: {
        width: "100%",
        height: "30%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    column: {
        marginHorizontal: Vectores.vw(5),
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    ins: {
        fontSize: Vectores.vw(6),
        fontWeight: "bold",
        textAlign: "center",
        color: "black",
    },
    caracter: {
        fontSize: Vectores.vw(6),
        fontWeight: "normal",
        textAlign: "center",
        textTransform: "uppercase",
        color: "black",
    },
    vampiro: {
        color: "red",
    },
    name: {
        fontSize: Vectores.vw(8),
        fontWeight: "bold",
        textAlign: "center",
    },
});

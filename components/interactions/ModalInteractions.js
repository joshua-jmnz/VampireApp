import React, { useEffect, useState } from "react";
import { View, Text, Alert, Modal, StyleSheet, Pressable, TouchableOpacity, Image } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { AntDesign } from '@expo/vector-icons';
import Vectores from "../../functions/Vector";
import Button from "../VampireButton";
import Images from "../../assets/images/Images";

const getImage = (name) => {
    for (let i = 0; i < Images.length; i++) {
        if (Images[i].name == name) {
            return Images[i].src;
        }
    }
    return null;
}

var vampireImagen = getImage(`vampiro.jpg`);

export default function ModalInteraction(props) {

    const { phase, modalVisible, setModalVisible, modalType, player, players, setPlayers, converted, setConverted, healed, setHealed, hallowed, setHallowed, analyzed, setAnalyzed } = props;
    
    const [analizedPerson, setAnalyzedPerson] = useState();
    const [image, setImage] = useState(null);
    const [types, setTypes] = useState([
        {
            title: "Vampiro",
        },
        {
            title: "Cura",
        },
        {
            title: "Santo"
        },
        {
            title: "Psiquico",
        },
        {
            title: "Aldeano",
        },
    ]);
    useEffect(() => {
        if (analizedPerson) {
            let aux = getImage(`${analizedPerson.caracter}.jpg`);
            console.log("imagen", aux);
            setImage(aux);
        }
    }, [analizedPerson]);

    const selectTypeTitle = () => {
        var type = types[modalType];
        console.log(type);
        return type?.['title'];
    }
    const alivePlayers = () => {
        let alive = [];
        players.map((p, i) => {
            if (p.alive) {
                alive.push(p);
            }
        });
        return alive;
    }
    const searchAnalyzedPerson = () => {
        let analizada = players.find((p) => p.id == analyzed);
        setAnalyzedPerson(analizada);
    }
    const selectContentType = () => {
        var alive = alivePlayers();
        var aliveList = alive.map((a) => {
            return { label: a.id, value: a.id }
        });
        var humanAlive = [];
        alive.map((p, i) => {
            if (!p.vampire) {
                humanAlive.push(p);
            }
        });
        console.log(humanAlive);
        var humanAliveList = humanAlive.map((a) => {
            return { label: a.id, value: a.id }
        })
        switch (modalType) {
            case 0:
                return (
                    <View style={styles.content}>
                        <Text style={styles.ins}>A quien deseas convertir?</Text>
                        <RNPickerSelect
                            value={converted}
                            placeholder={{ label: "Selecciona", value: "Selecciona" }}
                            onValueChange={(value) => { setConverted(value) }}
                            items={humanAliveList}
                            style={pickerSelectStyles}
                        />
                        <Button text={"Convertir"} size={"medium"} type={"secondary"} fnc={() => { setModalVisible(!modalVisible) }} />
                    </View>
                );
            case 1:
                return (
                    <View style={styles.content}>
                        <Text style={styles.ins}>A quien deseas curar?</Text>
                        <RNPickerSelect
                            value={healed}
                            placeholder={{ label: "Selecciona", value: "Selecciona" }}
                            onValueChange={(value) => { setHealed(value) }}
                            items={aliveList}
                            style={pickerSelectStyles}
                        />
                        <Button text={"Curar"} size={"medium"} type={"secondary"} fnc={() => { setModalVisible(!modalVisible) }} />
                    </View>
                );
            case 2:
                return (
                    <View style={styles.content}>
                        <Text style={styles.ins}>A quien deseas santificar?</Text>
                        <RNPickerSelect
                            value={hallowed}
                            placeholder={{ label: "Selecciona", value: "Selecciona" }}
                            onValueChange={(value) => { setHallowed(value) }}
                            items={aliveList}
                            style={pickerSelectStyles}
                        />
                        <Button text={"Santificar"} size={"medium"} type={"secondary"} fnc={() => { setModalVisible(!modalVisible) }} />
                    </View>
                );
            case 3:
                return (
                    <View style={styles.content}>
                        {
                            !analizedPerson ?
                                <>
                                    <Text style={styles.ins}>De quien deseas saber información?</Text>
                                    <RNPickerSelect
                                        value={analyzed}
                                        placeholder={{ label: "Selecciona", value: "Selecciona" }}
                                        onValueChange={(value) => { setAnalyzed(value) }}
                                        items={aliveList}
                                        style={pickerSelectStyles}
                                    />
                                    <Button text={"Investigar"} size={"medium"} type={"secondary"} fnc={() => { searchAnalyzedPerson() }} />
                                </>
                                :
                                <>
                                    <Text style={[styles.name,{color:analizedPerson.color}]}>{analyzed}</Text>

                                    <Text style={styles.ins}>Roles</Text>
                                    <View style={styles.row}>
                                        <View style={styles.column}>
                                            <Image source={image} style={styles.image} />
                                            <Text style={styles.caracter}>{analizedPerson.caracter}</Text>
                                        </View>
                                        {
                                            analizedPerson.vampire ?
                                                <View style={styles.column}>
                                                    <Image source={vampireImagen} style={styles.image} />
                                                    <Text style={[styles.caracter, styles.vampiro]}>Vampiro</Text>
                                                </View>
                                                : null
                                        }
                                    </View>

                                    <Button text={"Regresar"} size={"medium"} type={"secondary"} fnc={() => { setModalVisible(!modalVisible) }} />
                                </>
                        }
                    </View>
                );
            case 4:
                return (
                    <View style={styles.content}>
                        <Text style={styles.ins}>No hay mucho que hacer :/</Text>
                        <Button text={"Cerrar"} size={"medium"} type={"secondary"} fnc={() => { setModalVisible(!modalVisible) }} />
                    </View>
                );
            default:
                break;
        }
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => { setModalVisible(!modalVisible) }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}
                    lightColor={'white'}
                    darkColor={"rgba(18,18,18,1)"}
                >
                    <View style={styles.header}>
                        <View style={styles.back} />
                        <Text style={styles.title}>{selectTypeTitle()}</Text>
                        <TouchableOpacity
                            style={styles.back}
                            onPress={() => { setModalVisible(!modalVisible) }}
                        >
                            <AntDesign name="closecircle" size={Vectores.vw(8)} color="red" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        {selectContentType()}
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'transparent',
    },
    modalView: {
        backgroundColor: 'white',
        height: "60%",
        width: "100%",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        fontSize: Vectores.vw(4),
        height: Vectores.vh(6),
        marginVertical: Vectores.vw(6),
        borderWidth: 1,
        borderColor: "black",
        color: "gray",
    },
    title: {
        fontSize: Vectores.vw(6),
        fontWeight: "bold",
        textAlign: "center",
        width: "70%",
        color: "white",
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
    unidad: {
        fontSize: Vectores.vw(4),
        marginLeft: Vectores.vw(2),
    },
    header: {
        height: "10%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        flexDirection: "row",
    },
    back: {
        height: "100%",
        width: "15%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    content: {
        height: "80%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    row: {
        height: "50%",
        width: "100%",
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
    button: {
        backgroundColor: "red",
        width: '80%',
        height: "30%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: Vectores.vw(20),
        height: Vectores.vw(20),
        resizeMode: "contain",
        marginLeft: "auto",
        marginRight: "auto",
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: Vectores.vw(5),
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: Vectores.vw(4),
        height: Vectores.vh(6),
        margin: Vectores.vw(2),
        borderWidth: 1,
        borderColor: "gray",
        padding: Vectores.vw(2),
        color: "gray",
        paddingRight: 30 // to ensure the text is never behind the icon
    }

});
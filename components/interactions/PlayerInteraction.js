import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import Vectores from '../../functions/Vector';
import { MaterialIcons } from '@expo/vector-icons';
import Images from "../../assets/images/Images";
import Button from '../VampireButton';
import ModalInteractions from "./ModalInteractions"
const getImage = (name) => {
    for (let i = 0; i < Images.length; i++) {
        if (Images[i].name == name) {
            return Images[i].src;
        }
    }
    return null;
}

export default function PlayerInteraction(props) {
    const rolesDesc = [
        { rol: "vampiro", desc: "Convierte a los humanos e incrementa tu legado" },
        { rol: "cura", desc: "Cura a las personas a punto de ser convertidas" },
        { rol: "santo", desc: "Santifica a los vampiros de la villa" },
        { rol: "psiquico", desc: "Adquiere información de los habitantes" },
        { rol: "aldeano", desc: "Busca información y encuentra vampiros" }];

    const { phase, player, players, setPlayers, converted, setConverted, healed, setHealed, hallowed, setHallowed, analyzed, setAnalyzed } = props;

    console.log(player);
    const [show, setShow] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [pin, setPin] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(1);

    var image = getImage(`${player.caracter}.jpg`);
    var aldeanoImagen = getImage(`aldeano.jpg`);

    const getColorPlayer = () => {
        return {
            backgroundColor: player.color,
        }
    }

    const getRol = () => {
        let found = rolesDesc.findIndex(({ rol }) => rol == player.caracter);
        setModalType(found);
    }
    const verify = () => {
        if (pin == "") {
            return;
        }
        if (pin == player.pin) {
            setShow(!show);
            setPin("");
        }
    }
    const getButtonsPhase = () => {
        if (phase == 1 && player.caracter != "psiquico") {
            return (
                <>
                    <Button text={"Realizar acciones"} size={"small"} type={"third"} fnc={() => { getRol(); setModalVisible(!modalVisible) }} />
                    {
                        player.vampire ?
                            <Button text={"Convertir"} size={"small"} type={"primary"} fnc={() => { setModalType(0); setModalVisible(!modalVisible) }} />
                            : null
                    }
                    <Button text={"Ocultar"} size={"small"} type={"secondary"} fnc={() => { setShow(!show) }} />
                </>
            );
        }  
        if (phase == 1 && player.caracter == "psiquico"){
            return (
                <>
                    {
                        player.vampire ?
                            <Button text={"Convertir"} size={"small"} type={"primary"} fnc={() => { setModalType(0); setModalVisible(!modalVisible) }} />
                            : null
                    }
                    <Button text={"Ocultar"} size={"small"} type={"secondary"} fnc={() => { setShow(!show) }} />
                </>
            )
        }
        if (phase == 2 && player.caracter == "psiquico") {
            return (
                <>
                    <Button text={"Realizar acciones"} size={"small"} type={"third"} fnc={() => { getRol(); setModalVisible(!modalVisible) }} />
                    <Button text={"Ocultar"} size={"small"} type={"secondary"} fnc={() => { setShow(!show) }} />
                </>
            );
        }else{
            return(
                <>
                <Text style={styles.title}>No puedes hacer nada en esta fase</Text>
                <Button text={"Ocultar"} size={"small"} type={"secondary"} fnc={() => { setShow(!show) }} />
                </>
            )
        }

    }
    return (
        <View style={[styles.container, getColorPlayer()]}>
            <ModalInteractions phase={phase} modalVisible={modalVisible} setModalVisible={setModalVisible} modalType={modalType}
                player={player} players={players} setPlayers={setPlayers}
                converted={converted} setConverted={setConverted}
                healed={healed} setHealed={setHealed}
                hallowed={hallowed} setHallowed={setHallowed}
                analyzed={analyzed} setAnalyzed={setAnalyzed} />
            <View style={styles.head}>
                <Text style={styles.id}>{player.id}</Text>
            </View>
            <View style={[styles.row, styles.principal]}>
                <View style={[styles.column, styles.rolData]}>
                    {
                        show ?
                            <>
                                <Image source={image} style={styles.image} />
                                <Text style={styles.rol}>{player.caracter}</Text>
                                {
                                    player.vampire ?
                                        <Text style={styles.rolVampiro}>Vampiro</Text> :
                                        null
                                }
                            </>
                            :
                            <>
                                <Image source={aldeanoImagen} style={styles.image} />
                                <Text style={styles.rol}>aldeano</Text>
                            </>
                    }

                </View>
                <View style={[styles.column, styles.rolInfo]}>
                    {
                        show ?
                            <>
                                {
                                    getButtonsPhase()

                                }

                            </>
                            :
                            <>
                                <Text style={styles.title}>Ingresa tu PIN para realizar acciones</Text>
                                <View style={styles.row}>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(e) => setPin(e)}
                                        placeholder={"Ingresa tu PIN"}
                                        keyboardType={"numeric"}
                                        autoCapitalize={"none"}
                                        secureTextEntry={!showPassword}
                                        placeholderTextColor={"white"}
                                        maxLength={4}
                                    />
                                    <TouchableOpacity onPress={() => {
                                        setShowPassword(!showPassword)
                                    }}
                                        style={styles.iconStyle}>
                                        <>
                                            {showPassword ?
                                                <MaterialIcons name="visibility" size={Vectores.vw(5)} color={"white"} />
                                                :
                                                <MaterialIcons name="visibility-off" size={Vectores.vw(5)} color={"white"} />
                                            }
                                        </>
                                    </TouchableOpacity>
                                </View>
                                <Button text={"Ver"} size={"small"} type={"secondary"} fnc={() => { verify() }} />
                            </>
                    }


                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: Vectores.vh(30),
        maxHeight: Vectores.vh(40),
        width: "90%",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 3,
        opacity: 0.7,
    },
    row: {
        width: "100%",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    column: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    principal: {
        width: "100%",
        height: "80%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    rolData: {
        width: "30%",
    },
    rolInfo: {
        width: "70%",
    },
    head: {
        height: "20%",
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: Vectores.vh(1),
        color: "white",
        textAlign: 'center',
    },
    id: {
        fontSize: 32,
        fontWeight: 'bold',
        letterSpacing: 4,
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
    rolVampiro: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 2,
        marginVertical: Vectores.vh(1),
        color: "red",
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    iconStyle: {
        width: Vectores.vw(5),
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "transparent",
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

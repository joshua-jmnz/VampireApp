import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import Vector from '../../functions/Vector';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Row(props) {
    const { id, player, players, setPlayers } = props;
    // const [id, setId] = useState(player?.id);
    const dropPlayer = () => {
        let aux = [...players];
        if(aux.length <= 4){
            return;
        }
        aux.splice(id,1);
        setPlayers(aux);
    }
    const changeId = (value) => {
        let aux = [...players];
        aux[id].id = value;
        setPlayers(aux);
    }
    const changePin = (value) => {
        let aux = [...players];
        aux[id].pin = value;
        setPlayers(aux);
    }
    const changeColor = (value) => {
        let aux = [...players];
        aux[id].pin = value;
        setPlayers(aux);
    }
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity style={styles.column} onPress={() => { return; }}>
                    <FontAwesome name="user" size={Vector.vh(4)} color={player?.color} />
                </TouchableOpacity>
                <View style={styles.column1}>
                    <TextInput
                        value={player?.id}
                        style={styles.input}
                        onChangeText={(value) => { changeId(value) }}
                        keyboardType={"default"}
                        placeholderTextColor={"#5E5E5E"}
                        maxLength={10}
                    />
                </View>
                <View style={styles.column1}>
                    <TextInput
                        style={styles.input}
                        value={player.pin || ""}
                        onChangeText={(value) => changePin(value)}
                        placeholder={"PIN"}
                        keyboardType={"numeric"}
                        autoCapitalize={"none"}
                        secureTextEntry={true}
                        placeholderTextColor={"gray"}
                        maxLength={4}
                    />
                </View>
                <TouchableOpacity style={styles.column} onPress={() => { dropPlayer() }}>
                    <FontAwesome name="trash" size={Vector.vh(3)} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight: Vector.vh(10),
        maxHeight: Vector.vh(12),
        width: "100%",
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 14,
        fontWeight: '900',
        marginVertical: Vector.vh(1),
        textTransform: 'uppercase'
    },
    row: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderTopWidth: 0,
        // borderBottomWidth: 0,
    },
    column: {
        width: "15%",
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    column1: {
        width: "35%",
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        fontSize: Vector.vw(4),
        height: "80%",
        width: "100%",
        borderWidth: 1,
        borderColor: "white",
        color: "black",
        textAlign: "center",
    },
});

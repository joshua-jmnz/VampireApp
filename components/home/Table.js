import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Vector from '../../functions/Vector';
import Row from "./Row";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Table(props) {
    const {players, setPlayers} = props;

    const showPlayers = () =>{
        return players.map((player, i) => (<Row key={i} id={i} player={player} players={players} setPlayers={setPlayers}/>));
    }
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.title}></Text>
                </View>
                <View style={styles.column1}>
                    <Text style={styles.title}>nombre</Text>
                </View>
                <View style={styles.column1}>
                    <Text style={styles.title}>pin</Text>
                </View>
                <View style={styles.column}/>
            </View>
            {showPlayers()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        minHeight:Vector.vh(10),
        maxWidth:Vector.vw(100),
        width: "90%",
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Vector.vh(3),
    },
    title: {
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 4,
        marginVertical: Vector.vh(1),
        color:"white",
        textTransform:'uppercase'
    },
    row: {
        width: "100%",
        flexDirection: "row",
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
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
});

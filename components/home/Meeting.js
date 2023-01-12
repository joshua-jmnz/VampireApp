import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import Button from '../VampireButton';
import Vectores from '../../functions/Vector';
import Player from './Player';

export default function Meeting(props) {
    const { players, setPlayers, setMeeting, setGallows, selected, setSelected, setEndGame } = props;

    const callPlayers = () => {
        let alivePlayers = [];
        players.map((p, i) => {
            if (p.alive) {
                alivePlayers.push(p);
            }
        });
        return alivePlayers.map((p, i) => (<Player key={i} player={p} selected={selected} setSelected={setSelected} />));
    }
    const kill = () => {
        let aux = [...players];
        let found = aux.findIndex((p) => selected == p.id);
        console.log("f", found);
        aux[found].alive = false;
        checkEndGame();
        setPlayers(aux);
        setMeeting(false);
        setGallows(true);
    }
    const checkEndGame = () => {
        let vampires = [];
        let humans = [];
        var alive = alivePlayers();
        alive.map((p, i) => {
            if (!p.vampire) {
                humans.push(p);
            }
        });
        alive.map((p, i) => {
            if (p.vampire) {
                vampires.push(p);
            }
        });

        console.log(vampires);
        console.log(humans);
        if(vampires.length == 0){
            setEndGame("Aldeanos ganan, todos los vampiros muertos");
        }
        if(vampires.length == 1 && humans.length == 1 ){
            setEndGame("Vampiros ganan");
        }
        if(vampires.length == 2 && humans.length == 2){
            setEndGame("Vampiros ganan");
        }
        if(vampires.length > humans.length){
            setEndGame("Vampiros ganan");
        }
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
    return (
        <SafeAreaView style={styles.content}>
            <Text style={styles.title}>REUNION</Text>
            <Text style={styles.title}>Se despiertan todos...</Text>
            <Text style={styles.title}>Seleccionen al sospechoso a morir</Text>
            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.container}>
                    {
                        callPlayers()
                    }
                    <Button text={"A la horca"} size={"large"} type={"primary"} fnc={() => { kill() }} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    scrollViewContainer: {
        width: "100%",
        height: "100%",
    },
    content: {
        width: "100%",
        height: "100%",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: Vectores.vh(1),
        color: "black",
        textAlign: 'center',
    },
});

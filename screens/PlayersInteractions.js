import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import PlayerInteraction from '../components/interactions/PlayerInteraction';
import Button from '../components/VampireButton';
import Vectores from '../functions/Vector';
import { useState } from 'react';
export default function PlayersInteractions(props) {
    const { endGame, setEndGame, players, setPlayers, setInteraction, setDie, setMeeting } = props;
    const [converted, setConverted] = useState(null);
    const [healed, setHealed] = useState(null);
    const [hallowed, setHallowed] = useState(null);
    const [analyzed, setAnalyzed] = useState(null);
    const [phase, setPhase] = useState(1);
    const callPlayers = () => {
        let alivePlayers = [];
        players.map((p, i) => {
            if (p.alive) {
                alivePlayers.push(p);
            }
        });
        return alivePlayers.map((p, i) => (<PlayerInteraction key={i} player={p} players={players} setPlayers={setPlayers} phase={phase}
            converted={converted} setConverted={setConverted}
            healed={healed} setHealed={setHealed}
            hallowed={hallowed} setHallowed={setHallowed}
            analyzed={analyzed} setAnalyzed={setAnalyzed}
        />));
    }
    console.log(converted, healed, hallowed, analyzed);
    const closeInteractions = () => {
        if (phase == 1) {
            newVampire();
            setPhase(current => current + 1);
        } else {
            hallowing();
            setAnalyzed(null);
            setHallowed(null);
            setConverted(null);
            setHealed(null);
            setInteraction(false);
        }
    }
    const newVampire = () => {
        if(healed){
            if (converted == healed) {
                return;
            }
        }
        let aux = [...players];
        let found = aux.findIndex((p) => converted == p.id);
        aux[found].vampire = true;
        setPlayers(aux);

    }
    const hallowing = () => {
        if (!hallowed) { return; }
        let aux = [...players];
        let found = aux.findIndex((p) => hallowed == p.id);
        console.log("f", found);
        if (aux[found].vampire) {
            setDie(aux[found]);
            aux[found].alive = false;
            checkEndGame();
        } else {
            setMeeting(true);
        }
        setPlayers(aux);
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
        if (vampires.length == 0) {
            setEndGame("Aldeanos ganan, todos los vampiros muertos");
        }
        if (vampires.length == 1 && humans.length == 1) {
            setEndGame("Vampiros ganan");
        }
        if (vampires.length == 2 && humans.length == 2) {
            setEndGame("Vampiros ganan");
        }
        if (vampires.length > humans.length) {
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
            <Text style={styles.title}>{`Fase ${phase}`}</Text>
            <Text style={styles.title}>Realiza las acciones de tu personaje</Text>
            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.container}>
                    {
                        callPlayers()
                    }
                    <Button text={"Continuar"} size={"large"} type={"primary"} fnc={() => { closeInteractions() }} />
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

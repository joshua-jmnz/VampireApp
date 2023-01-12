import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import Button from '../components/VampireButton';
import Table from '../components/home/Table';
import Vector from '../functions/Vector';
import PlayersCall from './PlayersCall';
import PlayersInteractions from './PlayersInteractions';
import { getRandomInt } from '../functions/random';
import Die from '../components/Die';
import Meeting from '../components/home/Meeting';
import Gallows from '../components/Gallows';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Home() {
    const roles = ["vampiro", "cura", "santo", "psiquico"];
    const colors = ["green", "orange", "blue", "coral",
        "magenta", "pink", "gray", "brown", "yellow", "gold",];
    const [selected, setSelected] = useState();
    const [inGame, setInGame] = useState();
    const [call, setCall] = useState();
    const [interaction, setInteraction] = useState();
    const [die, setDie] = useState();
    const [meeting, setMeeting] = useState();
    const [gallows, setGallows] = useState();
    const [endGame, setEndGame] = useState();
    const [players, setPlayers] = useState([
        {
            id: "Player 1",
            color: "green",
            alive: true,
            vampire: false,
            pin: null,
            caracter: null,
        },
        {
            id: "Player 2",
            color: "orange",
            alive: true,
            vampire: false,
            pin: null,
            caracter: null,
        },
        {
            id: "Player 3",
            color: "blue",
            alive: true,
            vampire: false,
            pin: null,
            caracter: null,
        },
        {
            id: "Player 4",
            color: "coral",
            alive: true,
            vampire: false,
            pin: null,
            caracter: null,
        },
    ]);
    console.log(players);
    const freeColors = () => {
        let freeColors = [];
        let usedColors = [];
        for (let i = 0; i < players.length; i++) {
            for (let j = 0; j < colors.length; j++) {
                if (players[i].color == colors[j]) {
                    usedColors.push(colors[j]);
                }

            }
        }
        for (let i = 0; i < colors.length; i++) {
            if (usedColors.find((used) => used == colors[i])) {

            } else {
                freeColors.push(colors[i]);
            }

        }
        return freeColors;
    }
    const newPlayer = () => {
        let number = players.length + 1;
        const MAX_PLAYERS = colors.length;
        if (number > MAX_PLAYERS) {
            return;
        }
        let freeColor = freeColors();
        let player = {
            id: `Player ${number}`,
            color: freeColor[0],
            alive: true,
            vampire: false,
            pin: null,
            caracter: null,
        };
        let aux = [...players];
        aux.push(player);
        setPlayers(aux);
    };
    const startGame = () => {
        initPlayers();
        assignRoles();
    }
    const initPlayers = () => {
        players.map((p) => {
            p.alive = true;
            p.vampire = false;
            p.caracter = null;
        })
    }
    const assignRoles = () => {
        let numPlayers = players.length;
        getRandomInt(0, numPlayers);
        let aux = [...players];
        let selectedPlayers = [];
        for (let i = 0; i < roles.length; i++) {
            let selected = getRandomInt(1, numPlayers + 1);
            while (selectedPlayers.find(e => e == selected)) {
                selected = getRandomInt(1, numPlayers + 1);
            }
            selectedPlayers.push(selected);
        }

        roles.map((rol, i) => {
            let selected = selectedPlayers[i] - 1;
            if (i == 0) {
                aux[selected].vampire = true;
            }
            aux[selected].caracter = rol;
        });
        aux.forEach((p) => {
            if (!p.caracter) {
                p.caracter = "aldeano";
            }
        })
        setPlayers(aux);
    }

    useEffect(() => {
        if (inGame) {
            startGame();
            setCall(true);
            console.log("termina juego");
        }

    }, [inGame]);
    return (
        <View style={styles.container}>
            {
                !inGame ?

                    <SafeAreaView style={styles.content}>
                        <ScrollView style={styles.scrollViewContainer}>
                            <View style={styles.container}>
                                <Text style={styles.title}>VAMPIRO</Text>
                                <Table players={players} setPlayers={setPlayers} />
                                <Button text={"Nuevo jugador"} size={"small"} type={"secondary"} fnc={() => { newPlayer() }} />
                                <Button text={"Comenzar"} size={"large"} type={"primary"} fnc={() => { setInGame(true) }} />
                            </View>
                        </ScrollView>
                    </SafeAreaView>

                    : null

            }
            {
                call ? <PlayersCall players={players} setPlayers={setPlayers} setCall={setCall} setInteraction={setInteraction} /> : null
            }
            {
                interaction ? <PlayersInteractions endGame={endGame} setEndGame={setEndGame} players={players} setPlayers={setPlayers} setInteraction={setInteraction} setDie={setDie} setMeeting={setMeeting} /> : null
            }
            {
                die ? <Die die={die} setInGame={setInGame} endGame={endGame} setEndGame={setEndGame} setDie={setDie} setMeeting={setMeeting} /> : null
            }
            {
                meeting ? <Meeting endGame={endGame} setEndGame={setEndGame} players={players} setPlayers={setPlayers} setMeeting={setMeeting} setGallows={setGallows} selected={selected} setSelected={setSelected} /> : null
            }
            {
                gallows ? <Gallows setInGame={setInGame} endGame={endGame} setEndGame={setEndGame} players={players} selected={selected} setSelected={setSelected} gallows={gallows} setGallows={setGallows} setInteraction={setInteraction} /> : null
            }

            <StatusBar style="auto" />
        </View >
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
        marginVertical: Vector.vh(1),
    },
    scrollViewContainer: {
        width: "100%",
        height: "100%",
    },
    content: {
        width: "100%",
        height: "100%",
    },
});

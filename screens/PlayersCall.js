import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import PlayerCall from '../components/PlayersCall/PlayerCall';
import Button from '../components/VampireButton';
import Vectores from '../functions/Vector';
export default function PlayersCall(props) {
  const { players, setPlayers, setCall, setInteraction } = props;

  const callPlayers = () => {
    let alivePlayers = [];
    players.map((p, i) =>{
      if(p.alive){
        alivePlayers.push(p);
      }
    });
    return alivePlayers.map((p, i) => (<PlayerCall key={i} player={p} />));
  }
  return (
    <SafeAreaView style={styles.content}>
      <Text style={styles.title}>Ingresa tu PIN y verifica tu rol</Text>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.container}>
          {
            callPlayers()
          }
        <Button text={"Continuar"} size={"large"} type={"primary"} fnc={() => { setCall(false);setInteraction(true); }} />
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

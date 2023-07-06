import { StyleSheet, Text, View} from "react-native";

import { ImageBackground } from "react-native";

import DropdownComponent from "../components/ComponentsDrop";

export function Home() {

  return (
    <View style={styles.container}>
      <Text style={styles.groupWork}> ©Trabalho produzido por Henrique e Thalia</Text>
      <Text style={styles.titleEvent}>Recreio Julino da T.I</Text>
      <Text style={styles.dateEvent}> Temos várias opções para você</Text>
      <DropdownComponent/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#dac8b3",
    padding: 22,
  },
  titleEvent: {
    color: "#8E236B",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 48,
    justifyContent:"center",
    textAlign:"center"
  },
  dateEvent: {
    color: "#8E236B",
    fontSize: 16,
    justifyContent:"center",
    textAlign:"center",
    fontWeight: "regular",
  },
  groupWork: {
    justifyContent: "space-around",
    textAlign:"center",
    fontSize: 12,
    
  }
  
});

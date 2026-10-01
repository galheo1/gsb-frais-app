import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function DashboardScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.screen}>
      <Navbar />
      <View style={styles.content}>
        <Text>Bienvenue {user}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16 },
});
//réponse à la question 7:
// prioritée => 
//          anneemois : c'est le titre de la carte, car c'est ce qui identifie une note pour le visiteur.
//          id_etat : C'est l'information qui change le plus et qui déclenche une action : si la note est encore en cours, on peux la modifier.
//          Montant : c'est ce qui intéresse le plus le visiteur, il s'agit de son remboursement. 
// Second plan =>
//          id : c'est l'identifiant de la note, il est utile pour le visiteur mais pas prioritaire.
//          Nombre de justificatifs : utile mais secondaire.
//          Date de modification : Elle rassure sur la nouveautée des données sans encombrer la carte.
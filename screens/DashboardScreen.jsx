import { View, Text,TextInput, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import fraisData from "../data/frais.json";
import FraisCard from "../components/FraisCard";
import { Switch } from "react-native";



export default function DashboardScreen() {
  const { user } = useAuth();
  const [fraisList, setFraisList] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPrix, setFilteredPrix] = useState(0);
  const [filterNonNull, setFilterNonNull] = useState(true);
  const onToggleSwitch = () => setFilterNonNull(!filterNonNull);

  const filteredValide = fraisList.filter((frais) => frais.montantvalide !== null);
  const filteredFraisPrix = filteredValide.filter((frais) => frais.montantvalide >= filteredPrix||filteredPrix===null);
  const filteredFrais = filteredFraisPrix.filter((frais) =>
    (searchTerm === frais.anneemois || searchTerm == frais.id_visiteur)||filterNonNull);


  useEffect(() => {
    // Simulation d'un appel API avec un délai de 500 ms
    setTimeout(() => {
      // ToDo : mettre à jour fraisList avec les données de fraisData
      // ToDo : passer loading à false
      setFraisList(fraisData);
      setLoading(false);
    }, 1500);
  }, []);
  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;


  return (
    <View style={styles.screen}>
      <Navbar />
      <View style={styles.content}>
        <Text>Bienvenue {user}</Text>
        <TextInput
          placeholder="Rechercher par année-mois ou ID visiteur..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.searchInput}
        />
        <View style={styles.filterRow}>
          <Switch
            value={filterNonNull}
            onValueChange={onToggleSwitch}
            // ToDo : compléter onValueChange (équivalent de onChange={e =>...e.target.checked})
            />
          <Text>Afficher seulement les frais avec un montant validé</Text>
        </View>
        <TextInput
          placeholder="Rechercher à patir de..."
          value={filteredPrix}
          onChangeText={(text) => setFilteredPrix(text)}
          type="numeric"
          style={styles.searchInput}
        />
        <FlatList
          data={filteredFrais}
          keyExtractor={(item) => item.id_frais.toString()}
          renderItem={({ item }) => <FraisCard frais={item} />}
          
        />
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
//          anne emois : c'est le titre de la carte, car c'est ce qui identifie une note pour le visiteur.
//          id_etat : C'est l'information qui change le plus et qui déclenche une action : si la note est encore en cours, on peux la modifier.
//          Montant : c'est ce qui intéresse le plus le visiteur, il s'agit de son remboursement. 
// Second plan =>
//          id : c'est l'identifiant de la note, il est utile pour le visiteur mais pas prioritaire.
//          nombre de justificatifs : utile mais secondaire.
//          date de modification : Elle rassure sur la nouveautée des données sans encombrer la carte.
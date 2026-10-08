import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import { AuthProvider, useAuth } from './context/AuthContext';

const Stack = createNativeStackNavigator();


// Composant séparé : nécessaire car useAuth() doit être appelé
// À L'INTÉRIEUR de <AuthProvider>, pas dans App() qui le pose.
function AppNavigator() {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      {user ? (
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
const handleSubmit = async () => {
  // Appel de la fonction loginUser avec login et password
  // Pas besoin de naviguer manuellement : App.js bascule automatiquement
  // vers Dashboard dès que le contexte "user" est mis à jour.
  if (!loginUser(login, password)) {
    Alert.alert("Identifiants incorrects"); // Affiche une erreur si échec
  }
};
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

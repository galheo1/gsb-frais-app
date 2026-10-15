import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useState } from "react";
import { signIn } from "../services/authService";

// 1. Création du contexte
const AuthContext = createContext();

// 2. Fournisseur du contexte (AuthProvider)
export function AuthProvider({ children }) {
  // État local pour stocker l’utilisateur (null = non connecté)
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  // 3. Fonction de connexion
  async function loginUser(login, password) {
    const data = signIn(login, password);
    setUser(data.visiteur);
    setToken(data.token);
    return data;
  }

  // 4. Fonction de déconnexion
  const logoutUser = () => {
    // ToDo : réinitialiser la valeur de l’état à null
    setUser(null);
    setToken(null);
  };

  useEffect(
    () => {
      const restoreSession = async () => {
        try {
          const storedUser = await getCurrentUser();
          const storedToken = await getAuthToken();
          if (storedUser && storedToken) {
            // ToDo : mettre à jour les états user et token
            setUser(storedUser);
            setToken(storedToken);
          }
        } catch (error) {
          console.error("Erreur lors de la restauration de session : ", error);
        }
        setSessionLoading(false);
      };
      // ToDo : appeler la fonction restoreSession
      restoreSession();
    },
    [], // ToDo : ajouter la dépendance [] qui permet de déclencher ce useEffect une seule fois au montage du composant
  );

  // 5. Valeurs exposées aux composants enfants
  return (
    <AuthContext.Provider
      value={{ token, user, loginUser, logoutUser, sessionLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const getCurrentUser = async () => {
  const raw = await AsyncStorage.getItem("user");
  // ToDo : renvoyer l'objet JS correspondant (penser à JSON.parse), ou null si raw est vide
  return raw ? JSON.parse(raw) : null;
};
export const getAuthToken = async () => {
  // ToDo : récupérer le token depuis AsyncStorage
  // ToDo : renvoyer le token s’il est défini (pas besoin de JSON.parse car c’est déjà une chaine de caractères, sinon renvoyer null
  const rawToken = await AsyncStorage.getItem("token");
  return rawToken ? rawToken : null;
};

// 6. Hook personnalisé pour utiliser le contexte facilement
export function useAuth() {
  return useContext(AuthContext);
}

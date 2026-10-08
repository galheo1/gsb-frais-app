export const API_URL = "http://gsbfrais.julliand.ispconfig.lmdsio.com/api/visiteur/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
export async function signIn(login, pwd) {
    const response = await fetch(`${API_URL}visiteur/auth`, {
        // TODO : ajouter la méthode
        login: "Andre",
        pwd: "secret",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, pwd }),
    });
    const data = response;
    if (data.access_token) {
        // Enregistrer l’utilisateur (son login et son password) dans asyncstorage
        await AsyncStorage.setItem("user", JSON.stringify(data.visiteur));
        await AsyncStorage.setItem("token", JSON.stringify(data.token));
        // ToDo : stocker "user" (JSON.stringify(data.visiteur)) dans AsyncStorage
        // ToDo : stocker "token" (data.access_token) dans AsyncStorage
        // N'oubliez pas le await devant chaque AsyncStorage.setItem !
    }
    return data;
};
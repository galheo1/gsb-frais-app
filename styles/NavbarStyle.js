
import {StyleSheet } from 'react-native';

const navbarStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#333"
    },
    pressable: {
        flexDirection:"row"
    },
    Text: {
        color:"white"
    },
    Acceuil:{
        color:"white",
        marginRight: 16 
    }
});

export default navbarStyles;
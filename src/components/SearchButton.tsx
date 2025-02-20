import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/src/Colors";

interface SearchButtonProps {
    onPress: () => void;
    color?: string;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onPress, color = Colors.text.dark }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={styles.touchable}>
            <View style={styles.button}>
                <Ionicons name="search" size={32} color={color} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    touchable: {
        position: "absolute",
        bottom: 25,
        right: 25,
        borderRadius: 50,
    },
    button: {
        backgroundColor: Colors.primary, // Use your theme color
        borderRadius: 50,
        padding: 15,
        elevation: 8, // Adds a shadow effect for Android
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
});

export default SearchButton;

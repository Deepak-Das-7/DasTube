import { Colors } from "@/src/Colors";
import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient'


interface SearchBarProps {
    query: string;
    setQuery: (text: string) => void;
    onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, onSearch }) => {
    return (
        <LinearGradient
            colors={[Colors.primary, Colors.tint.dark, Colors.accent]}
            style={styles.container}
        >
            <Ionicons name="search" size={33} color={Colors.text.light} />
            <TextInput
                style={styles.input}
                placeholder="Search YouTube..."
                placeholderTextColor={Colors.text.light}
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={onSearch}
            />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.background.gray,
        borderRadius: 40,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginHorizontal: 10,
        marginTop: 10
    },
    input: {
        color: Colors.text.light,
        fontSize: 16,
    }
});

export default SearchBar;

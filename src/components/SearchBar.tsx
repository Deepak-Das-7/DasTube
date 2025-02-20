import { Colors } from "@/src/Colors";
import React from "react";
import { TextInput, StyleSheet, View, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface SearchBarModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    query: string;
    setQuery: (text: string) => void;
    onSearch: () => void;
}

const SearchBarModal: React.FC<SearchBarModalProps> = ({ visible, setVisible, query, setQuery, onSearch }) => {
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={() => setVisible(false)}
        >
            <View style={styles.modalContainer}>
                {/* Close the modal if tapped outside */}
                <TouchableOpacity style={styles.backdrop} onPress={() => setVisible(false)} activeOpacity={1} />

                <LinearGradient
                    colors={[Colors.primary, Colors.tint.dark, Colors.accent]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.searchBox}
                >
                    {/* Close Button */}
                    <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButton}>
                        <Ionicons name="close" size={28} color={Colors.text.light} />
                    </TouchableOpacity>

                    {/* Search Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Search in DasTube..."
                        placeholderTextColor={Colors.text.light}
                        value={query}
                        onChangeText={setQuery}
                        onSubmitEditing={() => {
                            onSearch();
                            setVisible(false);
                        }}
                        autoFocus
                        cursorColor={Colors.text.dark}
                    />

                    {/* Search Button */}
                    <TouchableOpacity onPress={() => {
                        onSearch();
                        setVisible(false);
                    }} style={styles.searchButton}>
                        <Ionicons name="arrow-forward-circle" size={30} color={Colors.text.light} />
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: "center",
    },
    backdrop: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        width: "95%",
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 15,
        elevation: 5,
        shadowColor: Colors.background.dark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    closeButton: {
        marginRight: 10,
    },
    input: {
        color: Colors.text.light,
        flex: 1,
        fontSize: 18,
    },
    searchButton: {
        marginLeft: 10,
    },
});

export default SearchBarModal;

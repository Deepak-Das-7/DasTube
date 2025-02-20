import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Colors } from "@/src/Colors";

const Loader = ({ visible }: { visible: boolean }) => {
    if (!visible) return null;

    return (
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors.background.blur,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
});

export default Loader;

import { Colors } from "@/src/Colors";
import { YouTubeVideo } from "@/src/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, Image, TouchableOpacity, StyleSheet, View } from "react-native";

interface VideoItemProps {
    video: YouTubeVideo;
    onPressVideo(): void;
}

const VideoItem: React.FC<VideoItemProps> = ({ video, onPressVideo }) => {
    return (
        <TouchableOpacity onPress={onPressVideo} style={styles.container}>
            <Image source={{ uri: video.snippet.thumbnails.medium?.url }} style={styles.thumbnail} />
            <View style={styles.details}>
                <Text style={styles.title} numberOfLines={3}>
                    {video.snippet.title}
                </Text>
                <View style={styles.statsContainer}>
                    <View style={styles.stat}>
                        <Ionicons name="eye-outline" size={14} color={Colors.primary} />
                        <Text style={styles.statText}>{video.statistics?.viewCount ?? "0"}</Text>
                    </View>
                    <View style={styles.stat}>
                        <Ionicons name="heart-outline" size={14} color={Colors.status.error} />
                        <Text style={styles.statText}>{video.statistics?.likeCount ?? "0"}</Text>
                    </View>
                    <View style={styles.stat}>
                        <Ionicons name="chatbubble-outline" size={14} color={Colors.text.muted} />
                        <Text style={styles.statText}>{video.statistics?.commentCount ?? "0"}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background.dark,
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 15,
        elevation: 3,
    },
    thumbnail: {
        width: "100%",
        height: 200,
    },
    details: {
        padding: 10,
    },
    title: {
        fontWeight: "bold",
        color: Colors.text.white,
        marginBottom: 5,
    },
    statsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    stat: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15,
    },
    statText: {
        fontSize: 12,
        color: Colors.text.white,
        marginLeft: 4,
    },
});

export default VideoItem;

import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import YouTubeIframe from "react-native-youtube-iframe";
import { YouTubeVideo } from "@/src/types";
import { Colors } from "@/src/Colors";
import { Ionicons } from "@expo/vector-icons";

interface VideoPlayerProps {
    video: YouTubeVideo;
    playing: boolean;
    onEnd: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, playing, onEnd }) => {
    const screenWidth = Dimensions.get("window").width;
    const playerWidth = screenWidth;
    const playerHeight = (playerWidth * 9) / 16;

    return (
        <View style={styles.container}>
            {/* YouTube Player */}
            <YouTubeIframe
                height={playerHeight}
                width={playerWidth}
                play={playing}
                videoId={video.id}
                onChangeState={(state) => state === "ended" && onEnd()}
                initialPlayerParams={{
                    loop: false,
                    controls: true,
                }}
            />

            {/* Video Details */}
            <View style={styles.infoContainer}>
                <Text style={styles.videoTitle} numberOfLines={2}>{video.snippet.title}</Text>

                {/* Channel & Stats */}
                <View style={styles.channelRow}>
                    <Text style={styles.videoChannel}>{video.snippet.channelTitle}</Text>
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Ionicons name="eye-outline" size={14} color={Colors.primary} />
                            <Text style={styles.statText}>{video.statistics?.viewCount ?? "0"}</Text>
                        </View>

                        <View style={styles.statItem}>
                            <Ionicons name="heart-outline" size={14} color={Colors.status.error} />
                            <Text style={styles.statText}>{video.statistics?.likeCount ?? "0"}</Text>
                        </View>

                        <View style={styles.statItem}>
                            <Ionicons name="chatbubble-outline" size={14} color={Colors.text.muted} />
                            <Text style={styles.statText}>{video.statistics?.commentCount ?? "0"}</Text>
                        </View>
                    </View>
                </View>

                {/* Description */}
                <Text style={styles.description} numberOfLines={3}>{video.snippet.description}</Text>
            </View>
        </View>
    );
};

export default VideoPlayer;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background.dark,
        borderRadius: 12,
        overflow: "hidden",
        marginVertical: 10,
        elevation: 4,
    },
    infoContainer: {
        padding: 5,
    },
    videoTitle: {
        fontWeight: "bold",
        fontSize: 16,
        color: Colors.text.white,
    },
    channelRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    videoChannel: {
        fontSize: 12,
        color: Colors.text.muted,
    },
    statsRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    statItem: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
    },
    statText: {
        marginLeft: 4,
        fontSize: 12,
        color: Colors.text.white,
    },
    description: {
        fontSize: 13,
        color: Colors.background.gray,
        marginTop: 2,
    },
});

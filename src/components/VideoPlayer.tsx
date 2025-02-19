// VideoPlayer.tsx
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import YouTubeIframe from "react-native-youtube-iframe";
import { YouTubeVideo } from "@/src/types";
import { Colors } from "@/src/Colors";

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
            <YouTubeIframe
                height={playerHeight}
                width={playerWidth}
                play={playing}
                videoId={video.id.videoId}
                onChangeState={(state) => state === "ended" && onEnd()}
                initialPlayerParams={{
                    loop: false,
                    controls: true,
                }}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.videoTitle} numberOfLines={2}>{video.snippet.title}</Text>
                <Text style={styles.videoChannel}>{video.snippet.channelTitle}</Text>
            </View>
        </View>
    );
};

export default VideoPlayer;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background.gray,
        paddingBottom: 5,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        elevation: 2,
    },
    infoContainer: {
        padding: 5,
    },
    videoTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 3,
    },
    videoChannel: {
        fontSize: 12,
        color: Colors.text.muted,
    },
});

import { Colors } from "@/src/Colors";
import { YouTubeVideo } from "@/src/types";
import React from "react";
import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface VideoItemProps {
    video: YouTubeVideo,
    onPressVideo(): void
}

const VideoItem: React.FC<VideoItemProps> = ({ video, onPressVideo }) => {
    return (
        <TouchableOpacity
            onPress={onPressVideo}
            style={styles.videoItem}
        >
            <Image source={{ uri: video.snippet.thumbnails.medium.url }} style={styles.thumbnail} />
            <Text style={styles.title}>{video.snippet.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    videoItem: { marginBottom: 10 },
    thumbnail: { width: "100%", height: 200, borderRadius: 5 },
    title: { margin: 5, color: Colors.text.dark },
});

export default VideoItem;

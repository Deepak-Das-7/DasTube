import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import VideoItem from "@/src/components/VideoItem";
import { YouTubeVideo } from "@/src/types";
import { Colors } from "@/src/Colors";

interface VideoListProps {
    videos: YouTubeVideo[];
    onSelectVideo: (video: YouTubeVideo) => void;
}

const VideoList: React.FC<VideoListProps> = ({ videos, onSelectVideo }) => {
    return (
        <View >
            {videos.length === 0 ? (
                <Text style={styles.noVideos}>No videos yet, Kindly search</Text>
            ) : (
                <FlatList
                    data={videos}
                    keyExtractor={(item) => item.id.videoId}
                    renderItem={({ item }) => (
                        <VideoItem video={item} onPressVideo={() => onSelectVideo(item)} />
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    noVideos: { textAlign: "center", marginVertical: 20, fontSize: 16, color: Colors.text.dark },
});

export default VideoList;

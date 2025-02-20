import React from "react";
import { View, FlatList, StyleSheet, ListRenderItem } from "react-native";
import VideoItem from "@/src/components/VideoItem";
import { YouTubeVideo } from "@/src/types";
import { Colors } from "@/src/Colors";

interface VideoListProps {
    videos: YouTubeVideo[];
    onSelectVideo: (video: YouTubeVideo) => void;
    ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null;
    onEndReached?: (() => void) | null;
    onEndReachedThreshold?: number | null;
}

const VideoList: React.FC<VideoListProps> = ({
    videos,
    onSelectVideo,
    ListFooterComponent,
    onEndReached,
    onEndReachedThreshold,
}) => {
    const renderItem: ListRenderItem<YouTubeVideo> = ({ item }) => (
        <VideoItem video={item} onPressVideo={() => onSelectVideo(item)} />
    );

    const keyExtractor = (item: YouTubeVideo) => {
        return Math.random().toString();

    };

    return (
        <View style={styles.container}>
            <FlatList
                data={videos}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                ListFooterComponent={ListFooterComponent}
                onEndReached={onEndReached}
                onEndReachedThreshold={onEndReachedThreshold}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 5,
        justifyContent: "center",
        alignItems: "center"
    },
});

export default VideoList;
import React, { useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import VideoPlayer from "@/src/components/VideoPlayer";
import VideoList from "@/src/components/VideoList";
import SearchBar from "@/src/components/SearchBar";
import Loader from "@/src/components/Loader";
import SearchButton from "@/src/components/SearchButton";
import { YouTubeVideo } from "@/src/types";
import { fetchVideos } from "@/src/api";
import { Colors } from "@/src/Colors";
import { API_KEY } from "@env";

const YouTubeSearch = () => {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>();
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const fetchData = async (pageToken?: string) => {
    setLoading(true);
    try {
      const { videos: fetchedVideos, nextPageToken: newToken } = await fetchVideos(query, 50, pageToken);
      setVideos(pageToken ? [...videos, ...fetchedVideos] : fetchedVideos);
      setNextPageToken(newToken);
      setSelectedVideo(null);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
    setLoading(false);
  };

  const fetchMoreVideos = async () => {
    if (isFetchingMore || !nextPageToken) return;
    setIsFetchingMore(true);
    await fetchData(nextPageToken);
    setIsFetchingMore(false);
  };

  const handleSearch = () => {
    setVideos([]);
    setNextPageToken(undefined);
    fetchData();
    setSearchVisible(false);
  };
  return (
    <View style={styles.container}>
      <Loader visible={loading} />

      {selectedVideo ? (
        <VideoPlayer video={selectedVideo} playing onEnd={() => setSelectedVideo(null)} />
      ) : null}
      <VideoList
        videos={videos}
        onSelectVideo={setSelectedVideo}
        ListFooterComponent={isFetchingMore ? <ActivityIndicator size="large" color={Colors.primary} /> : null}
        onEndReached={fetchMoreVideos}
        onEndReachedThreshold={0.5}
      />

      {/* Search Modal */}
      <SearchBar visible={searchVisible} setVisible={setSearchVisible} query={query} setQuery={setQuery} onSearch={handleSearch} />

      {/* Floating Search Button */}
      <SearchButton onPress={() => setSearchVisible(true)} color={Colors.background.light} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background.dark, paddingHorizontal: 5 },
});

export default YouTubeSearch;

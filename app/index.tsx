import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import VideoPlayer from "@/src/components/VideoPlayer";
import VideoList from "@/src/components/VideoList";
import SearchBar from "@/src/components/SearchBar";
import { YouTubeVideo } from "@/src/types";
import { fetchVideos } from "@/src/api";
import { Colors } from "@/src/Colors";

const YouTubeSearch = () => {
  const [query, setQuery] = useState<string>("");
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [playing, setPlaying] = useState(true);

  const getVideos = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);

    try {
      const data = await fetchVideos(searchQuery);
      setVideos(data);
      setSelectedVideo(null);
    } catch (error) {
      console.error("Error fetching video:", error);
    }

    setLoading(false);
  };



  return (
    <View style={styles.container}>
      {!selectedVideo && (
        <SearchBar query={query} setQuery={setQuery} onSearch={() => getVideos(query)} />
      )}

      {loading && <Text style={styles.loading}>Loading...</Text>}

      {selectedVideo ? (
        <VideoPlayer
          video={selectedVideo}
          playing={playing}
          onEnd={() => setPlaying(false)}
        />
      ) : null}

      <VideoList videos={videos} onSelectVideo={(video) => { setSelectedVideo(video) }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background.dark, paddingHorizontal: 5 },
  loading: { textAlign: "center", marginVertical: 10 },
});

export default YouTubeSearch;


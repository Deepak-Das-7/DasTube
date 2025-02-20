// @/src/api.ts
import axios from "axios";
import { YouTubeVideo } from "./types";
import { API_KEY } from "@env";

export const fetchVideos = async (
  searchQuery: string,
  maxResults: number = 50,
  pageToken?: string
): Promise<{ videos: YouTubeVideo[]; nextPageToken?: string }> => {
  try {
    // 🔹 Step 1: Fetch Video IDs using `search` API
    const searchResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          key: API_KEY,
          part: "snippet",
          maxResults: Math.min(50, maxResults),
          q: searchQuery,
          type: "video",
          pageToken: pageToken,
        },
      }
    );

    const videos = searchResponse.data.items ?? [];
    const videoIds = videos.map((video: any) => video.id.videoId).join(",");

    if (!videoIds) return { videos: [], nextPageToken: searchResponse.data.nextPageToken };

    // 🔹 Step 2: Fetch Full Details Using `videos` API
    const detailsResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          key: API_KEY,
          part: "snippet,statistics,contentDetails",
          id: videoIds,
        },
      }
    );

    return {
      videos: detailsResponse.data.items ?? [], // Includes statistics and contentDetails
      nextPageToken: searchResponse.data.nextPageToken,
    };
  } catch (error) {
    console.error("Error fetching videos:", error);
    return { videos: [] };
  }
};

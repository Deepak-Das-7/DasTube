import axios from "axios";
import { YouTubeVideo } from "./types";
import { API_KEY } from "@env";


export const fetchVideos = async (searchQuery: string): Promise<YouTubeVideo[]> => {
  try {
    const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            key: API_KEY,
            part: "snippet",
            maxResults: 100,
            q: searchQuery,
            type: "video",
          },
        }
      );
    return response.data.items ?? [];
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};

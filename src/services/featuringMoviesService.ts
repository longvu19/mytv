import type { FeaturingMovieResponse } from "./types";
import axios from "axios";
import { useFeaturingMovieStore } from "../stores/movie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
});

export const getFeaturingMovies = async (
  page: number = 1
): Promise<FeaturingMovieResponse> => {
  const store = useFeaturingMovieStore();
  try {
    let data;
    if (Object.keys(store.apiRes).length !== 0) {
      data = store.apiRes;
    } else {
      const response = await api.get<FeaturingMovieResponse>(
        `/films/phim-moi-cap-nhat?page=${page}&limit=5`
      );
      data = response.data;
      store.setApiRes(response.data);
      setTimeout(() => {
        store.clearApiRes();
      }, 5 * 60 * 1000);
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch featuring movies: ${error.message}`);
    } else {
      throw new Error("Failed to fetch featuring movies");
    }
  }
};

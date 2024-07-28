import axios, { CanceledError } from "axios";
import { useMovieDetailStore } from "../stores/movie";
import type { MovieDetailResponse, MovieSearchResultResponse } from "./types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
});

export const getMovieDetail = async (
  slug: string
): Promise<MovieDetailResponse> => {
  const store = useMovieDetailStore();
  try {
    let data : MovieDetailResponse = {} as MovieDetailResponse;
    const storeIndex = `${slug}`;
    if (store.apiRes.has(storeIndex)) {
      data = store.apiRes.get(storeIndex) as MovieDetailResponse;
    } else {
      const response = await api.get<MovieDetailResponse>(`/phim/${slug}`);
      data = response.data;
      store.setApiRes(storeIndex, data);
      setTimeout(() => {
        store.clearApiRes(storeIndex);
      }, 5 * 60 * 1000);
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch movie detail: ${error.message}`);
    } else {
      throw new Error("Failed to fetch movie detail");
    }
  }
};

export const getMovieSearchResult = async (
  keyword: string,
  limit: number = 10,
  abortController?: AbortController
): Promise<MovieSearchResultResponse|null> => {
  if(!keyword) return null;
  try {
    const response = await api.get<MovieSearchResultResponse>(
      `v1/api/tim-kiem?keyword=${keyword}&limit=${limit}`,
      {
        signal: abortController?.signal
      }
    );
    return response.data;
  } catch (error) {
    if(error instanceof CanceledError) return null;
    if (error instanceof Error) {
      throw new Error(`Failed to fetch movie search result: ${error.message}`);
    } else {
      throw new Error("Failed to fetch movie search result");
    }
  }
}
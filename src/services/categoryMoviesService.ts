import type { CategoryMoviesResponse } from "./types";
import axios from "axios";
import { useCategoryMovieStore } from "../stores/movie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
});

export const getCategoryMovies = async (
  categorySlug: string,
  page: number = 1,
  limit: number = 8
): Promise<CategoryMoviesResponse> => {
  const store = useCategoryMovieStore();
  try {
    let data : CategoryMoviesResponse = {} as CategoryMoviesResponse;
    const storeIndex = `${categorySlug}_${page}_${limit}`;
    if (store.apiRes.has(storeIndex)) {
      data = store.apiRes.get(storeIndex) as CategoryMoviesResponse;
    } else {
      const response = await api.get<CategoryMoviesResponse>(
        `/films/danh-sach/${categorySlug}?page=${page}&limit=${limit}`
      );
      data = response.data;
      store.setApiRes(storeIndex, response.data);
      setTimeout(() => {
        store.clearApiRes(storeIndex);
      }, 5 * 60 * 1000);
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch category movies: ${error.message}`);
    } else {
      throw new Error("Failed to fetch category movies");
    }
  }
};

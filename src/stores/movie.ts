import { defineStore } from "pinia";
import type {
  FeaturingMovieResponse,
  CategoryMoviesResponse,
  MovieDetailResponse,
  AltServer,
  SourceProvider,
} from "../services/types";

export const useFeaturingMovieStore = defineStore("featuringMovie", {
  state: () => ({
    apiRes: {} as FeaturingMovieResponse,
  }),
  actions: {
    setApiRes(res: FeaturingMovieResponse) {
      this.apiRes = res;
    },
    clearApiRes() {
      this.apiRes = {} as FeaturingMovieResponse;
    },
  },
});

export const useCategoryMovieStore = defineStore("categoryMovie", {
  state: () => ({
    apiRes: new Map<string, CategoryMoviesResponse>(),
  }),
  actions: {
    setApiRes(cateogry: string, res: CategoryMoviesResponse) {
      this.apiRes.set(cateogry, res);
    },
    clearApiRes(category: string) {
      this.apiRes.delete(category);
    },
  },
});

export const useMovieDetailStore = defineStore("movie", {
  state: () => ({
    apiRes: new Map<string, MovieDetailResponse>(),
  }),
  actions: {
    setApiRes(slug: string, res: MovieDetailResponse) {
      this.apiRes.set(slug, res);
    },
    clearApiRes(slug: string) {
      this.apiRes.delete(slug);
    },
  },
});

export const useAltSourceStore = defineStore("altSource", {
  state: () => ({
    apiRes: new Map<string, AltServer[]>(),
  }),
  actions: {
    setApiRes(slug: string, res: AltServer[]) {
      this.apiRes.set(slug, res);
    },
    clearApiRes(slug: string) {
      this.apiRes.delete(slug);
    },
  },
});

export const usePlayerStore = defineStore("player", {
  state: () => ({
    // null until the viewer picks a source; the first source (m3u8 when available) plays by default
    preferredProvider: null as SourceProvider | null,
  }),
  actions: {
    setPreferredProvider(provider: SourceProvider) {
      this.preferredProvider = provider;
    },
  },
});

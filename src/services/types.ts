export interface MovieInfo {
  modified: string;
  slug: string;
  original_name: string;
  poster_url: string;
  thumb_url: string;
  [key: string]: any;
}

export interface FeaturingMovieResponse {
  items: MovieInfo[];
  status: string;
  paginate: {
    total_items: number;
    items_per_page: number;
    current_page: number;
    total_page: number;
  };
}

interface BaseData {
  name: string;
  slug: string;
}

export interface MovieCategory extends BaseData {}
export interface MovieCountry extends BaseData {}

// export interface MovieListInfo {
//   modified: string;
//   name: string;
//   slug: string;
//   origin_name: string;
//   type: string;
//   poster_url: string;
//   thumb_url: string;
//   sub_docquyen: boolean;
//   chieurap: boolean;
//   time: string;
//   episode_current: string;
//   quality: string;
//   lang: string;
//   year: number;
//   category: MovieCategory[];
//   country: MovieCountry[];
//   casts: string;
//   current_episode: string;
//   description: string;
//   director: string;
//   language: string;
//   original_name: string;
//   total_episodes: number;
//   [key: string]: any;
// }

export interface CategoryMoviesResponse {
  status: string;
  cat: {
    name: string;
    slug: string;
    title: string
  };
  items: MovieInfo[];
  paginate: {
    total_items: number;
    items_per_page: number;
    current_page: number;
    total_page: number;
  };
  [key: string]: any;
}

export interface MovieDetail extends MovieInfo {
  _id: string;
  episodes: MovieEpisode[];
  [key: string]: any;
}

export interface Episode {
  name: string;
  slug: string;
  embed: string;
  m3u8?: string;
}

export interface MovieEpisode {
  server_name: string;
  items: Episode[];
}

export interface MovieDetailResponse {
  status: string;
  movie: MovieDetail;
}

// Secondary source (phimapi.com)
export interface AltEpisode {
  name: string;
  slug: string;
  link_embed: string;
  link_m3u8: string;
}

export interface AltServer {
  server_name: string;
  server_data: AltEpisode[];
}

export interface AltMovieResponse {
  status: boolean;
  movie?: {
    slug: string;
    name: string;
    origin_name: string;
    year: number;
  };
  episodes?: AltServer[];
}

export interface AltSearchResponse {
  status: string;
  data?: {
    items: {
      slug: string;
      name: string;
      origin_name: string;
      year: number;
    }[];
  };
}

export type SourceProvider = "nguonc" | "phimapi";

export interface EpisodeSource {
  provider: SourceProvider;
  type: "embed" | "hls";
  url: string;
}

export interface PlayableEpisode {
  name: string;
  slug: string;
  key: string;
  sources: EpisodeSource[];
}

export interface ServerGroup {
  key: string;
  name: string;
  items: PlayableEpisode[];
}

export interface InputProps {
  id?: string;
  label?: string;
  type: string;
  placeholder?: string;
  modelValue?: string;
  icon?: string;
  iconSize?: string;
  required?: boolean;
  bgTransparent?: boolean;
  iconClickHandler?: () => void | ((...args: any[]) => any);
}

export interface MovieSearchResultResponse extends FeaturingMovieResponse {
}

export interface LoadingProps {
  size?: string;
  type?: "spinner" | "square";
}

export type EventBus = {
  closePopup: string;
} 
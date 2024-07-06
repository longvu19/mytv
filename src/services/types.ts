export interface MovieInfo {
  modified: {
    time: string;
  };
  slug: string;
  origin_name: string;
  poster_url: string;
  thumb_url: string;
  year: number;
  [key: string]: any;
}

export interface FeaturingMovieResponse {
  items: MovieInfo[];
  status: boolean;
  pagination: {
    totalItems: number;
    totalItemsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
}

interface BaseData {
  name: string;
  slug: string;
}

export interface MovieCategory extends BaseData {}
export interface MovieCountry extends BaseData {}

export interface MovieListInfo {
  modified: {
    time: string;
  };
  name: string;
  slug: string;
  origin_name: string;
  type: string;
  poster_url: string;
  thumb_url: string;
  sub_docquyen: boolean;
  chieurap: boolean;
  time: string;
  episode_current: string;
  quality: string;
  lang: string;
  year: number;
  category: MovieCategory[];
  country: MovieCountry[];
  [key: string]: any;
}

export interface CategoryMoviesResponse {
  status: boolean;
  msg: string;
  data: {
    items: MovieListInfo[];
    params: {
      pagination: {
        totalItems: number;
        totalItemsPerPage: number;
        currentPage: number;
        totalPages: number;
      };
    };
    APP_DOMAIN_FRONTEND: string;
    APP_DOMAIN_CDN_IMAGE: string;
  };
  [key: string]: any;
}

export interface MovieDetail {
  created: {
    time: string;
  };
  modified: {
    time: string;
  };
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  content: string;
  type: string;
  status: string;
  poster_url: string;
  thumb_url: string;
  is_copyright: boolean;
  sub_docquyen: boolean;
  chieurap: boolean;
  trailer_url: string;
  time: string;
  episode_current: string;
  episode_total: string;
  quality: string;
  lang: string;
  notify: string;
  showtimes: string;
  year: number;
  view: number;
  actor: string[];
  director: string[];
  category: {
    id: string;
    name: string;
    slug: string;
  }[];
  country: {
    id: string;
    name: string;
    slug: string;
  }[];
};

export interface Episode {
  name: string;
  slug: string;
  filename: string;
  link_embed: string;
  link_m3u8: string;
}

export interface MovieEpisode {
  server_name: string;
  server_data: Episode[];
}

export interface MovieDetailResponse {
  status: boolean;
  msg: string;
  movie: MovieDetail;
  episodes: MovieEpisode[];
}

export interface InputProps {
  id?: string,
  label?: string,
  type: string,
  placeholder?: string,
  modelValue?: string,
  icon?: string
}

export interface MovieSearchResultResponse extends CategoryMoviesResponse{
  params: {
    type_slug: string;
    keyword: string;
    filterCategory: string[];
    filterCountry: string[];
    filterYear: string;
    filterType: string;
    sortField: string;
    sortType: string;
  }
}

export interface LoadingProps {
  size?: string,
  type?: 'spinner'|'square'
}
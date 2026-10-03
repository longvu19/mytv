import axios from "axios";
import { useAltSourceStore } from "../stores/movie";
import type {
  AltMovieResponse,
  AltSearchResponse,
  AltServer,
  EpisodeSource,
  MovieDetail,
  MovieEpisode,
  ServerGroup,
} from "./types";

const altApi = axios.create({
  baseURL: import.meta.env.VITE_ALT_API_HOST,
  timeout: 5000,
});

const normalize = (text: string = ""): string =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const isSameMovie = (
  movie: MovieDetail,
  candidate: { origin_name: string; year: number }
): boolean =>
  normalize(candidate.origin_name) === normalize(movie.original_name) &&
  (!movie.year || !candidate.year || Number(movie.year) === Number(candidate.year));

const findAltSlug = async (movie: MovieDetail): Promise<string | null> => {
  // Slugs often match between the two APIs; verify before trusting it
  try {
    const { data } = await altApi.get<AltMovieResponse>(`/phim/${movie.slug}`);
    if (data.status && data.movie && isSameMovie(movie, data.movie)) {
      return data.movie.slug;
    }
  } catch {
    // fall through to search
  }
  const { data } = await altApi.get<AltSearchResponse>("/v1/api/tim-kiem", {
    params: { keyword: movie.name, limit: 10 },
  });
  const match = data.data?.items.find((item) => isSameMovie(movie, item));
  return match ? match.slug : null;
};

/**
 * Fetch episodes of the same movie from the secondary API.
 * Best-effort: any failure just means there is no second source.
 */
export const getAltServers = async (movie: MovieDetail): Promise<AltServer[]> => {
  if (!import.meta.env.VITE_ALT_API_HOST) return [];
  const store = useAltSourceStore();
  if (store.apiRes.has(movie.slug)) {
    return store.apiRes.get(movie.slug) as AltServer[];
  }
  let servers: AltServer[] = [];
  try {
    const slug = await findAltSlug(movie);
    if (slug) {
      const { data } = await altApi.get<AltMovieResponse>(`/phim/${slug}`);
      servers = data.status ? data.episodes ?? [] : [];
    }
  } catch {
    servers = [];
  }
  store.setApiRes(movie.slug, servers);
  setTimeout(() => {
    store.clearApiRes(movie.slug);
  }, 5 * 60 * 1000);
  return servers;
};

const serverKey = (serverName: string): string => {
  const name = normalize(serverName);
  if (name.includes("vietsub")) return "vietsub";
  if (name.includes("thuyet minh")) return "thuyet-minh";
  if (name.includes("long tieng")) return "long-tieng";
  return name.replace(/ /g, "-");
};

const serverLabel = (serverName: string): string =>
  serverName.replace(/#\s*\d+\s*$/, "").replace(/^#[^(]*\((.*)\)$/, "$1").trim();

// "1", "Tập 01" -> "1"; "Full", "FULL" -> "full"
const episodeKey = (name: string): string => {
  const num = name.match(/\d+/);
  return num ? String(parseInt(num[0], 10)) : normalize(name).replace(/^tap /, "");
};

const addSource = (
  group: ServerGroup,
  name: string,
  slug: string,
  source: EpisodeSource
): void => {
  const key = episodeKey(name);
  const existing = group.items.find((item) => item.key === key);
  if (existing) {
    existing.sources.push(source);
  } else {
    const isNumber = /^\d+$/.test(key);
    group.items.push({
      name: isNumber ? key : name,
      slug: isNumber ? `tap-${key}` : slug,
      key,
      sources: [source],
    });
  }
};

/**
 * Merge both APIs into one list of servers (Vietsub, Thuyết minh, ...),
 * each episode carrying every source available for it.
 */
export const buildServerGroups = (
  primary: MovieEpisode[],
  alt: AltServer[]
): ServerGroup[] => {
  const groups: ServerGroup[] = [];
  const getGroup = (serverName: string): ServerGroup => {
    const key = serverKey(serverName);
    let group = groups.find((g) => g.key === key);
    if (!group) {
      group = { key, name: serverLabel(serverName), items: [] };
      groups.push(group);
    }
    return group;
  };

  primary.forEach((server) => {
    const group = getGroup(server.server_name);
    server.items.forEach((ep) => {
      addSource(group, ep.name, ep.slug, { provider: "nguonc", type: "embed", url: ep.embed });
    });
  });

  alt.forEach((server) => {
    const group = getGroup(server.server_name);
    server.server_data.forEach((ep) => {
      if (ep.link_m3u8) {
        addSource(group, ep.name, ep.slug, { provider: "phimapi", type: "hls", url: ep.link_m3u8 });
      } else if (ep.link_embed) {
        addSource(group, ep.name, ep.slug, { provider: "phimapi", type: "embed", url: ep.link_embed });
      }
    });
  });

  groups.forEach((group) => {
    group.items.sort((a, b) => {
      const [na, nb] = [Number(a.key), Number(b.key)];
      return Number.isNaN(na) || Number.isNaN(nb) ? 0 : na - nb;
    });
    // m3u8 first so it becomes the default "Nguồn 1"
    group.items.forEach((item) => {
      item.sources.sort((a, b) => Number(b.type === "hls") - Number(a.type === "hls"));
    });
  });
  return groups.filter((group) => group.items.length > 0);
};

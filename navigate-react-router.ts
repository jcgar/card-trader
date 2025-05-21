/* eslint-disable react-hooks/rules-of-hooks */
import { matchPath as RRmatchPath } from "react-router-dom";

import {
  useParsed,
  Link,
  useGo,
} from "@refinedev/core";

export const AppLink = Link;

// adaptamos la interfaz esperada

export const useNavigate = () => {
  const go = useGo();
  return (path: string) => go({ to: path });
};

export const useParams = () => {
  const parsed = useParsed();
  return parsed?.params ?? {};
};

export const useLocation = () => {
  return useParsed();
};

export const matchPath = (pattern: string, pathname: string) => {
  RRmatchPath(pattern, pathname);
};

export const generatePath = (path: string, params: Record<string, any>) => {
  // podrías usar path-to-regexp o similar si refine no lo expone
  const compiled = path.replace(/:(\w+)/g, (_, key) => params[key] ?? "");
  return compiled;
};

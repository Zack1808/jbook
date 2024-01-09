import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

// Setting up the library for storing items into indexedDB
const cache = localForage.createInstance({
  name: "filecache",
});

export const unpkgPathPlugin = (term: string) => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResole", args);
        if (args.path === "index.js") {
          return { path: args.path, namespace: "a" };
        }

        if (args.path.includes("./")) {
          return {
            namespace: "a",
            path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`)
              .href,
          };
        }

        return {
          namespace: "a",
          path: `https:/unpkg.com/${args.path}`,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: term,
          };
        }

        // Check to see if the requested file is already downloaded and cached. If so, return immediately
        const cached = await cache.getItem<esbuild.OnLoadResult>(args.path);
        if (cached) return cached;

        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        // Store the response in cache
        await cache.setItem(args.path, result);

        return result;
      });
    },
  };
};

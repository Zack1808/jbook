import * as esbuild from "esbuild";
import axios from "axios";
import localForage from "localforage";

// Setting up the library for storing items into indexedDB
const cache = localForage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (term: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
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

        const fileType = args.path.match(/.css$/) ? "css" : "jsx";

        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents =
          fileType === "css"
            ? `
            const style = document.createElement('style');
            style.innerText = '${escaped}';
            document.head.appendChild(style)
          `
            : data;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        // Store the response in cache
        await cache.setItem(args.path, result);

        return result;
      });
    },
  };
};

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
      // Handle root entry file of 'index.js'
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: term,
        };
      });

      // Check to see if the requested file is already downloaded and cached. If so, return immediately
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cached = await cache.getItem<esbuild.OnLoadResult>(args.path);
        if (cached) return cached;
      });

      // Handle css files
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);

        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
            const style = document.createElement('style');
            style.innerText = '${escaped}';
            document.head.appendChild(style)
          `;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        // Store the response in cache
        await cache.setItem(args.path, result);

        return result;
      });

      // Handle other jsx files
      build.onLoad({ filter: /.*/ }, async (args: any) => {
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

import { resolve } from "path";

import { ConfigEnv, loadEnv, UserConfigExport } from "vite";
// import themePreprocessorPlugin from "@zougt/vite-plugin-theme-preprocessor";
import { viteMockServe } from "vite-plugin-mock";
import styleImport from "vite-plugin-style-import";
import svgLoader from "vite-svg-loader";

import react from "@vitejs/plugin-react";

import { createProxy } from "./build/proxy";
import { warpperEnv } from "./build/utils";

const pathResolve = (dir: string): string => {
  return resolve(__dirname, ".", dir);
};

const alias: Record<string, string> = {
  "/@": pathResolve("src"),
  "@build": pathResolve("build")
};

const root: string = process.cwd();

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = warpperEnv(
    loadEnv(mode, root)
  );
  console.log(VITE_PORT);
  console.log(VITE_PUBLIC_PATH);
  console.log(VITE_PROXY);
  const prodMock = true;
  return {
    /**
     * 基本公共路径
     * /manages/ 可根据项目部署域名的后缀自行填写（全局搜/manages/替换）
     * @default '/'
     */
    base:
      process.env.NODE_ENV === "production" ? "/manages/" : VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias
    },
    server: {
      /**
       * 端口号
       * @default 3000
       */
      port: VITE_PORT,
      host: "0.0.0.0",
      // 本地跨域代理
      proxy: createProxy(VITE_PROXY)
    },
    plugins: [
      react({
        include: "**/*.tsx"
      }),
      styleImport({
        libs: [
          {
            libraryName: "antd",
            esModule: true,
            resolveStyle: name => {
              return `antd/es/${name}/style/index`;
            }
          }
        ]
      }),
      svgLoader(),
      viteMockServe({
        mockPath: "mock",
        localEnabled: command === "serve",
        prodEnabled: command !== "serve" && prodMock,
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
        logger: true
      })
    ],
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false
    }
  };
};

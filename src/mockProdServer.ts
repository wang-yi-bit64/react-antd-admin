import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

import asyncRoutesMock from "../mock/asyncRoutes";
import echartsMock from "../mock/echarts";
import mapMock from "../mock/map";

export const mockModules = [...mapMock, ...echartsMock, ...asyncRoutesMock];

export function setupProdMockServer() {
  createProdMockServer(mockModules);
}

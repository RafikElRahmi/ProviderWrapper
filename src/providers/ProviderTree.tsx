import createProvWrap from "./provWrap";
import AuthProvider from "./prov1";
import ThemeProvider from "./prov2";
import DataProvider, { DataProviderType } from "./prov3";
import { reactChildren } from "./provWrap";

export type ProviderType = reactChildren | DataProviderType;
export type ProviderPropsType = null;

export type ProviderTreeType =  [ProviderType, ProviderPropsType?]

const ProviderTree = createProvWrap([
  [AuthProvider],
  [DataProvider],
  [ThemeProvider],
]);

export default ProviderTree;

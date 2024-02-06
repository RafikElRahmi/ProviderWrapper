import React from "react";
import { DataProviderType } from "./prov3";
import { fetchDataType } from "./ProviderTree";

export type reactChildren = React.FC<{ children: React.ReactNode }>;

export type ProviderType = reactChildren | DataProviderType;
export type ProviderPropsType = { fetchData: fetchDataType } | null;

export type ProviderTreeType = [ProviderType, ProviderPropsType?];
function createProvWrap(Comp: ProviderTreeType[]):reactChildren {
    
    const Initial: reactChildren = ({ children }) => <>{ children } </>;
    
  return Comp.reduce(
    (
      AccumelatedComps,
      [Provider, props = {}]
    ):reactChildren => {
          return ({ children }) => {
        return (
          <AccumelatedComps>
            <Provider {...props}>{children}</Provider>
          </AccumelatedComps>
        );
      };
    },
    Initial
  );
}

export default createProvWrap;

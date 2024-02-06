import React from "react";
import { ProviderTreeType } from "./ProviderTree";

export type reactChildren = React.FC<{ children: React.ReactNode }>;


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

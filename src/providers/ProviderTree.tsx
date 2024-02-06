import createProvWrap from "./provWrap";
import AuthProvider from "./prov1";
import ThemeProvider from "./prov2";
import DataProvider from "./prov3";

export type fetchDataType = () => Promise<{ data: string }>;



const fetchData: fetchDataType = async () => {
  const storedData = localStorage.getItem("data");

  if (storedData) {
    return { data: storedData };
  } else {
    const response = await fetch("/api/data");
    const fetchedData = await response.json();
    localStorage.setItem("data", fetchedData.data);
    return { data: fetchedData.data };
  }
};

const ProviderTree = createProvWrap([
  [AuthProvider],
  [DataProvider, { fetchData }],
  [ThemeProvider],
]);

export default ProviderTree;

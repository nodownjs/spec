import { ConfigProvider, theme } from "antd";
import "./App.css";
import docsPath from "./docs.json";

function App() {
  const { darkAlgorithm } = theme;

  console.log(docsPath);

  return (
    <ConfigProvider
      theme={{
        algorithm: darkAlgorithm,
      }}
    >
      {/* <RouterProvider /> */}
    </ConfigProvider>
  );
}

export default App;

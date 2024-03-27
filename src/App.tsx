import { ConfigProvider, theme } from "antd";
import { parser } from "nodown";
import { useEffect, useRef, useState } from "react";
// import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import { Nodown } from "react-nodown";
import { useNavigate, useParams } from "react-router-dom";
import { DataType, ThemeType, TocElement } from ".";
import "../node_modules/nodown/styles/index.css";
import "../node_modules/nodown/styles/theme-dark.css";
import "../node_modules/nodown/styles/theme-light.css";
import Header from "./components/header/Header";
import Navigation from "./components/navigation/Navigation";
import BlockCode from "./components/nodown/BlockCode";
import Table from "./components/nodown/Table";
import TableOfContent from "./components/table-of-content/TableOfContent";
import specPath from "./spec-path.json";

export function FormatLabel(text: string, only?: boolean): string {
  if (only)
    return text
      .replace(/\.md$/g, "")
      .replace(/^(?:\d-)?(\w)/, (_, group) => group);
  return text
    .replace(/(?:-|.md$)/g, " ")
    .replace(/^(?:\d\s)?(\w)/, (_, group) => group.toUpperCase());
}

function App() {
  const [data, setData] = useState<DataType[]>([]);
  const [nd, setNd] = useState<string>();
  const [toc, setToc] = useState<TocElement>();
  const [localTheme, setLocalTheme] = useState<ThemeType>("dark");
  const params = useParams();
  const { darkAlgorithm, defaultAlgorithm } = theme;
  const elementRef = useRef(null);
  const navigate = useNavigate();

  const renderOptions = {
    table: {
      disabled: false,
      childrenFormat: "object",
      customRender: (obj: {
        headers: { children: object[] }[];
        rows: { children: { children: [] }[] }[];
      }) => {
        return <Table obj={obj} />;
      },
    },
    "block-code": {
      childrenFormat: "object",
      customRender: (obj: {
        children: { children: string }[];
        language: string;
      }) => {
        const config = getAdaptedConfig(params.spec);
        return <BlockCode obj={obj} localTheme={localTheme} config={config} />;
      },
    },
  };

  if (!params.category || !params.spec) {
    navigate("/getting-started/introduction");
  }

  const spec = data.find(
    (item) => item.params === `${params.category}/${params.spec}`
  );
  console.log("🚀 ~ spec:", spec);

  function getAdaptedConfig(element?: string) {
    switch (element) {
      case "quick-start":
        return {
          horizontalAlignment: {
            disabled: false,
          },
          section: {
            disabled: false,
          },
        };
        break;
      case "div":
        return {
          horizontalAlignment: {
            disabled: false,
          },
          section: {
            disabled: true,
          },
        };
        break;
      case "footnote":
        return {
          horizontalAlignment: {
            disabled: true,
          },
          section: {
            disabled: false,
          },
        };
        break;
      default:
        return {
          horizontalAlignment: {
            disabled: true,
          },
          section: {
            disabled: true,
          },
        };
        break;
    }
  }

  useEffect(() => {
    if (data.length > 0) return;
    // console.log("fetching");
    const tempData: DataType[] = [];
    specPath.forEach((folder) => {
      folder.files.forEach((file) => {
        const id = `${folder.folder}/${file}`;
        const params = `${FormatLabel(folder.folder, true)}/${FormatLabel(
          file,
          true
        )}`;
        const path = `/spec/docs/${id}`;
        fetch(path)
          .then((response) => response.text())
          .then((data) => {
            tempData.push({ params, data, path });
          })
          .finally(() => {
            setData(tempData);
          });
      });
    });
  }, [data.length]);

  useEffect(() => {
    if (!spec || !spec.data) return;
    const tree = parser(spec?.data || "");
    setToc((tree as { tableOfContents: TocElement }).tableOfContents);
    return setNd(spec.data);
  }, [spec]);

  // useEffect(() => {
  //   console.log("Element changed");
  //   const codes = document.querySelectorAll(".custom-block-code");
  //   console.log("🚀 ~ codes:", codes);
  //   // update codes contains with jsx

  // }, [nd]);

  useEffect(() => {
    const localStorageTheme = localStorage.getItem("theme");
    if (localStorageTheme) {
      setLocalTheme(localStorageTheme as ThemeType);
      document.body.setAttribute("data-theme", localStorageTheme);
    }
  }, []);

  useEffect(() => {
    // console.log("nd");
    // console.log(renderToReact(parser(nd || "")));
  }, [nd]);

  const customDarkTheme = {
    algorithm: darkAlgorithm,
    token: {
      // colorBgBase: "#0f1319",
      colorBgContainer: "#0f1319",
      colorBorderSecondary: "#272b30",
      colorBgElevated: "#25292e",
    },
  };

  const customLightTheme = {
    algorithm: defaultAlgorithm,
  };

  return (
    <ConfigProvider
      theme={localTheme === "dark" ? customDarkTheme : customLightTheme}
    >
      <Header
        theme={localTheme}
        setTheme={(theme: string) => setLocalTheme(theme as ThemeType)}
        data={data}
      />
      <div>
        <Navigation data={specPath} />
        <main>
          <div id="nd-content" ref={elementRef}>
            <Nodown
              content={nd && nd?.length > 0 ? nd : ""}
              renderOptions={renderOptions}
            />
          </div>
          <TableOfContent toc={toc} />
        </main>
      </div>
    </ConfigProvider>
  );
}

export default App;

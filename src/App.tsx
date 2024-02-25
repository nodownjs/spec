import { ConfigProvider, theme } from "antd";
import { parser, renderToHTML } from "nodown";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataType, ThemeType, TocElement } from ".";
import "../node_modules/nodown/styles/index.css";
import "../node_modules/nodown/styles/theme-dark.css";
import "../node_modules/nodown/styles/theme-light.css";
import Header from "./components/header/Header";
import Navigation from "./components/navigation/Navigation";
import TableOfContent from "./components/table-of-content/TableOfContent";
import specsPath from "./specs-path.json";

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

  const spec = data.find(
    (item) => item.params === `${params.category}/${params.spec}`
  );

  useEffect(() => {
    if (data.length > 0) return;
    // console.log("fetching");
    const tempData: DataType[] = [];
    specsPath.forEach((folder) => {
      folder.files.forEach((file) => {
        const id = `${folder.folder}/${file}`;
        const params = `${FormatLabel(folder.folder, true)}/${FormatLabel(
          file,
          true
        )}`;
        const path = `/specs/specs/${id}`;
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
  }, []);

  useEffect(() => {
    if (!spec || !spec.data) return;
    const tree = parser(spec.data);
    setToc((tree as { tableOfContents: TocElement }).tableOfContents);
    const doc = renderToHTML(tree, {
      // table: {
      //   disabled: false,
      //   childrenFormat: "object",
      //   // customRender: () => {
      //   //   const span = <span>test</span>
      //   //   return span;
      //   // },
      // },
    });
    setNd(doc);
  }, [spec]);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setLocalTheme(localTheme as ThemeType);
      document.body.setAttribute("data-theme", localTheme);
    }
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: localTheme === "dark" ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <Header
        theme={localTheme}
        setTheme={(theme: string) => setLocalTheme(theme as ThemeType)}
        data={data}
      />
      <div>
        <Navigation data={specsPath} />
        <main>
          <div
            id="nd-content"
            dangerouslySetInnerHTML={{ __html: nd ? nd : "" }}
          ></div>
          <TableOfContent toc={toc} />
        </main>
      </div>
    </ConfigProvider>
  );
}

export default App;

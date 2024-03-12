import { ConfigProvider, Table, TableProps, theme } from "antd";
import { parser, renderToHTML } from "nodown";
import { useEffect, useRef, useState } from "react";
import { Nodown } from "react-nodown";
import { useParams } from "react-router-dom";
import { DataType, ThemeType, TocElement } from ".";
import "../node_modules/@ethicdevs/json-tree-view/dist/index.css";
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
  const elementRef = useRef(null);

  const renderOptions = {
    table: {
      disabled: false,
      childrenFormat: "object",
      customRender: (obj: {
        headers: { children: object[] }[];
        rows: { children: object[] }[];
      }) => {
        const columns = obj.headers.map((column: { children: object[] }) => {
          const title = renderToHTML(column.children[0]);
          return {
            title: title,
            key: title.toLocaleLowerCase().replace(/\s/g, "-"),
            dataIndex: title.toLocaleLowerCase().replace(/\s/g, "-"),
          };
        });
        const dataSource: TableProps<DataType>["columns"] = obj.rows.map(
          (row: { children: object[] }, i: number) => {
            const data: { [key: string]: React.ReactNode } = {
              key: i,
            };
            row.children.forEach(
              (cell: { children: object[] }, index: number) => {
                const key = columns[index].dataIndex;
                data[key] = (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: renderToHTML({
                        type: "paragraph",
                        children: [...cell.children],
                      }),
                    }}
                  ></span>
                );
              }
            );
            return data;
          }
        );
        //   console.log("🚀 ~ dataSource:", dataSource);
        const table = (
          <Table columns={columns} dataSource={dataSource} pagination={false} />
        );
        return table;
      },
    },
  };

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
    console.log(nd);
  }, [nd]);

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

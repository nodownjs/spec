import { parser, renderToHTML } from "nodown";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataType } from ".";
import "../node_modules/nodown/styles/index.css";
import "../node_modules/nodown/styles/theme-dark.css";
import "../node_modules/nodown/styles/theme-light.css";
import Header from "./components/header/Header";
import Navigation from "./components/header/Navigation";
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
  const params = useParams();

  const spec = data.find(
    (item) => item.params === `${params.category}/${params.spec}`
  );

  useEffect(() => {
    // console.log("fetching");
    specsPath.forEach((folder) => {
      folder.files.forEach((file) => {
        const id = `${folder.folder}/${file}`;
        const params = `${FormatLabel(folder.folder, true)}/${FormatLabel(
          file,
          true
        )}`;
        const path = `/public/specs/${id}`;
        fetch(path)
          .then((response) => response.text())
          .then((data) => {
            setData((prev) =>
              prev.length > 0
                ? [...prev, { params, data, path }]
                : [{ params, data, path }]
            );
          });
      });
    });
  }, [setData]);

  useEffect(() => {
    if (!spec || !spec.data) return;
    const tree = parser(spec.data);
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
    console.log(doc);

    setNd(doc);
  }, [spec]);

  return (
    <>
      <Header />
      <main>
        <Navigation data={specsPath} />
        <div id="navigation-space"></div>
        <div
          id="content"
          dangerouslySetInnerHTML={{ __html: nd ? nd : "loading..." }}
        ></div>
      </main>
    </>
  );
}

export default App;

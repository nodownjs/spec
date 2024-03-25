import JsonView from "@uiw/react-json-view";
import { lightTheme } from "@uiw/react-json-view/light";
import { nordTheme } from "@uiw/react-json-view/nord";
import { Segmented } from "antd";
import { parser, renderToHTML } from "nodown";
import { useEffect, useRef, useState } from "react";
import { Inspector } from "react-inspector";

function BlockCode({
  obj,
  localTheme,
  config,
}: {
  obj: {
    children: { children: string }[];
    language: string;
  };
  localTheme: "dark" | "light";
  config: object;
}) {
  const [renderOption, setRenderOption] = useState<
    "object" | "html" | "preview"
  >("preview");
  const iframeRef = useRef(null);
  const [reload, setReload] = useState(0);

  const code = obj.children
    .map((child) => child.children)
    .join("\n")
    .replace(/\\`\\`\\`/g, "```");

  const json: { children?: object[] } = parser(code, {
    ...config,
  });

  const htmlString = renderToHTML(json);
  const html = document.createElement("div");
  html.innerHTML = htmlString;
  const htmlElement = html.querySelector("#nodown-render");

  useEffect(() => {
    const iframe = iframeRef.current as HTMLIFrameElement | null;
    if (!iframe) return;
    const doc = iframe.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write("<!DOCTYPE html>" + htmlString);

    const themeStyle = doc.createElement("link");
    themeStyle.rel = "stylesheet";
    themeStyle.type = "text/css";
    themeStyle.href = `https://unpkg.com/nodown@latest/styles/theme-${localTheme}.css`;

    doc.head.appendChild(themeStyle);

    const basicStyle = doc.createElement("link");
    basicStyle.rel = "stylesheet";
    basicStyle.type = "text/css";
    basicStyle.href = `https://unpkg.com/nodown@latest/styles/index.css`;
    doc.head.appendChild(basicStyle);

    const customStyle = doc.createElement("style");
    customStyle.innerHTML = `
      #nodown-render {
        font-size: 19px;
      }
    `;
    doc.body.appendChild(customStyle);

    doc.body.style.padding = "0";
    doc.body.style.backgroundColor =
      localTheme === "dark" ? "#1b1f25" : "#f2f2f2";
    doc.body.style.color = localTheme === "dark" ? "#fff" : "#000";

    doc.body.setAttribute("data-theme", localTheme);

    doc.close();
  }, [htmlString, localTheme, reload]);

  if (obj.language.length > 0) {
    const regex = /<(\w+)>|(.)/gs;

    const result: Array<{ type: string; content: string }> = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(code)) !== null) {
      const content = match[1] ? match[1] : match[2];
      const type = match[1] ? "params" : "text";
      result.push({ type, content: content });
    }

    return (
      <pre className="nodown-block-code syntaxes">
        <code className="nodown-code">
          {result.map((r, i) => {
            if (r.type === "params") {
              return <span key={i}>{r.content}</span>;
            }
            return r.content;
          })}
        </code>
      </pre>
    );
  }

  return (
    <>
      <pre className="nodown-block-code">
        <code className="nodown-code">{code}</code>
      </pre>
      <Segmented
        options={[
          { label: "HTML Preview", value: "preview" },
          { label: "HTML Code View", value: "html" },
          { label: "Object View", value: "object" },
        ]}
        onChange={(value: "object" | "html" | "preview") => {
          setRenderOption(value);
        }}
      />
      <div className="custom-block-code-wrapper">
        <div
          className="custom-block-code"
          style={{
            transform:
              renderOption === "preview"
                ? "translateX(0)"
                : renderOption === "html"
                ? "translateX(calc(-100% - 1em))"
                : "translateX(calc(-200% - 2em))",
          }}
        >
          <div className="html-preview">
            <a className="reload" onClick={() => setReload((r) => r + 1)}>
              Reload
            </a>
            <iframe title="Contenu" ref={iframeRef} />
          </div>
          <div className="html-render">
            <Inspector
              theme={localTheme === "dark" ? "chromeDark" : "chromeLight"}
              data={htmlElement}
              table={false}
              expandLevel={10}
            />
          </div>
          <div className="object-render">
            <JsonView
              value={json.children}
              style={localTheme === "dark" ? nordTheme : lightTheme}
              enableClipboard={false}
              displayDataTypes={false}
              indentWidth={24}
              collapsed={4}
              highlightUpdates={false}
              displayObjectSize={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default BlockCode;

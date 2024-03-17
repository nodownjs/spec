import JsonView from "@uiw/react-json-view";
import { lightTheme } from "@uiw/react-json-view/light";
import { nordTheme } from "@uiw/react-json-view/nord";
import { Segmented } from "antd";
import { parser, renderToHTML } from "nodown";
import { useState } from "react";
import { Inspector } from "react-inspector";

function BlockCode({
  obj,
  localTheme,
}: {
  obj: {
    children: { children: string }[];
    language: string;
  };
  localTheme: string;
}) {
  const [renderOption, setRenderOption] = useState<"object" | "html">("object");

  const code = obj.children.map((child) => child.children).join("\n");
  if (obj.language.length > 0)
    return (
      <pre>
        <code>{code}</code>
      </pre>
    );
  const json = parser(code, {
    section: {
      disabled: true,
    },
    horizontalAlignment: {
      disabled: true,
    },
    root: {
      disabled: true,
    },
  });
  const json_ = parser(code, {
    section: {
      disabled: true,
    },
    horizontalAlignment: {
      disabled: true,
    },
    root: {
      disabled: false,
    },
  });

  const htmlString = renderToHTML(json_);
  const html = document.createElement("div");
  html.innerHTML = htmlString;
  const htmlElement = html.querySelector("#nodown-render");
  return (
    <>
      <pre>
        <code>{code}</code>
      </pre>
      <Segmented
        options={[
          { label: "Result in object", value: "object" },
          { label: "Result in HTML", value: "html" },
        ]}
        onChange={(value: "object" | "html") => {
          setRenderOption(value);
        }}
      />
      <div className="custom-block-code-wrapper">
        <div
          className="custom-block-code"
          style={{
            transform:
              renderOption === "object"
                ? "translateX(0)"
                : "translateX(calc(-100% - 1em))",
          }}
        >
          <div className="object-render">
            <JsonView
              value={json}
              style={localTheme === "dark" ? nordTheme : lightTheme}
              enableClipboard={false}
              displayDataTypes={false}
              indentWidth={24}
              collapsed={4}
              highlightUpdates={false}
              displayObjectSize={false}
            />
          </div>
          <div className="html-render">
            <Inspector
              theme={localTheme === "dark" ? "chromeDark" : "chromeLight"}
              data={htmlElement}
              table={false}
              expandLevel={10}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default BlockCode;

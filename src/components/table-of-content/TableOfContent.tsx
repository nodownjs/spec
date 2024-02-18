function convertData(data: TocElement): AnchorItem[] {
  return data.children.map((element: TocElement, index: number): AnchorItem => {
    const test = element.children.find(
      (child: TocElement) => child.type === "link"
    );

    if (!test || !test.href) {
      throw new Error("Link element or href not found");
    }

    const title = renderToHTML(test);
    const titleElement = document.createElement("span");
    titleElement.innerHTML = title;
    const item: AnchorItem = {
      key: `${index + 1}`,
      href: test.href,
      title: titleElement.textContent || "",
    };

    if (
      element.children?.some(
        (child: TocElement) => child.type === "unordered-list"
      )
    ) {
      const list = element.children.find(
        (child: TocElement) => child.type === "unordered-list"
      );
      if (list) {
        item.children = convertData(list);
      }
    }
    return item;
  });
}

import { Anchor } from "antd";
import { renderToHTML } from "nodown";
import { AnchorItem, TocElement } from "../..";

function TableOfContent({
  toc,
}: {
  toc?: { type: string; children: TocElement[] };
}) {
  if (!toc) return null;

  const convertedData = convertData(toc);

  return (
    <aside>
      <div>
        <header>Summary</header>
        <Anchor offsetTop={128} affix={false} items={convertedData} />
      </div>
    </aside>
  );
}

export default TableOfContent;

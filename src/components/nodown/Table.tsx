// Remove the unused import statement for 'antdTable'
import {
  BgColorsOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  FontSizeOutlined,
  NumberOutlined,
  PercentageOutlined,
} from "@ant-design/icons";
import { Table as AntdTable, TableProps, Tag } from "antd";
import { renderToHTML } from "nodown";
import { renderToReact } from "react-nodown";
import { DataType } from "../..";

function Table({
  obj,
}: {
  obj: {
    headers: { children: object[] }[];
    rows: { children: { children: [] }[] }[];
  };
}) {
  const columns: {
    title: string;
    key: string;
    dataIndex: string;
    render?: (text: string | string[]) => JSX.Element;
  }[] = obj.headers.map((column: { children: object[] }) => {
    const title = renderToHTML(column.children[0]);
    const name = title.toLocaleLowerCase().replace(/\s/g, "-");
    return {
      title: title,
      key: name === "value-type" ? "tags" : name,
      dataIndex: name,
    };
  });
  columns.forEach((column) => {
    if (column.dataIndex === "value-type")
      column.render = (tags) => {
        return (
          <>
            {tags && Array.isArray(tags) && tags.length > 0
              ? tags.map((type: string, i: number) => {
                  if (type.startsWith("text")) {
                    return (
                      <Tag key={i} icon={<FontSizeOutlined />} color="cyan">
                        {type}
                      </Tag>
                    );
                  } else if (type === "number") {
                    return (
                      <Tag key={i} icon={<NumberOutlined />} color="blue">
                        {type}
                      </Tag>
                    );
                  } else if (
                    type === "hex" ||
                    type === "rgb" ||
                    type === "hsl"
                  ) {
                    return (
                      <Tag key={i} icon={<BgColorsOutlined />} color="volcano">
                        {type}
                      </Tag>
                    );
                  } else if (type === "percentage") {
                    return (
                      <Tag
                        key={i}
                        icon={<PercentageOutlined />}
                        color="magenta"
                      >
                        {type}
                      </Tag>
                    );
                  } else {
                    return <span key={i}>{type}</span>;
                  }
                })
              : null}
          </>
        );
      };
    if (column.dataIndex === "required")
      column.render = (text) => {
        if (text === "required") {
          return (
            <Tag icon={<ExclamationCircleOutlined />} color="#d89614">
              Required
            </Tag>
          );
        } else {
          return (
            <Tag icon={<CheckCircleOutlined />} color="cyan">
              Optional
            </Tag>
          );
        }
      };
  });

  const dataSource: TableProps<DataType>["columns"] = obj.rows.map(
    (row: { children: { children: [] }[] }, i: number) => {
      const data: { [key: string]: React.ReactNode } = {
        key: i,
      };
      row.children.forEach(
        (cell: { children: { children }[] }, index: number) => {
          const key = columns[index].dataIndex;
          if (key === "value-type") {
            data[key] = cell.children[0].children.split(" or ");
          } else if (key === "required") {
            data[key] = cell.children[0].children.toLowerCase();
          } else {
            data[key] = renderToReact({
              type: "paragraph",
              children: [...cell.children],
            });
          }
        }
      );
      return data;
    }
  );

  return (
    <AntdTable columns={columns} dataSource={dataSource} pagination={false} />
  );
}

export default Table;

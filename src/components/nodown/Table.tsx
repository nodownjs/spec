// Remove the unused import statement for 'antdTable'
import { Table as AntdTable, TableProps } from "antd";
import { renderToHTML } from "nodown";
import { DataType } from "../..";

function Table({
  obj,
}: {
  obj: {
    headers: { children: object[] }[];
    rows: { children: { children: [] }[] }[];
  };
}) {
  const columns = obj.headers.map((column: { children: object[] }) => {
    const title = renderToHTML(column.children[0]);
    return {
      title: title,
      key: title.toLocaleLowerCase().replace(/\s/g, "-"),
      dataIndex: title.toLocaleLowerCase().replace(/\s/g, "-"),
    };
  });
  const dataSource: TableProps<DataType>["columns"] = obj.rows.map(
    (row: { children: { children: [] }[] }, i: number) => {
      const data: { [key: string]: React.ReactNode } = {
        key: i,
      };
      row.children.forEach((cell: { children: object[] }, index: number) => {
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
      });
      return data;
    }
  );
  return (
    <AntdTable columns={columns} dataSource={dataSource} pagination={false} />
  );
}

export default Table;

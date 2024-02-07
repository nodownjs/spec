import { Menu, MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import { PathType } from "../..";
import { FormatLabel } from "../../App";

function Navigation({ data }: { data: PathType[] }) {
  const items: MenuProps["items"] = data.map((folder) => {
    return {
      key: `grp-${folder.folder}`,
      type: "group",
      label: FormatLabel(folder.folder, false),
      children: folder.files.map((file) => {
        return {
          key: file,
          label: (
            <NavLink
              to={`/${FormatLabel(folder.folder, true)}/${FormatLabel(
                file,
                true
              )}`}
            >
              {FormatLabel(file, false)}
            </NavLink>
          ),
          type: "item",
        };
      }),
    };
  });

  const menu = <Menu mode="vertical" items={items} key={0} />;

  return <nav>{menu}</nav>;
}

export default Navigation;

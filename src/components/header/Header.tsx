import { Button, Select, SelectProps, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataType, ThemeType } from "../..";
import IconMoon from "./icons/MoonIcon";
import IconSun from "./icons/SunIcon";

const iconSize = 24;
const iconStroke = 1.5;

function Header({
  theme,
  setTheme,
  data,
}: {
  theme: ThemeType;
  setTheme: (theme: string) => void;
  data: DataType[];
}) {
  const navigate = useNavigate();
  const { Link } = Typography;
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  const [search, setSearch] = useState<string | null>();
  const [width, setWidth] = useState<number>(200);

  const switchTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  function handleBlur() {
    setOptions([]);
    setSearch(null);
    setWidth(200);
  }

  function handleSearch(value: string) {
    setOptions([]);
    setSearch(value);
    if (value.length < 1) {
      setSearch(null);
      return;
    }

    const result: { label: string; value: string; key: string }[] = [];

    data.forEach((doc: DataType) => {
      const regex = new RegExp(value, "gi");
      let match;
      let count = 0;
      while ((match = regex.exec(doc.data)) && count < 100) {
        const wordLength = 20;
        const beforeWord = doc.data.substring(
          Math.max(
            match.index - wordLength,
            doc.data.lastIndexOf("\n", match.index - 1) + 1
          ),
          match.index
        );
        const word = doc.data.substring(
          match.index,
          match.index + value.length
        );
        const afterWord = doc.data.substring(
          match.index + value.length,
          Math.min(
            match.index + value.length + wordLength,
            doc.data.indexOf("\n", match.index + value.length)
          )
        );
        result.push({
          key: doc.params,
          label: `${beforeWord}//${word}//${afterWord}`,
          value: doc.params + `//${beforeWord}${word}${afterWord}`,
        });
        count++;
      }
    });

    setOptions(
      result.reduce(
        (
          acc: { label: string; options: { value: string; label: string }[] }[],
          item
        ) => {
          const groupLabel = item.key;
          const option = { value: item.value, label: item.label };
          const existingGroup = acc.find(
            (group: { label: string }) => group.label === groupLabel
          );

          if (existingGroup) {
            existingGroup.options.push(option);
          } else {
            acc.push({ label: groupLabel, options: [option] });
          }

          return acc;
        },
        []
      )
    );
  }

  function onChange(value: string) {
    const page = value.split("//")[0];
    navigate(`/${page}`);
    setSearch(null);
  }

  return (
    <>
      <header id="header">
        <div>
          <div id="title">
            <img src="/spec/images/logo.svg" />
            <span>Nodown specification</span>
          </div>
          <div id="right">
            <nav>
              <ul>
                <Link href="https://nodownjs.github.io/">Home</Link>
                <Link href="https://github.com/nodownjs/nodown.js">Github</Link>
              </ul>
            </nav>
            <div id="actions">
              <div id="search">
                <Select
                  placeholder="Search"
                  showSearch
                  value={search}
                  onSearch={handleSearch}
                  options={options}
                  onChange={onChange}
                  notFoundContent={
                    !(search && search.length > 0) ? null : undefined
                  }
                  style={{
                    width: width,
                    transition: "width 0.3s",
                  }}
                  onFocus={() => {
                    setWidth(300);
                  }}
                  onBlur={handleBlur}
                  optionRender={(option) => {
                    const arr = (option.label as string)?.split("//") ?? "";
                    return (
                      <>
                        {arr[0]}
                        <span>{arr[1]}</span>
                        {arr[2]}
                      </>
                    );
                  }}
                />
              </div>
              <Button
                type="text"
                size="large"
                icon={
                  theme === "dark" ? (
                    <IconMoon size={iconSize} stroke={iconStroke} />
                  ) : (
                    <IconSun size={iconSize} stroke={iconStroke} />
                  )
                }
                onClick={switchTheme}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;

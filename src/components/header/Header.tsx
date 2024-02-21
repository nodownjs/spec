import { Button, Typography } from "antd";
import { ThemeType } from "../..";
import IconMoon from "./icons/MoonIcon";
import SearchIcon from "./icons/SearchIcon";
import IconSun from "./icons/SunIcon";

const iconSize = 24;
const iconStroke = 1.5;

function Header({
  theme,
  setTheme,
}: {
  theme: ThemeType;
  setTheme: (theme: string) => void;
}) {
  const { Link } = Typography;

  const switchTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  return (
    <>
      <header id="header">
        <div>
          <div id="title">
            <img src="/specs/images/logo.svg" />
            <span>Nodown syntaxes</span>
          </div>
          <div id="right">
            <nav>
              <ul>
                <Link>Home</Link>
                <Link href="https://github.com/nodownjs/nodown.js">Github</Link>
              </ul>
            </nav>
            <div id="search">
              <input type="text" placeholder="Search..." />
            </div>
            <div id="action">
              <Button
                type="text"
                size="large"
                icon={<SearchIcon size={iconSize} stroke={iconStroke} />}
              />
              <Button
                type="text"
                size="large"
                icon={
                  theme === "dark" ? (
                    <IconMoon size={iconSize} />
                  ) : (
                    <IconSun size={iconSize} />
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

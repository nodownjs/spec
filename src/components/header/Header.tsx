import { Typography } from "antd";

function Header() {
  const { Link } = Typography;

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
              <button>Theme</button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;

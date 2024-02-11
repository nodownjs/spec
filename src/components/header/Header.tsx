function Header() {
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
                <a href="#">Home</a>
                <a href="#">Github</a>
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

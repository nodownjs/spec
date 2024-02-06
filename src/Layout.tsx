import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}

export default Layout;

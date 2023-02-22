import Link from "next/link";

const Sidebar = () => {
  return (
    <nav className="navbar sidebar">
      <div className="bg-white">
        <ul className="navbar-nav d-flex flex-column justify-content-between">
          <li className="nav-item">
            <Link className="nav-link" href="/home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/home">
              Home
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;

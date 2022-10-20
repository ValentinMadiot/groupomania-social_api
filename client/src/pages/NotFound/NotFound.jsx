import { Link } from "react-router-dom";
import "./notfound.css"

const notFound = () => {
  return (
    <section className="notfound">
      <div>
        <h1>404</h1>
        <h2>Page not found</h2>
        <Link to="/">
          <div>Cliquer ici pour retourner à l'accueil</div>
        </Link>
      </div>
    </section>
  );
};

export default notFound;
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./styles/Header.css";

export const Header = () => {
  const { headerTitle, headerOnBack } = useSelector((state) => state.ui);

  return (
    <div className="row m-0 w-100">
      <div className="col-md-12 p-0">
        <nav className="d-flex align-items-center w-100 dashboard-header">
          {headerOnBack && (
            <button
              className="btn btn-link p-0 me-2 d-flex align-items-center"
              onClick={headerOnBack}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <ArrowBackIcon />
            </button>
          )}
          <h5 className="m-0 dashboard-header-title">{headerTitle}</h5>
        </nav>
      </div>
    </div>
  );
};

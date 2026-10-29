export const TableContainerIntersuj = ({ children, title, incompletos = 0, action }) => {
  return (
    <div className="table-container-intersuj">
      <div className="table-container-intersuj-header d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className=""
            style={{transform:'rotate(-90deg)', marginRight: "5px"}}
          >
            <path d="M0 12L12 12L0 0V12Z" fill="#595F73" />
          </svg>
          <span className="table-container-intersuj-title">{title}</span>
        </div>
        {incompletos > 0 && (
          <div>
            <span className="me-3 incompletos-info">{incompletos} estudiantes pendientes de categoría</span>
            <button className="btn-completar-info" onClick={action}>
              Completar info
            </button>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

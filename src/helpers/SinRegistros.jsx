export const SinRegistros = ({ text = "Sin registros" }) => {
  return (
    <div className="d-flex justify-content-center">
      <span className="badge bg-light text-dark">{text}</span>
    </div>
  );
};

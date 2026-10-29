import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledDataGridBox = styled(Box)(({ theme }) => ({
  width: "100%",
  "& .super-app-theme--header": {
    backgroundColor: "#323546",
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Oxygen",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
    "& .MuiDataGrid-columnHeaderTitleContainer": {
      justifyContent: "center", // Centra el texto de la cabecera en MUI
    },
  },
  "& .MuiDataGrid-columnSeparator": {
    display: "none", // Quita los separadores verticales (bordes entre columnas)
  },
  "& .MuiDataGrid-cell": {
    color: "rgba(31, 38, 62, 0.88)",
    textAlign: "center",
    fontFamily: "Oxygen",
    fontSize: "13px",
    fontStyle: "normal",
    fontWeight: 300,
    lineHeight: "normal",
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Para centrar el contenido de la celda
  },
  "& .MuiDataGrid-row.Mui-selected": {
    border: "1px solid #595F73",
    backgroundColor: "transparent !important", // Fondo transparente para la fila seleccionada
    "&:hover": {
      backgroundColor: "transparent !important", // Mantiene el fondo transparente al pasar el mouse por encima de una fila seleccionada
    },
  },
  "& .MuiDataGrid-overlay": {
    color: "#999",
    textAlign: "center",
    fontFamily: "Oxygen",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "normal",
  },
}));

import { AxiosData } from "../../../../services/AxiosConnexion";
import { ManageAxiosResponse } from "../../../../services/ResponseActionService";
import { TypeService } from "../../../../services/TypeService";
import { uiFinishLoading, uiStartLoading } from "../../../../ui/store";
import { setDataUniversity } from "./universityData_slice";

export const startLoadingUniversityData = () => {
  return async (dispatch, getState) => {
    dispatch(uiStartLoading("Cargando datos de la universidad..."));

    const idUniversidad = getState().auth.universityId;

    const resp = await AxiosData({
      endpoint: "Universities/" + idUniversidad,
      method: "GET",
      body: null,
      queryString: null,
      useGestionApi: false,
    });

    dispatch(uiFinishLoading());

    if (resp.respuestaStatus === TypeService.AxiosApiOk) {
      dispatch(setDataUniversity(resp.data));
    } else {
      dispatch(ManageAxiosResponse(resp));
    }
  };
};

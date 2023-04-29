import * as types from "./ActionType";
import axios from "axios";

const getMusicRecordRequest = () => {
  return {
    type: types.GET_MUSIC_RECORD_REQUEST,
  };
};

const getMusicRecord = (queryParams) => (dispatch) => {
  dispatch(getMusicRecordRequest());

  return axios
    .get("http://localhost:8080/albums", queryParams)
    .then((res) => {
      dispatch({
        type: types.GET_MUSIC_RECORD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: types.GET_MUSIC_RECORD_FAILURE });
    });
};

const updateMusicRecord = (id, payload) => (dispatch) => {
  dispatch({ type: types.UPDATE_MUSIC_RECORD_REQUEST });
  return axios
    .patch(`http://localhost:8080/albums/${id}`, payload)
    .then((res) => {
      dispatch({ type: types.UPDATE_MUSIC_RECORD_REQUEST });
    })
    .catch((err) => {
      dispatch({ type: types.UPDATE_MUSIC_RECORD_FAILURE });
    });
};

export { getMusicRecord, updateMusicRecord };

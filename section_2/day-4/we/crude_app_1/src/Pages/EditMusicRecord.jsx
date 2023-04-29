import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMusicRecord, updateMusicRecord } from "../Redux/App/Action";

function EditMusicRecord() {
  const { id } = useParams(); //this is return the object which is present in the url which is all dynamic params.

  const album = useSelector((state) => state.AppReducer.musicRecords);
  const [musicName, setMusicName] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleSubmit=(e)=>{
    console.log(musicName)
    e.preventDefault()
    if(musicName){
      const payload={
        name:musicName
      }
      dispatch(updateMusicRecord(id, payload)).then(()=>{navigate("/")})
    }
  }

  useEffect(() => {
    if (album.length === 0) {
      dispatch(getMusicRecord());
    }
  }, [album.length, dispatch]);

  useEffect(() => {
    if (id) {
      const currentMusic = album.find((album) => album.id == id);
      if (currentMusic) {
        setMusicName(currentMusic.name);
      }
    }
  }, [id, album]);

  return (
    <div>
      <h1>EDIT PAGE</h1>
      <div>
        <form  onSubmit={handleSubmit}>
          <div>
            <label>Edits music name</label>
            <input
              value={musicName}
              onChange={(e) => setMusicName(e.target.value)}
            />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditMusicRecord;

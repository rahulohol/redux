import React from 'react'
import MusicAlbum from '../component/MusicAlbum'
import styled from 'styled-components'
import FilterSort from '../component/FilterSort'

function MusicRecords() {
  return (
    <Wrapper color='green'>
    <WrapperFilterSort>
      <FilterSort />
    </WrapperFilterSort>
    <WrapperMusicAlbum>
    <MusicAlbum />
    </WrapperMusicAlbum>

    </Wrapper>
  );
};

const Wrapper =styled.div`
  border:${({color})=>`1px solid ${color};`}
  display:flex;
  min-height:100vh;
`;

const WrapperFilterSort=styled.div`
  width:200px;
  border:1px solid black ;
`;

const WrapperMusicAlbum=styled.div`
  border:1px solid blue;
  width:100%;
  display:grid;
  grid-template-columns: repeat(auto-fit,minmax(200px,max-content));
  justify-content:center;
  grid-gap:10px;
`;

export default MusicRecords
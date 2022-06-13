import Playlists from "./Playlists";
import React from "react";
import styled from "styled-components";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";

function SideBar() {

  return (
    <Container>
    {/*Menu*/}
        <ul>
          <li>
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li>
            <MdSearch />
            <span>Search</span>
          </li>
          <li>
            <IoLibrary />
            <span>Your Library</span>
          </li>
          <div style={{ borderTop: "2px solid purple", marginLeft: 5, marginRight: 5 }}></div>
        </ul>
      <Playlists />
    </Container>
  );
}
const Container = styled.div`
  place-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%
  color: blue;
  background-image: linear-gradient(5deg, rgba(15,251,35,1) 65%, #EEEEEE 100%);
}
ul
{
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  color: "rgba(154,15,225,1)"
}
li {
  display: flex;
  gap: 1rem;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    color: white;
  }
`;
export default SideBar;
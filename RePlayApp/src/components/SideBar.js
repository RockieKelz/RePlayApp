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
          <li to = "/search">
            <MdSearch />
            <span>Search</span>
          </li>
          <li>
            <IoLibrary />
            <span>Your Library</span>
          </li>
          <br/>
          <li className = "sidebar_subtext">
            <span>Playlists</span>
          </li>
          <div style={{ borderTop: "2px solid purple", marginLeft: 5, marginRight: 5 }}></div>
        </ul>
      <Playlists />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-height:84.5vh;
  height: 100%;
  width: 100%
  color: blue;
  background-image: linear-gradient(5deg, rgba(15,251,35,1) 65%, #EEEEEE 100%);
}
ul
{
  margin-left: 2%;
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
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    color: white; 
  }}
  .sidebar_subtext {
    margin-left: 10px;
    paddins: 5px;
    font-size: 18px;
    letter-spacing: 0.1ch;
  }
`;
export default SideBar;
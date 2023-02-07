import React from "react";
import { FaHeart } from "react-icons/fa";
import styled from "styled-components";
import { useAuthContext } from "../contexts/AuthContext.js";

export default function Heart({ user, isHearted }) {
  const { likeGithubUser } = useAuthContext();

  function handleClick() {
    const { id, login, html_url, avatar_url, repos_url, followers_url } = user;
    const request = {
      id,
      login,
      html_url,
      avatar_url,
      repos_url,
      followers_url,
    };
    likeGithubUser(request);
  }

  return (
    <Wrapper>
      <FaHeart
        style={isHearted ? { color: "red" } : null}
        className="heart"
        onClick={handleClick}
      />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  .heart {
    cursor: pointer;
  }
`;

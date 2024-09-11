import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
  cursor: pointer;
`;

function Logo() {
  const navigate = useNavigate();
  const {isDarkMode} = useDarkMode();

  const src = isDarkMode ? "/logo-dark.png" : "/logo-light.png";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" onClick={() => navigate("/")} />
    </StyledLogo>
  );
}

export default Logo;

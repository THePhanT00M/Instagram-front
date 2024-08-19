
import { useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../../../apollo";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Footer = styled.footer`
    margin-top: 20px;
    text-align: center;
`;

const DarkModeBtn = styled.span`
  cursor: pointer;
`;

function AuthLayout({ children }) {
    const darkMode = useReactiveVar(darkModeVar);
    return (
        <Container>
            <Wrapper>
                {children}
                <Footer>
                    <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
                        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                    </DarkModeBtn>
                </Footer>
            </Wrapper>

        </Container>
    );
}

export default AuthLayout;

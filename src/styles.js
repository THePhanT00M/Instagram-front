import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
    accent: "#0095f6",
    bgColor: "#FAFAFA",
    fontColor: "rgb(38, 38, 38)",
    borderColor: "rgb(219, 219, 219)",
};

export const darkTheme = {
    fontColor: "white",
    bgColor: "#000",
};

export const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');

    ${reset}
    * {
        font-family: "Noto Sans KR", sans-serif!important;
        font-optical-sizing: auto;
        font-style: normal;
        box-sizing:border-box;
    }
    body {
        background-color:${(props) => props.theme.bgColor};
        font-size:14px;
        font-family:'Open Sans', sans-serif;
        color:${(props) => props.theme.fontColor};
    }
    input {
        all:unset;
    }
    a {
        text-decoration: none;
    }
`;
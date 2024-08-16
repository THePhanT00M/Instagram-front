import styled from "styled-components";

const Input = styled.input.withConfig({
    shouldForwardProp: (prop) => prop !== "haserror", // Filter out `hasError` to avoid passing it to the DOM
})`
    width: 100%;
    border-radius: 3px;
    padding: 7px;
    background-color: #fafafa;
    border: 0.5px solid
    ${(props) => (props.haserror ? "tomato" : props.theme.borderColor)};
    margin-top: 5px;
    box-sizing: border-box;

    &::placeholder {
        font-size: 12px;
    }

    &:focus {
        border-color: rgb(38, 38, 38);
    }
`;

export default Input;

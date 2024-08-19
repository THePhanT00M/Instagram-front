import styled from "styled-components";
import { BaseBox } from "../shared";

const Container = styled(BaseBox)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px 0;
    margin-bottom: 10px;

    form {
        margin-top: 35px;
        width: 100%;
    }
`;

function FormBox({ children }) {
    return <Container>{children}</Container>;
}
export default FormBox;
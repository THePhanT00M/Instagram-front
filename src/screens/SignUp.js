import { gql, useMutation } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // useNavigate로 변경
import styled from "styled-components";
import AuthLayout from "./components/auth/AuthLayout";
import BottomBox from "./components/auth/BottomBox";
import Button from "./components/auth/Button";
import FormBox from "./components/auth/FormBox";
import Input from "./components/auth/Input";
import PageTitle from "./components/PageTitle";
import { FatLink } from "./components/shared";
import routes from "../routes";

const Logo = styled.div`
    margin-top: 36px;
    margin-bottom: 10px;
`

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Subtitle = styled(FatLink)`
    font-size: 16px;
    text-align: center;
    margin: 0 40px 10px;
`;

const FormBoxLayout = styled.div`
    margin: 0 40px 6px;
`

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccount(
        $firstName: String!
        $lastName: String
        $username: String!
        $email: String!
        $password: String!
    ) {
        createAccount(
            firstName: $firstName
            lastName: $lastName
            username: $username
            email: $email
            password: $password
        ) {
            ok
            error
        }
    }
`;

function SignUp() { // 컴포넌트 이름 수정
    const navigate = useNavigate(); // useHistory 대신 useNavigate 사용
    const onCompleted = (data) => {
        const { username, password } = getValues();
        const {
            createAccount: { ok },
        } = data;
        if (!ok) {
            return;
        }
        navigate(routes.home, {
            state: {
                message: "Account created. Please log in.",
                username,
                password,
            },
        });
    };
    const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
        onCompleted,
    });
    const {
        register,
        handleSubmit,
        formState,
        getValues,
    } = useForm({
        mode: "onChange",
    });
    const onSubmitValid = (data) => {
        if (loading) {
            return;
        }
        createAccount({
            variables: {
                ...data,
            },
        });
    };
    return (
        <AuthLayout>
            <PageTitle title="Sign up" />
            <FormBox>
                <HeaderContainer>
                    <Logo>
                        <FontAwesomeIcon icon={faInstagram} size="3x" />
                    </Logo>
                    <Subtitle>
                        Sign up to see photos and videos from your friends.
                    </Subtitle>
                </HeaderContainer>
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <FormBoxLayout>
                        <Input
                            {...register("firstName", { required: "First Name is required." })}
                            type="text"
                            placeholder="First Name"
                        />
                    </FormBoxLayout>
                    <FormBoxLayout>
                        <Input
                            {...register("lastName")}
                            type="text"
                            placeholder="Last Name"
                        />
                    </FormBoxLayout>
                    <FormBoxLayout>
                        <Input
                            {...register("email", { required: "Email is required." })}
                            type="text"
                            placeholder="Email"
                        />
                    </FormBoxLayout>
                    <FormBoxLayout>
                        <Input
                            {...register("username", { required: "Username is required." })}
                            type="text"
                            placeholder="Username"
                        />
                    </FormBoxLayout>
                    <FormBoxLayout>
                        <Input
                            {...register("password", { required: "Password is required." })}
                            type="password"
                            placeholder="Password"
                        />
                    </FormBoxLayout>
                    <FormBoxLayout>
                        <Button
                            type="submit"
                            value={loading ? "Loading..." : "Sign up"}
                            disabled={!formState.isValid || loading}
                        />
                    </FormBoxLayout>
                </form>
            </FormBox>
            <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
        </AuthLayout>
    );
}

export default SignUp;

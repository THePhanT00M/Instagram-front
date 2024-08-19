import {gql, useMutation} from "@apollo/client";
import {
    faFacebookSquare,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useForm} from "react-hook-form";
import {useLocation} from "react-router-dom";
import styled from "styled-components";
import {logUserIn} from "../apollo";
import AuthLayout from "./components/auth/AuthLayout";
import BottomBox from "./components/auth/BottomBox";
import Button from "./components/auth/Button";
import FormBox from "./components/auth/FormBox";
import FormError from "./components/auth/FormError";
import Input from "./components/auth/Input";
import Separator from "./components/auth/Separator";
import PageTitle from "./components/PageTitle";
import routes from "../routes";

const Logo = styled.div`
    margin-top: 36px;
    margin-bottom: 10px;
`

const FormBoxLayout = styled.div`
    margin: 0 40px 6px;
`

const FacebookLogin = styled.div`
    color: #385285;
    margin: 8px 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
        margin-left: 10px;
        font-weight: 600;
    }
`;

const Notification = styled.div`
    margin-top: 35px;
    color: #2ecc71;
`;

const ErrorMessage = styled.div`
    color: #ed4956;
    margin: 10px 40px;
    text-align: center;
`;

const LOGIN_MUTATION = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            ok
            token
            error
        }
    }
`;

function Login() {
    const location = useLocation();
    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        getValues,
        setError,
        clearErrors,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            username: location?.state?.username || "",
            password: location?.state?.password || "",
        },
    });

    const onCompleted = (data) => {
        const {
            login: {ok, error, token},
        } = data;
        if (!ok) {
            return setError("result", {
                type: "manual",
                message: error,
            });
        }
        if (token) {
            logUserIn(token);
        }
    };

    const [login, {loading}] = useMutation(LOGIN_MUTATION, {
        onCompleted,
    });

    const onSubmitValid = () => {
        if (loading) return;

        const {username, password} = getValues();
        login({
            variables: {username, password},
        });
    };

    const clearLoginError = () => clearErrors("result");

    return (
        <AuthLayout>
            <PageTitle title="Login"/>
            <FormBox>
                <Logo>
                    <FontAwesomeIcon icon={faInstagram} size="3x"/>
                </Logo>
                {location?.state?.message && (
                    <Notification>{location.state.message}</Notification>
                )}
                <form onSubmit={handleSubmit(onSubmitValid)}>
                    <FormBoxLayout>
                        <Input
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 5,
                                    message: "Username should be longer than 5 chars.",
                                },
                            })}
                            onChange={clearLoginError}
                            type="text"
                            placeholder="Username"
                            haserror={Boolean(errors?.username?.message)}
                        />
                        <FormError message={errors?.username?.message}/>
                    </FormBoxLayout>
                    <FormBoxLayout>
                        <Input
                            {...register("password", {
                                required: "Password is required.",
                            })}
                            onChange={clearLoginError}
                            type="password"
                            placeholder="Password"
                            haserror={Boolean(errors?.password?.message)}
                        />
                        <FormError message={errors?.password?.message}/>
                    </FormBoxLayout>
                    <FormBoxLayout>
                        <Button
                            type="submit"
                            value={loading ? "Loading..." : "Log in"}
                            disabled={!isValid || loading}
                        />
                    </FormBoxLayout>
                    <FormBoxLayout>
                        <Separator/>
                    </FormBoxLayout>
                    <FacebookLogin>
                        <FontAwesomeIcon icon={faFacebookSquare}/>
                        <span>Log in with Facebook</span>
                    </FacebookLogin>
                    <ErrorMessage>
                        {errors?.result?.message}
                    </ErrorMessage>
                </form>
            </FormBox>
            <BottomBox
                cta="Don't have an account?"
                linkText="Sign up"
                link={routes.signUp}
            />
        </AuthLayout>
    );
}

export default Login;

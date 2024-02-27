'use client'
import React, {useState} from 'react';
import AuthForm from "@/ui/forms/AuthForm/AuthForm";
import ErrorNotification from "@/ui/forms/ErrorNotification/ErrorNotification";
import FormHeader from "@/ui/forms/FormHeader/FormHeader";
import FormInput from "@/ui/inputs/FormInput/FormInput";
import FormButton from "@/ui/buttons/FormButton/FormButton";
import FormLayout from "@/ui/forms/FormLayout/FormLayout";
import FormLink from "@/ui/forms/FormLink/FormLink";
import FormCheckBox from "@/ui/forms/FormCheckBox/FormCheckBox";
import {useAppDispatch} from "@/lib/hooks";
import {IErrorResponse} from "@/types/http";
import {userLogin} from "@/lib/features/user/userActions";

const LoginForm = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [rememberMe, setRememberMe] = useState(false);
    const dispatch = useAppDispatch();

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if(!login){
            setIsError(true);
            setErrorMessage('Login is invalid');
            return;
        }
        if(!password){
            setIsError(true);
            setErrorMessage('Password is invalid');
            return;
        }
        setIsError(false);
        dispatch(userLogin(login, password, rememberMe)).catch((reason: IErrorResponse) => {
            setIsError(true);
            setErrorMessage(reason.error);
        });
    }
    return (
        <FormLayout>
            <AuthForm onSubmit={submitHandler}>
                <ErrorNotification isActive={isError} notificationText={errorMessage}/>
                <FormHeader text={'Sign In'}/>
                <FormInput value={login}
                           onChange={(event) => setLogin(event.target.value)}
                           placeholder={'Login'} icon={'person'} withIcon={true} max={32}/>
                <FormInput value={password}
                           onChange={(event) => setPassword(event.target.value)}
                           placeholder={'Password'} icon={'lock'} withIcon={true} type={'password'} max={32}/>
                <FormButton disabled={false} text={'Sign up'}/>
                <FormCheckBox text={'Remember me'} type={"checkbox"} checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)}/>
                <FormLink text={'Don\'t have an account yet?'} linkText={'Register now'} link={'/registration'}/>
            </AuthForm>
        </FormLayout>
    );
};

export default LoginForm;
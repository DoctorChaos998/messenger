'use client'
import React, {useState} from 'react';
import classes from "./RegistrationForm.module.scss";
import FormLayout from "@/ui/forms/FormLayout/FormLayout";
import AuthForm from "@/ui/forms/AuthForm/AuthForm";
import {useAppDispatch} from "@/lib/hooks";
import FormInput from "@/ui/inputs/FormInput/FormInput";
import FormHeader from "@/ui/forms/FormHeader/FormHeader";
import FormButton from "@/ui/buttons/FormButton/FormButton";
import ErrorNotification from "@/ui/forms/ErrorNotification/ErrorNotification";
import UserService from "@/http/userService/userService";
import {useRouter} from "next/navigation";
import Link from "next/link";
import FormLink from "@/ui/forms/FormLink/FormLink";

const RegistrationForm = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();

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
        UserService.registration(login, password).then(() => {
            router.push('/login');
        }).catch(() => {
            setIsError(true);
            setErrorMessage('Login is taken');
            setLogin('');
        })
    }
    return (
        <FormLayout>
            <AuthForm onSubmit={submitHandler}>
                <ErrorNotification isActive={isError} notificationText={errorMessage}/>
                <FormHeader text={'Sign Up'}/>
                <FormInput value={login}
                           onChange={(event) => setLogin(event.target.value)}
                           placeholder={'Login'} icon={'person'} withIcon={true} max={32}></FormInput>
                <FormInput value={password}
                           onChange={(event) => setPassword(event.target.value)}
                           placeholder={'Password'} icon={'lock'} withIcon={true} type={'password'} max={32}></FormInput>
                <FormButton disabled={false} text={'Sign up'}/>
                <FormLink text={'Already have an account?'} linkText={'Sign in'} link={'/login'}/>
            </AuthForm>
        </FormLayout>
    );
};

export default RegistrationForm;
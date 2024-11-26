import React from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import loginPageConstants from '../../../constants/loginPage/loginPageConstants';
import { registrationFormConstants } from '../../../constants/loginPage/forms/registrationFormConstants';
import { baseUrl } from "../../../constants/shared/baseUrl"

function RegistrationForm({ setFromEnabler, showToast }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {

        const userData = JSON.stringify({
            "name": data.name,
            "password": data.password
        })
        sessionStorage.setItem(loginPageConstants.USER_INFO_SS, userData);
        // setFromEnabler(false);
        // showToast(registrationFormConstants.USER_REGISTERED_MSG);

        axios.post(`${baseUrl}/api/v1/auth/admin-register-user`, {
            "name": data.name,
            "email": data.email,
            "password": data.password
        })
            .then((response) => {
                sessionStorage.setItem(loginPageConstants.USER_INFO_SS, userData);
                setFromEnabler(false);
                showToast(registrationFormConstants.USER_REGISTERED_MSG);
            })
            .finally((err) => {
                // setIsSpinning(() => false);
                console.log(err);
                showToast(registrationFormConstants.WRONG_REGISTER_ERROR);
            });

    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="login-fom-con"
        >
            <h2 id="lf-title"> Etap </h2>
            <label
                htmlFor={registrationFormConstants.NAME}
            >
                Name*
            </label>
            <input
                {...register('name', { required: true, maxLength: 30 })}
                type="text"
                id={registrationFormConstants.NAME}
                placeholder={"Enter " + registrationFormConstants.NAME}
                autoComplete="off"
            />
            {errors.name && errors.name.type === "required" && <span>This is required</span>}
            {errors.name && errors.name.type === "maxLength" && <span>Max length exceeded</span>}

            <label
                htmlFor={registrationFormConstants.NAME}
            >
                Email*
            </label>
            <input
                {...register('email', { required: true, maxLength: 30 })}
                type="email"
                id={registrationFormConstants.NAME}
                placeholder={"Enter " + registrationFormConstants.EMAIL}
                autoComplete="off"
            />
            {errors.name && errors.name.type === "required" && <span>This is required</span>}
            {errors.name && errors.name.type === "maxLength" && <span>Max length exceeded</span>}
            <label
                htmlFor={registrationFormConstants.PASSWORD}
            >
                Password*
            </label>
            <input
                {...register('password', { required: true, maxLength: 30 })}
                type="password"
                id={registrationFormConstants.PASSWORD}
                placeholder={"Enter " + registrationFormConstants.PASSWORD}
            />
            {errors.password && errors.password.type === "required" && <span>This is required</span>}
            {errors.password && errors.password.type === "maxLength" && <span>Max length exceeded</span>}
            <input
                type="submit"
                name="submit"
                id="submit"
                value={"Sign Up"}
            />
            <p> Already have an account ?</p>
        </form >
    )
}

export default RegistrationForm
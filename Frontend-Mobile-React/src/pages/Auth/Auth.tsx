import React, { useState } from 'react';
import {
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonPage,
    IonButtons,
    IonMenuButton,
} from "@ionic/react";
import { useForm, SubmitHandler } from "react-hook-form";
import './Auth.css';
import Api from "../../Service/Api";
import { useHistory } from "react-router-dom";

interface IFormInput {
    usernm: string;
    psw: string;
}

const Auth: React.FC = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onChange" });
    const onSubmit: SubmitHandler<IFormInput> = data => check(data);

    const [isRegistration, setIsRegistration] = useState(true);
    const toggleChecked = () => setIsRegistration(prevCheck => !prevCheck);

    const history = useHistory();

    const [isLogin, setIsLogin] = useState(true)


    function check(data: any) {
        if (isRegistration == true) {
            console.log("true");
            onLoginClick(data);
        }
        if (isRegistration == false) {
            console.log("false");
            onRegistrationClick(data);
        }
    }

    function onLoginClick(val: any) {
        var data = {
            username: val.usernm,
            password: val.psw
        }
        var api = new Api();
        api.login(data)
            .then(function (response: any) {
                console.log(response);
                localStorage.setItem("accessToken", response.data.accessToken)
                localStorage.setItem("id_users", response.data.id_users)
                localStorage.setItem("refreshToken", response.data.refreshToken)
                history.push("/");
            })
            .catch(function (error: any) {
                console.log(error);
            })
            .then(function () {
                console.log("login")
            });
    }

    function onRegistrationClick(val: any) {
        var data = {
            username: val.usernm,
            password: val.psw
        }
        var api = new Api();
        api.registration(data)
            .then(function (response: any) {
                console.log(response);
                toggleChecked();
            })
            .catch(function (error: any) {
                console.log(error);
            })
            .then(function () {
                console.log("reg")
            });
    }

    function isInfoUsers() {
        if (localStorage.getItem("id_users") == null || localStorage.getItem("refreshToken") == null || localStorage.getItem("accessToken") == null) {
            localStorage.clear();
            return true;
        }
        return false;
    }

    function logout() {
        var api = new Api();
        api.logout(localStorage.getItem("id_users"))
            .then(function (response: any) {
                console.log(response);
            })
            .catch(function (error: any) {
                console.log(error);
            })
            .then(function () {
                console.log("reg")
                localStorage.clear();
                history.push("/auth");
            });
    }

    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>About</IonTitle>
                        <IonButtons slot="start">
                            <IonMenuButton />

                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    {
                        isInfoUsers() &&
                        <IonGrid>
                            <IonRow>
                                <IonCol size="12" size-xs><div></div></IonCol>
                                <IonCol size="12" size-sm>
                                    <div>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="form">
                                                <IonItem lines="none">
                                                    <IonLabel position="stacked" style={{ marginBottom: '5px' }}>Username</IonLabel>
                                                    <input
                                                        id="usernm"
                                                        placeholder="Enter username"
                                                        aria-invalid={errors.usernm ? "true" : "false"}
                                                        {...register('usernm', { required: true, minLength: 4, maxLength: 30 })} />
                                                    <div className="messageError">
                                                        {errors.usernm && errors.usernm.type === "required" && (
                                                            <div role="alert">This is required</div>
                                                        )}
                                                        {errors.usernm && errors.usernm.type === "minLength" && (
                                                            <div role="alert">Min length exceeded</div>
                                                        )}
                                                        {errors.usernm && errors.usernm.type === "maxLength" && (
                                                            <div role="alert">Max length exceeded</div>
                                                        )}
                                                    </div>
                                                </IonItem>
                                                <IonItem lines="none">
                                                    <IonLabel position="stacked" style={{ marginBottom: '5px' }}>Password</IonLabel>
                                                    <input
                                                        id="psw"
                                                        type="password"
                                                        placeholder="Enter password"
                                                        aria-invalid={errors.psw ? "true" : "false"}
                                                        {...register('psw', { required: true, minLength: 4, maxLength: 30 })}
                                                    />
                                                    <div className="messageError">
                                                        {errors.psw && errors.psw.type === "required" && (
                                                            <div role="alert">This is required</div>
                                                        )}
                                                        {errors.psw && errors.psw.type === "minLength" && (
                                                            <div role="alert">Min length exceeded</div>
                                                        )}
                                                        {errors.psw && errors.psw.type === "maxLength" && (
                                                            <div role="alert">Max length exceeded</div>
                                                        )}
                                                    </div>
                                                </IonItem>
                                            </div>
                                            <div>
                                                {isRegistration ?
                                                    <div>
                                                        <IonButton type="submit" className="ion-margin-top" expand="block" disabled={!isValid}>Login</IonButton>
                                                        <IonButton expand="block" fill="clear" onClick={() => toggleChecked()}>Registration</IonButton>
                                                    </div> :
                                                    <div>
                                                        <IonButton type="submit" className="ion-margin-top" expand="block" disabled={!isValid}>Registration</IonButton>
                                                        <IonButton expand="block" fill="clear" onClick={() => toggleChecked()}>Login</IonButton>
                                                    </div>
                                                }
                                            </div>
                                        </form>
                                    </div>
                                </IonCol>
                                <IonCol size="12" size-xs><div></div></IonCol>
                            </IonRow>
                        </IonGrid>
                    }
                    {
                        !isInfoUsers() &&
                        <IonButton onClick={() => logout()}>
                            Log out
                        </IonButton>
                    }
                </IonContent>
            </IonPage>
        </>
    );
}

export default Auth;

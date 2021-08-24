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
} from "@ionic/react";
import { useForm, SubmitHandler } from "react-hook-form";
import './About.css';
import Api from "../../Service/Api";
import { useHistory } from "react-router-dom";

interface IFormInput {
    usernm: string;
    psw: string;
}
const About = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "onChange" });
    const onSubmit: SubmitHandler<IFormInput> = data => check(data);

    const [isRegistration, setIsRegistration] = useState(true);
    const toggleChecked = () => setIsRegistration(prevCheck => !prevCheck);

    const history = useHistory();


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
                history.push("/about");
            });
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Auth</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
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
        </>
    );
}

export default About;

// import React from "react";
// import { useForm, SubmitHandler } from "react-hook-form";

// interface IFormInput {
//     name: string;
//     psw: string;
// }

// const About = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <label htmlFor="name">Name</label>

//             {/* use aria-invalid to indicate field contain error */}
//             <input
//                 id="name"
//                 aria-invalid={errors.name ? "true" : "false"}
//                 {...register('name', { required: true, minLength: 4, maxLength: 30 })}
//             />

//             {/* use role="alert" to announce the error message */}
//             {errors.name && errors.name.type === "required" && (
//                 <div role="alert">This is required</div>
//             )}
//             {errors.name && errors.name.type === "minLength" && (
//                 <div role="alert">Min length exceeded</div>
//             )}
//             {errors.name && errors.name.type === "maxLength" && (
//                 <div role="alert">Max length exceeded</div>
//             )}

//             <input
//                 id="psw"
//                 aria-invalid={errors.psw ? "true" : "false"}
//                 {...register('psw', { required: true, minLength: 4, maxLength: 30 })}
//             />

//             {/* use role="alert" to announce the error message */}
//             {errors.psw && errors.psw.type === "required" && (
//                 <div role="alert">This is required</div>
//             )}
//             {errors.psw && errors.psw.type === "minLength" && (
//                 <div role="alert">Min length exceeded</div>
//             )}
//             {errors.psw && errors.psw.type === "maxLength" && (
//                 <div role="alert">Max length exceeded</div>
//             )}

//             <input type="submit" />
//         </form>
//     );
// }

// export default About;


// import React, { Component } from 'react';
// import { FormErrors } from '../../components/FormErrors';

// class About extends Component {
//     state = {
//         email: '',
//         password: '',
//         formErrors: { email: '', password: '' },
//         emailValid: false,
//         passwordValid: false,
//         formValid: false
//     }
//     handleUserInput = (e: any) => {
//         const name = e.target.name;
//         const value = e.target.value;
//         this.setState({ [name]: value },
//             () => { this.validateField(name, value) });
//     }

//     validateField(fieldName: any, value: any) {
//         let fieldValidationErrors = this.state.formErrors;
//         let emailValid = this.state.emailValid;
//         let passwordValid = this.state.passwordValid;

//         switch (fieldName) {
//             case 'email':
//                 emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
//                 fieldValidationErrors.email = emailValid ? '' : ' is invalid';
//                 break;
//             case 'password':
//                 passwordValid = value.length >= 6;
//                 fieldValidationErrors.password = passwordValid ? '' : ' is too short';
//                 passwordValid = value.length <= 10;
//                 fieldValidationErrors.password = passwordValid ? '' : ' Error';
//                 break;
//             default:
//                 break;
//         }
//         this.setState({
//             formErrors: fieldValidationErrors,
//             emailValid: emailValid,
//             passwordValid: passwordValid
//         }, this.validateForm);
//     }

//     validateForm() {
//         this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
//     }

//     errorClass(error: any) {
//         return (error.length === 0 ? '' : 'has-error');
//     }

//     render() {
//         return (
//             <form className="demoForm">
//                 <h2>Sign up</h2>
//                 <div className="panel panel-default">
//                     <FormErrors formErrors={this.state.formErrors} />
//                 </div>
//                 <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
//                     <label htmlFor="email">Email address</label>
//                     <input type="email" required className="form-control" name="email"
//                         placeholder="Email"
//                         value={this.state.email}
//                         onChange={this.handleUserInput} />
//                 </div>
//                 <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
//                     <label htmlFor="password">Password</label>
//                     <input type="password" className="form-control" name="password"
//                         placeholder="Password"
//                         value={this.state.password}
//                         onChange={this.handleUserInput} />
//                 </div>
//                 <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Sign up</button>
//             </form>
//         )
//     }
// }

// export default About;



// import React from 'react';
// import { IonCard, IonCardHeader, IonCardContent } from "@ionic/react";

// const About = () => {
//     return (
//         <IonCard>
//             <IonCardHeader>
//                 <h1>About</h1>
//             </IonCardHeader>
//             <IonCardContent>
//                 This is the about page.
//           </IonCardContent>
//         </IonCard>
//     );
// }

// export default About;
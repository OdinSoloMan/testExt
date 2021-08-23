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
    IonInput
} from "@ionic/react";
import './Auth.css';
import { RefresherEventDetail } from '@ionic/core';

const Auth: React.FC = () => {
    const [isRegistration, setIsRegistration] = useState(true);

    const toggleChecked = () => setIsRegistration(prevCheck => !prevCheck);

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Auth</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" size-xs><div></div></IonCol>
                        <IonCol size="12" size-sm>
                            <div>
                                <form>
                                    <div className="form">
                                        <IonItem>
                                            <IonLabel position="stacked">Username</IonLabel>
                                            <IonInput type="text" required placeholder="Enter username"></IonInput>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="stacked">Password</IonLabel>
                                            <IonInput type="password" required placeholder="Enter password"></IonInput>
                                        </IonItem>
                                    </div>
                                    <div>
                                        {isRegistration ?
                                            <div>
                                                <IonButton type="submit" className="ion-margin-top" expand="block">Login</IonButton>
                                                <IonButton expand="block" fill="clear" onClick={() => toggleChecked()}>Registration</IonButton>
                                            </div> :
                                            <div>
                                                <IonButton type="submit" className="ion-margin-top" expand="block">Registration</IonButton>
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
            </IonContent>
        </>
    );
};

export default Auth;
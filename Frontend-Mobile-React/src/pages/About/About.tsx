import React from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonContent
} from "@ionic/react";

const About: React.FC = () => {
    return (
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
                <div className="ion-text-center">
                    <h3>To be continued</h3>
                </div>
            </IonContent>
        </IonPage>
    );
}

export default About;
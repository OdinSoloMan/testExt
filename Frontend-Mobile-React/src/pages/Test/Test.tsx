import React, { useState } from 'react';
import {
    IonButton,
    IonContent,
    IonPage,
    useIonAlert,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonGrid,
    IonCol,
    IonRow,
    IonLabel,
    useIonToast,
    useIonLoading
} from '@ionic/react';
import './Test.css'

const Test: React.FC = () => {
    const [present] = useIonAlert();
    const [presentAl, dismissAl] = useIonToast();
    const [presentLoad, dismissLoad] = useIonLoading();

    const alert = (val: any) => {
        console.log(val);
        present({
            cssClass: 'my-css',
            header: 'Switch count product',
            inputs: [
                {
                    name: 'Count',
                    placeholder: 'Enter new count'
                }
            ],
            buttons: [
                'Cancel',
                {
                    text: 'Ok',
                    handler: (d) => {
                        console.log(val, d.Count);
                        console.log('ok pressed')
                    }
                },
            ],
            onDidDismiss: (e) => console.log('did dismiss'),
        })
    }

    const toast = (val: any) => {
        presentAl('hello from hook', 3000);
    }

    const loading = () => {
        presentLoad({
            message: 'Loading...'
        })
        setTimeout(dismissLoad, 1000);
    }

    const modal = () => {

    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Test</IonTitle>
                    <IonButtons slot="start">
                        <IonMenuButton />

                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonLabel>Alert</IonLabel>
                        </IonCol>
                        <IonCol>
                            <IonButton onClick={() => alert("1112")}>
                                Alert
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonLabel>Toast</IonLabel>
                        </IonCol>
                        <IonCol>
                            <IonButton onClick={() => toast("1112")}>
                                Toast
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonLabel>Loading</IonLabel>
                        </IonCol>
                        <IonCol>
                            <IonButton onClick={() => loading()}>
                                Loading
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                {/* <IonButton
                    expand="block"
                    onClick={() =>
                        present({
                            cssClass: 'my-css',
                            header: 'Switch count product',
                            inputs: [
                                {
                                    name: 'Count',
                                    placeholder: 'Enter new count'
                                }
                            ],
                            buttons: [
                                'Cancel',
                                { text: 'Ok', handler: (d) => console.log('ok pressed') },
                            ],
                            onDidDismiss: (e) => console.log('did dismiss'),
                        })
                    }
                >
                    Show Alert
                </IonButton>
                <IonButton
                    expand="block"
                    onClick={() => present('hello with params', [{ text: 'Ok' }])}
                >
                    Show Alert using params
                </IonButton> */}
            </IonContent>
        </IonPage>
    );
};

export default Test;
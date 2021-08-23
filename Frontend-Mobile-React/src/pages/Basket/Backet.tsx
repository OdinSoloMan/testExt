import React, { useState } from 'react';
import {
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonToast,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonAvatar,
    IonIcon,
    IonLabel,
} from "@ionic/react";
import {
    removeCircleOutline,
    nuclearOutline,
} from 'ionicons/icons';
import './Basket.css';

const Basket: React.FC = () => {
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Basket</IonTitle>
                </IonToolbar>
                <IonIcon icon={nuclearOutline} color="danger" size="large"></IonIcon>
            </IonHeader>

            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol size="12" size-sm>
                            <div>
                                <IonItem>
                                    <IonAvatar slot="end">
                                        <IonIcon icon={removeCircleOutline} color="danger" size="large"></IonIcon>
                                    </IonAvatar>
                                    <IonLabel>
                                        <h2>Name BasketName</h2>
                                        <h3>Count <div color="red" style={{ fontSize: "14px" }}>1</div></h3>
                                        <p style={{ fontSize: '13px' }}>№ ProductId </p>
                                    </IonLabel>
                                </IonItem>
                            </div>
                        </IonCol>
                        <IonCol size="12" size-sm>
                            <div>
                                <IonItem>
                                    <IonAvatar slot="end">
                                        <IonIcon icon={removeCircleOutline} color="danger" size="large"></IonIcon>
                                    </IonAvatar>
                                    <IonLabel>
                                        <h2>Name BasketName</h2>
                                        <h3>Count <div color="red" style={{ fontSize: "14px" }}>1</div></h3>
                                        <p style={{ fontSize: '13px' }}>№ ProductId </p>
                                    </IonLabel>
                                </IonItem>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
            {/* <IonCard>
                <IonCardHeader>
                    <h1>Basket</h1>
                </IonCardHeader>
                <IonCardContent>
                </IonCardContent>
            </IonCard> */}
        </>
    );
};

export default Basket;
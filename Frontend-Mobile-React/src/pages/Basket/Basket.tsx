import React, { useEffect, useState } from 'react';
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
import { BasketS } from '../../Service/BasketS';
import Api from '../../Service/Api';

const Basket: React.FC = () => {
    const [items, setItems] = React.useState([]);

    function ClearBasket() {
        BasketS.removeBasketList();
        setItems(BasketS.getBasketList());
    }

    useEffect(() => {
        getListBasketProducts();
    }, [])

    function getListBasketProducts() {
        setItems(BasketS.getBasketList());
    }

    function switchCount(val: any) {

    }

    function Buy() {
        var data = parsData();
        console.log(data);

        var api = new Api();
        api.addListOrders(data)
            .then(function (response: any) {
                console.log(response)
                ClearBasket();
            })
            .catch(function (error: any) {
                console.log(error)
            })
            .then(function () {
                console.log("GG")
            })
    }

    function parsData() {
        return items.map((u: { ProductsId: any; Count: any; }) => ({ ProductsId: u.ProductsId, Count: u.Count, UsersId: localStorage.getItem("id_users") }));
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Basket</IonTitle>
                </IonToolbar>
                <IonIcon icon={nuclearOutline} color="danger" size="large" onClick={() => ClearBasket()}></IonIcon>
            </IonHeader>

            <IonContent>
                <IonGrid>
                    <IonRow>
                        {
                            items.map((el: { ProductsId: string, Name: string, Description: string, Count: string }) => (
                                < IonCol size="12" size-sm key={el.ProductsId}>
                                    <div>
                                        <IonItem>
                                            <IonAvatar slot="end">
                                                <IonIcon icon={removeCircleOutline} color="danger" size="large"></IonIcon>
                                            </IonAvatar>
                                            <IonLabel>
                                                <h2>Name {el.Name}</h2>
                                                <h3>Count <div onClick={() => switchCount(el.ProductsId)} color="red" style={{ fontSize: "14px" }}>{el.Count}</div></h3>
                                                <p style={{ fontSize: '13px' }}>№ {el.ProductsId}</p>
                                            </IonLabel>
                                        </IonItem>
                                    </div>
                                </IonCol>
                            ))
                        }
                    </IonRow>
                </IonGrid>
                {
                    items.length > 0 &&
                    <div>
                        <IonButton onClick={() => Buy()}>Buy</IonButton>
                    </div>
                }
                {
                    items.length == 0 &&
                    <div className="ion-text-center">
                        <h3>Basket is null</h3>
                    </div>
                }
            </IonContent>
        </>
    );
};

export default Basket;
import React, { useEffect } from 'react';
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
    IonAvatar,
    IonIcon,
    IonLabel,
    IonPage,
    IonButtons,
    IonMenuButton,
    useIonAlert,
} from "@ionic/react";
import {
    removeCircleOutline,
    nuclearOutline,
} from 'ionicons/icons';
import './Basket.css';
import { BasketS } from '../../Service/BasketS';
import Api from '../../Service/Api';

const Basket: React.FC = () => {
    const [present] = useIonAlert();

    const [items, setItems]: any[] = React.useState([]);

    const switchCount = (val: any) => {
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
                        console.log('ok pressed');
                        setItems([...BasketS.switchCount(val, d.Count)])
                    }
                },
            ],
            onDidDismiss: (e) => console.log('did dismiss'),
        })
    }

    function ClearBasket() {
        setItems(BasketS.removeBasketList());
    }

    useEffect(() => {
        getListBasketProducts();
    }, [])

    function getListBasketProducts() {
        setItems(BasketS.getBasketList());
    }

    function Buy() {
        var data = parsData();
        console.log(data);

        if (localStorage.getItem("id_users") != null) {
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
        } else {
            alert("Need auth");
        }
    }

    function parsData() {
        return items.map((u: { ProductsId: any; Count: any; }) => ({ ProductsId: u.ProductsId, Count: u.Count, UsersId: localStorage.getItem("id_users") }));
    }

    function deleteItemBasket(val: any) {
        setItems([...BasketS.deleteItemBasket(val)])
    }

    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Basket</IonTitle>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonButtons slot="end">
                            <IonIcon icon={nuclearOutline} color="danger" size="large" onClick={() => ClearBasket()}></IonIcon>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">
                    <IonGrid>
                        <IonRow>
                            {
                                items.map((el: { ProductsId: string, Name: string, Description: string, Count: string }) => (
                                    < IonCol size="12" size-sm key={el.ProductsId}>
                                        <div>
                                            <IonItem>
                                                <IonAvatar slot="end">
                                                    <IonIcon icon={removeCircleOutline} color="danger" size="large" onClick={() => deleteItemBasket(el.ProductsId)}></IonIcon>
                                                </IonAvatar>
                                                <IonLabel>
                                                    <h2>Name {el.Name}</h2>
                                                    <h3>Count <span onClick={() => switchCount(el.ProductsId)} style={{ fontSize: "14px", color: "red" }}>{el.Count}</span></h3>
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
            </IonPage>
        </>
    );
};

export default Basket;
import React, { useEffect, useState } from 'react';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonAvatar,
    IonLabel,
    IonPage,
    IonButtons,
    IonMenuButton,
} from "@ionic/react";
import './Orders.css';
import Api from '../../Service/Api';
import Pagination from "react-js-pagination";


const Orders: React.FC = () => {
    const [items, setItems] = React.useState([]);
    const [totalItem, setTotalItem] = useState(0);
    const [counts, setCounts] = useState(0);

    const itemsPerPage = 5;

    useEffect(() => {
        getOrders();
    }, [])

    function getOrders() {
        var api = new Api();
        setCounts(1);
        api.getReadInfoOredrsUserPerPage(0, itemsPerPage)
            .then(function (response: any) {
                // handle success
                setItems(response.data.data);
                setTotalItem(response.data.totalPassengers)
                console.log(response);
            })
            .catch(function (error: any) {
                // handle error
                console.log(error);
            })
            .then(function () {
                console.log("GG")
            });
    }

    function handlePageChange(val: any) {
        var api = new Api();
        api.getReadInfoOredrsUserPerPage(val, itemsPerPage)
            .then(function (response: any) {
                // handle success
                setItems(response.data.data);
                setCounts(val);
                setTotalItem(response.data.totalPassengers)
                console.log(response);
            })
            .catch(function (error: any) {
                // handle error
                console.log(error);
            })
            .then(function () {
                console.log("GG")
            });
    }

    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Orders</IonTitle>
                        <IonButtons slot="start">
                            <IonMenuButton />

                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent className="ion-padding">
                    <IonGrid>
                        <IonRow>
                            {
                                items.map((el: { id_Order: string, name: string, count: string }) => (
                                    <IonCol size="12" size-sm key={el.id_Order}>
                                        <div>
                                            <IonItem>
                                                <IonAvatar slot="start">
                                                    <img src="data:image/jpeg;base64,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" alt="Page not fount" />
                                                </IonAvatar>
                                                <IonLabel>
                                                    <h2>Name {el.name}</h2>
                                                    <h3>Count {el.count}</h3>
                                                    <p style={{ fontSize: "13px" }}>№ {el.id_Order}</p>
                                                </IonLabel>
                                            </IonItem>
                                        </div>
                                    </IonCol>
                                ))
                            }
                        </IonRow>
                    </IonGrid>
                    {
                        items.length != 0 &&
                        <Pagination
                            activePage={counts}
                            itemsCountPerPage={itemsPerPage}
                            totalItemsCount={totalItem}
                            pageRangeDisplayed={5}
                            onChange={handlePageChange.bind(this)}
                        />
                    }
                    {
                        items.length == 0 &&
                        <div className="ion-text-center">
                            <h3>Orders is null</h3>
                        </div>
                    }
                </IonContent>
            </IonPage>
        </>
    );
};

export default Orders;
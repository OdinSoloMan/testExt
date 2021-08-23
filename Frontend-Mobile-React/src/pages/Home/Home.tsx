import React, { useEffect, useState } from 'react';
import {
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonToast,
    IonButton,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonCardSubtitle,
    IonCardTitle,
    IonItem,
    IonIcon
} from "@ionic/react";
import {
    removeCircleOutline,
    addCircleOutline
} from 'ionicons/icons';
import './Home.css';
import Api from '../../Service/Api';
import ReactPaginate from 'react-paginate';
import Pagination from "react-js-pagination";

const Home: React.FC = () => {
    const [items, setItems] = React.useState([]);
    const [counts, setCounts] = useState(0);
    const [totalItem, setTotalItem] = useState(0);

    const itemsPerPage = 5;
    const filter = '';


    useEffect(() => {
        Test();
    }, [])

    function Test() {
        var api = new Api();
        api.getPageProducts(0, itemsPerPage, filter)
            .then(function (response: any) {
                // handle success
                setItems(response.data.data);
                setCounts(response.data.totalPages + 1);
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

    function handlePageChange(pageNumber: any) {
        console.log(`active page is ${pageNumber}`);
        //setCounts(pageNumber);
        console.log(counts)
        var api = new Api();
        api.getPageProducts(pageNumber, itemsPerPage, filter)
            .then(function (response: any) {
                console.log("Update")
                // handle success
                setItems(response.data.data);
                setCounts(pageNumber);
                setTotalItem(response.data.totalPassengers)
                console.log("counts",counts);
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
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Home
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonGrid>
                    <IonRow>
                        {
                            items.map((el: { id_Product: string, name: string, description: string }) => (
                                <IonCol size="12" size-sm key={el.id_Product}>
                                    <div>
                                        <IonCard style={{ width: '280px' }}>
                                            <IonImg style={{ boxSizing: 'border-box', width: "100%", padding: '1px' }} src="data:image/jpeg;base64,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">
                                            </IonImg>
                                            <IonCardHeader>
                                                <IonCardSubtitle>
                                                    {el.id_Product}
                                                </IonCardSubtitle>
                                                <IonCardTitle>
                                                    {el.name}
                                                </IonCardTitle>
                                            </IonCardHeader>
                                            <IonCardContent style={{ height: '100px' }}>
                                                {el.description}
                                            </IonCardContent>
                                            <IonItem>
                                                <IonIcon icon={removeCircleOutline}></IonIcon>
                                                <IonButton fill="clear" disabled color="primary">1</IonButton>
                                                <IonIcon icon={addCircleOutline}></IonIcon>
                                                <IonButton slot="end">Buy</IonButton>
                                            </IonItem>
                                        </IonCard>
                                    </div>
                                </IonCol>
                            ))
                        }
                    </IonRow>
                </IonGrid>
                <div>
                    <Pagination
                        activePage={counts}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={totalItem}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange.bind(this)}
                    />
                </div>
            </IonContent>
        </>
    );
};

export default Home;

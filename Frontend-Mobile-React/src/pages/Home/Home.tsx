import React, { MouseEventHandler, useEffect, useState } from 'react';
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
import { BasketS } from '../../Service/BasketS';

const Home: React.FC = () => {
    const [items, setItems] = React.useState([]);
    const [counts, setCounts] = useState(0);
    const [totalItem, setTotalItem] = useState(0);
    const [filter, setFilter] = useState('');
    const [listFilter, setListFilter] = useState([] as any[]);

    const itemsPerPage = 5;


    useEffect(() => {
        getProducts();
    }, [])

    function getProducts() {
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
                console.log("counts", counts);
            })
            .catch(function (error: any) {
                // handle error
                console.log(error);
            })
            .then(function () {
                console.log("GG")
            });
    }

    function decrement(val: any) {
        console.log("decrement", val);
        var numberProduct = Number(document.getElementById(val)?.innerHTML);
        if (numberProduct > 1)
            (document.getElementById(val)!.innerHTML = String(numberProduct - 1))
    }

    function increment(val: any) {
        console.log("increment", val);
        var numberProduct = Number(document.getElementById(val)?.innerHTML);
        if (numberProduct < 99)
            document.getElementById(val)!.innerHTML = String(numberProduct + 1);
    }

    function addBasket(val: any) {
        var data = {
            ProductsId: val,
            Name: document.getElementById('name-' + val)?.getAttribute('data-value'),
            Description: document.getElementById('description-' + val)?.getAttribute('data-value'),
            Count: Number(document.getElementById(val)?.innerHTML)
        }
        console.log(data);
        BasketS.setBasketList(data);
    }

    function onKey(params: any) {
        let val = params.target.value;
        console.log(val)
        if (params.key !== 'Enter') {
            if (val.length % 3 === 0 && val.length != 0) {
                // console.log(params.target.value)
                // console.log(params.key)
                getFilterList(val)
            }
        }
    }

    const handleKeyPress = (event: any) => {
        let val = event.target.value;
        if (event.key === 'Enter') {
            //console.log(event.target.value)
            getProductReadByName(val);
        }
    }

    function getProductReadByName(val: any) {
        var api = new Api();
        api.getPageProducts(0, itemsPerPage, val)
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

    function ClearFilter() {
        setFilter('');
        (document.getElementById("favorite_team") as HTMLTextAreaElement).value = "";
        handlePageChange(0);
    }

    function saveCode(val: any) {
        let name = val.target.value;
        let list = listFilter.filter(x => x.name === name)[0];
        if (list?.id_Product) {
            console.log("SAVECODE", list?.id_Product);
            getProductReadByName(list?.name)
        }
    }

    function getFilterList(val: any) {
        var api = new Api();
        api.getProductFilterName(val)
            .then(function (response: any) {
                console.log("response", response);
                setListFilter(response.data)
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
                <div>
                    <input type="text" name="team" id="favorite_team" list="team_list" placeholder="Enter filter" onKeyUp={onKey.bind(this)} onKeyPress={handleKeyPress} onChange={saveCode.bind(this)} />
                    <button onClick={() => ClearFilter()}>X</button>
                    <datalist id="team_list">
                        {
                            listFilter.map((el: { id_Product: string, name: string }) => (
                                <option value={el.name} key={el.id_Product}>{el.name}</option>
                            ))
                        }
                    </datalist>
                </div>
            </IonHeader >

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
                                                <IonCardTitle id={'name-' + el.id_Product} data-value={el.name}>
                                                    {el.name}
                                                </IonCardTitle>
                                            </IonCardHeader>
                                            <IonCardContent id={'description-' + el.id_Product} data-value={el.description} style={{ height: '100px' }}>
                                                {el.description}
                                            </IonCardContent>
                                            <IonItem>
                                                <IonIcon icon={removeCircleOutline} onClick={() => decrement(el.id_Product)}></IonIcon>
                                                <IonButton id={el.id_Product} fill="clear" disabled color="dark">1</IonButton>
                                                <IonIcon icon={addCircleOutline} onClick={() => increment(el.id_Product)}></IonIcon>
                                                <IonButton slot="end" onClick={() => addBasket(el.id_Product)}>Buy</IonButton>
                                            </IonItem>
                                        </IonCard>
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
                        <h3>Products is null</h3>
                    </div>
                }
            </IonContent>
        </>
    );
};

export default Home;

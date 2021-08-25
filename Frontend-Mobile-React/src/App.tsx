// import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import React, { useEffect } from 'react';
import { IonApp, IonSplitPane, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import './App.css';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import SideMenu from './components/SideMenu';
import Orders from './pages/Orders/Orders';
import Basket from './pages/Basket/Basket';
import Auth from './pages/Auth/Auth';
import Test from './pages/Test/Test';
import Api from './Service/Api';

const App: React.FC = () => {

  useEffect(() => {
    refresh();
  }, [])

  function refresh() {
    console.log("REFRESH");
    if (localStorage.getItem("id_users") && localStorage.getItem("refreshToken") && localStorage.getItem("accessToken")) {
      var api = new Api();
      api.refresh({
        id_users: localStorage.getItem("id_users"),
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken"),
      })
        .then(function (response: any) {
          if (response.data != null) {
            localStorage.setItem("id_users", response.data.id_users);
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            console.log(response);
          }
        })
        .catch(function (error: any) {
          // handle error
          console.log(error);
          localStorage.clear()
        })
        .then(function () {
          console.log("TRUE")
        });
    } else {
      console.log("Not auth")
      localStorage.clear()
    }
  }

  return (
    <Router>
      <div id="app">
        <IonApp>
          <IonSplitPane contentId="main">
            <SideMenu></SideMenu>
            <IonPage id="main">
              <Switch>
                <Route path="/test" component={Test}></Route>
                <Route path="/about" component={About}></Route>
                <Route path="/auth" component={Auth}></Route>
                <Route path="/basket" component={Basket}></Route>
                <Route path="/orders" component={Orders}></Route>
                <Route path="/" component={Home}></Route>
              </Switch>
            </IonPage>
          </IonSplitPane>
        </IonApp>
      </div>
    </Router>
  )
};

export default App;

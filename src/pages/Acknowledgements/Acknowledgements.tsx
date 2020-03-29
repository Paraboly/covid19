import React from "react";
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButtons,
    IonBackButton
} from "@ionic/react";
import "./Acknowledgements.scss";

interface InfoProps {}

const Info: React.FC<InfoProps> = () => {
    return (
        <IonPage id="ackn-page">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/tabs/info" />
                    </IonButtons>
                    <IonTitle>Acknowledgements</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="ackn-header">
                    <img
                        src="assets/img/ionic-logo-white.svg"
                        alt="ionic logo"
                    />
                </div>
                <div className="ackn-info">
                    <h4 className="ion-padding-start ion-padding-bottom">
                        Acknowledgements
                    </h4>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Info;

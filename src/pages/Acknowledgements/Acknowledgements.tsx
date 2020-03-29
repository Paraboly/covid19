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
import { connect } from "../../data/connect";
import * as selectors from "../../data/selectors";
import "./Acknowledgements.scss";
import { LicenseAttribution } from "../../models/LicenseAttribution/LicenseAttribution";

interface OwnProps {}

interface StateProps {
    licenseAttributions: LicenseAttribution[];
}

interface DispatchProps {}

type InfoProps = OwnProps & StateProps & DispatchProps;

const Info: React.FC<InfoProps> = ({ licenseAttributions }) => {
    console.log(licenseAttributions);
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

export default connect<OwnProps, StateProps, DispatchProps>({
    mapStateToProps: state => ({
        licenseAttributions: selectors.licenseAttributions(state)
    }),
    component: React.memo(Info)
});

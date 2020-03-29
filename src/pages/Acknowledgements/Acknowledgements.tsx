import React from "react";
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButtons,
    IonBackButton,
    IonList,
    IonItem,
    IonLabel,
    IonButton
} from "@ionic/react";
import { connect } from "../../data/connect";
import * as selectors from "../../data/selectors";
import "./Acknowledgements.scss";
import { LicenseAttribution } from "../../models/LicenseAttribution/LicenseAttribution";
import { licenseAttributions } from "../../data/selectors";

interface OwnProps {}

interface StateProps {
    licenseAttributions: LicenseAttribution[];
}

interface DispatchProps {}

type InfoProps = OwnProps & StateProps & DispatchProps;

const Info: React.FC<InfoProps> = ({ licenseAttributions }) => {
    console.log(licenseAttributions);

    function renderAttributions(attribs: LicenseAttribution[]) {
        return attribs.map(attrib => (
            <IonItem lines={"inset"} key={attrib.name}>
                <IonLabel>
                    <h3>{attrib.name}</h3>
                    {attrib.licenses && <p>License: {attrib.licenses}</p>}
                    {attrib.licenseUrl && (
                        <p>License URL: {attrib.licenseUrl}</p>
                    )}
                    {attrib.repository && (
                        <p>Repository: {attrib.repository}</p>
                    )}
                    {attrib.repository && (
                        <IonButton href={attrib.repository} target="_blank">
                            Repository
                        </IonButton>
                    )}
                    {attrib.licenseUrl && (
                        <IonButton href={attrib.licenseUrl} target="_blank">
                            License
                        </IonButton>
                    )}
                </IonLabel>
            </IonItem>
        ));
    }

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
                <IonList>{renderAttributions(licenseAttributions)}</IonList>
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

import React, { useState } from "react";
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonPopover,
    IonInput
} from "@ionic/react";
import "./Info.scss";
import {
    more,
    informationCircleOutline,
    heartEmpty,
    logoGithub,
    cloudOutline
} from "ionicons/icons";
import AboutPopover from "../components/AboutPopover";

interface InfoProps {}

const Info: React.FC<InfoProps> = () => {
    const [showPopover, setShowPopover] = useState(false);
    const [popoverEvent, setPopoverEvent] = useState();

    const presentPopover = (e: React.MouseEvent) => {
        setPopoverEvent(e.nativeEvent);
        setShowPopover(true);
    };

    return (
        <IonPage id="info-page">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Info</IonTitle>
                    <IonButtons slot="end">
                        <IonButton icon-only={true} onClick={presentPopover}>
                            <IonIcon slot="icon-only" icon={more} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <div className="info-header">
                    <h4 className="ion-padding-start ion-padding-bottom">
                        Stay home, stay safe.
                    </h4>
                    <span
                        role="img"
                        aria-label="heart"
                        style={{
                            fontSize: "50px",
                            display: "block"
                        }}
                    >
                        ❤️
                    </span>
                </div>
                <div className="info-info">
                    <IonList lines="full">
                        <IonItem
                            button
                            href={
                                "https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
                            }
                            target={"_blank"}
                        >
                            <IonIcon
                                icon={informationCircleOutline}
                                slot="start"
                            />
                            <IonInput
                                readonly
                                style={{ pointerEvents: "none" }}
                            >
                                World Health Organization
                            </IonInput>
                        </IonItem>
                        <IonItem
                            button
                            routerLink={"/tabs/info/acknowledgements"}
                        >
                            <IonIcon icon={heartEmpty} slot="start" />
                            <IonInput
                                readonly
                                style={{ pointerEvents: "none" }}
                            >
                                Acknowledgements
                            </IonInput>
                        </IonItem>
                        <IonItem
                            button
                            href={"https://github.com/novelcovid/api"}
                            target={"_blank"}
                        >
                            <IonIcon icon={cloudOutline} slot="start" />
                            <IonInput
                                readonly
                                style={{ pointerEvents: "none" }}
                            >
                                Data Source
                            </IonInput>
                        </IonItem>
                        <IonItem
                            button
                            href={"https://github.com/paraboly/covid19"}
                            target={"_blank"}
                        >
                            <IonIcon icon={logoGithub} slot="start" />
                            <IonInput
                                readonly
                                style={{ pointerEvents: "none" }}
                            >
                                Github Repository
                            </IonInput>
                        </IonItem>
                    </IonList>
                </div>
            </IonContent>
            <IonPopover
                isOpen={showPopover}
                event={popoverEvent}
                onDidDismiss={() => setShowPopover(false)}
            >
                <AboutPopover dismiss={() => setShowPopover(false)} />
            </IonPopover>
        </IonPage>
    );
};

export default React.memo(Info);

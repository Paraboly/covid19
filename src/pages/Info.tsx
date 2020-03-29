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
    IonDatetime,
    IonSelectOption,
    IonList,
    IonItem,
    IonLabel,
    IonSelect,
    IonPopover,
    IonText,
    IonInput
} from "@ionic/react";
import "./Info.scss";
import { calendar, pin, more, informationCircleOutline } from "ionicons/icons";
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
                {/* <div className="info-header">
                    <img
                        src="assets/img/ionic-logo-white.svg"
                        alt="ionic logo"
                    />
                </div> */}
                <div className="info-info">
                    <h4 className="ion-padding-bottom">Stay home, stay safe</h4>
                    <IonList lines="none">
                        <IonItem
                            href={
                                "https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
                            }
                            target={"_blank"}
                        >
                            <IonIcon
                                icon={informationCircleOutline}
                                slot="start"
                            />
                            <IonLabel position="stacked">Learn More</IonLabel>
                            <IonInput
                                readonly
                                style={{ pointerEvents: "none" }}
                            >
                                World Health Organization
                            </IonInput>
                        </IonItem>
                    </IonList>

                    <p className="ion-padding-start ion-padding-end">
                        The Ionic Conference is a one-day conference featuring
                        talks from the Ionic team. It is focused on Ionic
                        applications being built with Ionic 2. This includes
                        migrating apps from Ionic 1 to Ionic 2, Angular
                        concepts, Webpack, Sass, and many other technologies
                        used in Ionic 2. Tickets are completely sold out, and
                        we’re expecting more than 1000 developers – making this
                        the largest Ionic conference ever!
                    </p>
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

import React, { useState, useRef } from "react";
import {
    IonToolbar,
    IonContent,
    IonPage,
    IonButtons,
    IonMenuButton,
    IonSegment,
    IonSegmentButton,
    IonButton,
    IonIcon,
    IonSearchbar,
    IonRefresher,
    IonRefresherContent,
    IonToast,
    IonModal,
    IonHeader,
    getConfig
} from "@ionic/react";
import { connect } from "../../data/connect";
import { options } from "ionicons/icons";
import SessionList from "../../components/SessionList";
import SessionListFilter from "../../components/SessionListFilter";
import "./CovidDetails.scss";
import * as selectors from "../../data/selectors";
import { setSearchText } from "../../data/sessions/sessions.actions";
import ShareSocialFab from "../../components/ShareSocialFab";
import { SessionGroup } from "../../models/SessionGroup";
import { SessionService } from "../../services/SessionService";

interface OwnProps {}

interface StateProps {
    sessionGroups: SessionGroup[];
    favoriteGroups: SessionGroup[];
    mode: "ios" | "md";
}

interface DispatchProps {
    setSearchText: typeof setSearchText;
}

type LatestNewsPageProps = OwnProps & StateProps & DispatchProps;

const LatestNewsPage: React.FC<LatestNewsPageProps> = ({
    favoriteGroups,
    sessionGroups,
    setSearchText,
    mode
}) => {
    const [segment, setSegment] = useState<"all" | "favorites">("all");
    const [showFilterModal, setShowFilterModal] = useState(false);
    const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
    const [showCompleteToast, setShowCompleteToast] = useState(false);

    const doRefresh = async () => {
        await getCOVID19();
        ionRefresherRef.current!.complete();
        setShowCompleteToast(true);
    };

    const getCOVID19 = async () => {
        const byCountry = await SessionService.getAllCountryStats();
        console.log(byCountry);
        return byCountry;
    };

    return (
        <IonPage id="covidDetails-page">
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>

                    <IonSegment
                        onIonChange={e => setSegment(e.detail.value as any)}
                    >
                        <IonSegmentButton
                            value="all"
                            checked={segment === "all"}
                        >
                            All
                        </IonSegmentButton>
                        <IonSegmentButton
                            value="favorites"
                            checked={segment === "favorites"}
                        >
                            Favorites
                        </IonSegmentButton>
                    </IonSegment>

                    <IonButtons slot="end">
                        <IonButton onClick={() => setShowFilterModal(true)}>
                            {mode === "ios" ? (
                                "Filter"
                            ) : (
                                <IonIcon icon={options} slot="icon-only" />
                            )}
                        </IonButton>
                    </IonButtons>
                </IonToolbar>

                <IonToolbar>
                    <IonSearchbar
                        placeholder="Search"
                        onIonChange={(e: CustomEvent) =>
                            setSearchText(e.detail.value)
                        }
                    />
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonRefresher
                    slot="fixed"
                    ref={ionRefresherRef}
                    onIonRefresh={doRefresh}
                >
                    <IonRefresherContent />
                </IonRefresher>
                <IonToast
                    isOpen={showCompleteToast}
                    message="Refresh complete"
                    duration={2000}
                    onDidDismiss={() => setShowCompleteToast(false)}
                />

                <SessionList
                    sessionGroups={sessionGroups}
                    listType={segment}
                    hide={segment === "favorites"}
                />
                <SessionList
                    sessionGroups={favoriteGroups}
                    listType={segment}
                    hide={segment === "all"}
                />
            </IonContent>

            <IonModal
                isOpen={showFilterModal}
                onDidDismiss={() => setShowFilterModal(false)}
            >
                <SessionListFilter
                    onDismissModal={() => setShowFilterModal(false)}
                />
            </IonModal>

            <ShareSocialFab />
        </IonPage>
    );
};

export default connect<OwnProps, StateProps, DispatchProps>({
    mapStateToProps: state => ({
        sessionGroups: selectors.getGroupedSessions(state),
        favoriteGroups: selectors.getGroupedFavorites(state),
        mode: getConfig()!.get("mode")
    }),
    mapDispatchToProps: {
        setSearchText
    },
    component: React.memo(LatestNewsPage)
});

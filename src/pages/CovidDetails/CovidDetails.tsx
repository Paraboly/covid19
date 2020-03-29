import React, { useState, useRef, useEffect } from "react";
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
    IonHeader,
    getConfig
} from "@ionic/react";
import { connect } from "../../data/connect";
import { options } from "ionicons/icons";
import CovidEntityList from "../../components/CovidEntityList/CovidEntityList";
import "./CovidDetails.scss";
import * as selectors from "../../data/selectors";
import { setSearchText, loadCovidData } from "../../data/covid/covid.actions";
import ShareSocialFab from "../../components/ShareSocialFab";
import { CovidEntity } from "../../models/CovidEntity";

interface OwnProps {}

interface StateProps {
    covidEntities: CovidEntity[];
    watchingCovidEntities: CovidEntity[];
    mode: "ios" | "md";
    isLoading: boolean;
}

interface DispatchProps {
    setSearchText: typeof setSearchText;
    loadCovidData: typeof loadCovidData;
}

type LatestNewsPageProps = OwnProps & StateProps & DispatchProps;

const LatestNewsPage: React.FC<LatestNewsPageProps> = ({
    covidEntities,
    watchingCovidEntities,
    mode,
    isLoading,
    setSearchText,
    loadCovidData
}) => {
    const [segment, setSegment] = useState<"all" | "favorites">("all");
    const [, setShowFilterModal] = useState(false);
    const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
    const [showCompleteToast, setShowCompleteToast] = useState(false);
    const [isWaitingForLoading, setIsWaitingForLoading] = useState(false);

    const doRefresh = async () => {
        setIsWaitingForLoading(true);
        loadCovidData();
    };

    useEffect(() => {
        if (isWaitingForLoading && !isLoading) {
            setIsWaitingForLoading(false);
            ionRefresherRef.current!.complete();
            setShowCompleteToast(true);
        }
    }, [isLoading]);

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

                <CovidEntityList
                    covidEntities={covidEntities}
                    listType={segment}
                    hide={segment === "favorites"}
                />
                <CovidEntityList
                    covidEntities={watchingCovidEntities}
                    listType={segment}
                    hide={segment === "all"}
                />
            </IonContent>
            <ShareSocialFab />
        </IonPage>
    );
};

export default connect<OwnProps, StateProps, DispatchProps>({
    mapStateToProps: state => ({
        covidEntities: selectors.getCovidEntities(state),
        watchingCovidEntities: selectors.getWatchingCovidEntities(state),
        mode: getConfig()!.get("mode"),
        isLoading: selectors.getIsLoading(state)
    }),
    mapDispatchToProps: {
        setSearchText,
        loadCovidData
    },
    component: React.memo(LatestNewsPage)
});

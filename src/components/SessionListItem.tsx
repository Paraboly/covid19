import React, { useRef } from "react";
import {
    IonItemSliding,
    IonItem,
    IonLabel,
    IonItemOptions,
    IonItemOption,
    AlertButton
} from "@ionic/react";
import { Time } from "./Time";
import { Session } from "../models/Session";

interface ListItemProps {
    entity: {};
    onAddFavorite: (id: number) => void;
    onRemoveFavorite: (id: number) => void;
    isFavorite: boolean;
}

const ListItem: React.FC<ListItemProps> = ({
    isFavorite,
    onAddFavorite,
    onRemoveFavorite
}) => {
    const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null);

    const dismissAlert = () => {
        ionItemSlidingRef.current && ionItemSlidingRef.current.close();
    };

    const removeFavoriteSession = () => {
        onAddFavorite(session.id);
        onShowAlert("Favorite already added", [
            {
                text: "Cancel",
                handler: dismissAlert
            },
            {
                text: "Remove",
                handler: () => {
                    onRemoveFavorite(session.id);
                    dismissAlert();
                }
            }
        ]);
    };

    const addFavoriteSession = () => {
        if (isFavorite) {
            // woops, they already favorited it! What shall we do!?
            // prompt them to remove it
            removeFavoriteSession();
        } else {
            // remember this session as a user favorite
            onAddFavorite(session.id);
            onShowAlert("Favorite Added", [
                {
                    text: "OK",
                    handler: dismissAlert
                }
            ]);
        }
    };

    return (
        <IonItemSliding
            ref={ionItemSlidingRef}
            class={"track-" + session.tracks[0].toLowerCase()}
        >
            <IonItem routerLink={`/tabs/latestNews/${session.id}`}>
                <IonLabel>
                    <h3>{session.name}</h3>
                    <p>
                        <Time date={session.dateTimeStart} /> &mdash;&nbsp;
                        <Time date={session.dateTimeEnd} /> &mdash;&nbsp;
                        {session.location}
                    </p>
                </IonLabel>
            </IonItem>
            <IonItemOptions>
                {listType === "favorites" ? (
                    <IonItemOption
                        color="danger"
                        onClick={() => removeFavoriteSession()}
                    >
                        Remove
                    </IonItemOption>
                ) : (
                    <IonItemOption
                        color="favorite"
                        onClick={addFavoriteSession}
                    >
                        Favorite
                    </IonItemOption>
                )}
            </IonItemOptions>
        </IonItemSliding>
    );
};

export default React.memo(ListItem);

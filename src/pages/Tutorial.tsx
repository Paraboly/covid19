import React, { useState, useRef } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonSlides, IonSlide, IonIcon } from '@ionic/react';
import { arrowForward } from 'ionicons/icons';
import { setHasSeenTutorial } from '../data/user/user.actions';
import './Tutorial.scss';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps { };

interface DispatchProps {
  setHasSeenTutorial: typeof setHasSeenTutorial
}

interface TutorialProps extends OwnProps, DispatchProps { };

const Tutorial: React.FC<TutorialProps> = ({ history, setHasSeenTutorial }) => {
  const [showSkip, setShowSkip] = useState(true);
  const slideRef = useRef<HTMLIonSlidesElement>(null);

  const startApp = async () => {
    await setHasSeenTutorial(true);
    history.push('/tabs/map', { direction: 'none' });
  };

  const handleSlideChangeStart = () => {
    slideRef.current!.isEnd().then(isEnd => setShowSkip(!isEnd));
  };

  return (
    <IonPage id="tutorial-page">
      <IonHeader no-border>
        <IonToolbar>
          <IonButtons slot="end">
            {showSkip && <IonButton color='primary' onClick={startApp}>Skip</IonButton>}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonSlides ref={slideRef} onIonSlideWillChange={handleSlideChangeStart} pager={false}>
          <IonSlide>
            <img src="assets/img/tutorial-slidebox-img-1.svg" alt="" className="slide-image" />
            <h2 className="slide-title">
              Welcome to <b>Corona City Tracker for Turkey</b>
            </h2>
            <p>
              Using <b>Corona City Tracker for Turkey</b> get latest information about
              <b> Corona Virus (🦠 COVID-19)</b> in Turkey.
            </p>
          </IonSlide>

          <IonSlide>
            <img src="assets/img/tutorial-slidebox-img-2.svg" alt="" className="slide-image" />
            <h2 className="slide-title">Get live information ℹ️, take basic precautions 🧼 and stay healthy🤗</h2>
          </IonSlide>

          <IonSlide>
            <img src="assets/img/tutorial-slidebox-img-3.svg" alt="" className="slide-image" />
            <h2 className="slide-title">Let's Get Started! 🚩</h2>
            <IonButton fill="clear" onClick={startApp}>
              Continue
              <IonIcon slot="end" icon={arrowForward} />
            </IonButton>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: ({
    setHasSeenTutorial
  }),
  component: Tutorial
});

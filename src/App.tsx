import { useState } from 'react';
import { IonApp, IonPage, IonContent } from '@ionic/react';
import LoginPage from './LoginPage';

export default function App() {
  const [token, setToken] = useState<string | null>(null);

  if (token) {
    return (
      <IonApp>
        <IonPage>
          <IonContent>
            <main className="screen">
              <div className="badge ok" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
              </div>
              <h1>You're signed in</h1>
              <p className="lead">You are logged in.</p>
              <button type="button" className="secondary" onClick={() => setToken(null)}>Log out</button>
            </main>
          </IonContent>
        </IonPage>
      </IonApp>
    );
  }
  return (
    <IonApp>
      <LoginPage onSuccess={setToken} />
    </IonApp>
  );
}

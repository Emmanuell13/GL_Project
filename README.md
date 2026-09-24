# Login App (Ionic + React + Capacitor)

## Run
    npm install
    npm run dev            # open http://localhost:5173

Demo account: demo@example.com / Password123

## Tests
    npm test               # unit + component tests (Vitest, Testing Library)
    npx playwright install chromium   # once
    npm run test:e2e       # end-to-end in a Pixel 5 sized browser

## Package as an Android app (optional)
    npm run build
    npm i @capacitor/android
    npx cap add android
    npx cap sync
    npx cap open android

# Automated Testing - Login Web Page avec Playwright

Ce projet contient une page Web de connexion en **HTML, CSS et JavaScript**.

L'objectif est d'utiliser **Playwright** pour effectuer des tests automatisés sur la page de Login.

---

## 1. Prérequis

Avant de commencer, il faut avoir :

- Node.js
- npm
- Google Chrome
- Visual Studio Code

Vérifier Node.js :

```cmd
node -v
```

Vérifier npm :

```cmd
npm -v
```

---

## 2. Ouvrir le projet

Ouvrir le dossier suivant dans Visual Studio Code :

```text
Login-page-using-HTML-CSS-JAVASCRIPT
```

La page Web principale est :

```text
index.html
```

Structure initiale :

```text
Login-page-using-HTML-CSS-JAVASCRIPT/
├── index.html
├── 2.css
├── 3.js
└── README.md
```

---

## 3. Installer Playwright

Ouvrir CMD dans le dossier du projet :

```cmd
cd C:\Users\njara\Documents\GitHub\Login-page-using-HTML-CSS-JAVASCRIPT
```

Lancer :

```cmd
npm init playwright@latest
```

Pendant l'installation, choisir :

```text
Language: JavaScript
Tests folder: tests
Install Playwright browsers: Yes
```

Playwright crée notamment :

```text
tests/
playwright.config.js
package.json
package-lock.json
```

---

## 4. Installer les navigateurs Playwright

Si Playwright indique que certains navigateurs sont manquants, lancer :

```cmd
npx playwright install
```

Cette commande installe les navigateurs nécessaires pour les tests, notamment :

- Chromium
- Firefox
- WebKit

---

## 5. Vérifier Playwright

Pour vérifier que Playwright fonctionne :

```cmd
npx playwright test
```

Lors de notre vérification, le résultat obtenu était :

```text
6 passed
```

Cela confirme que Playwright et les navigateurs sont correctement installés.

---

## 6. Page de Login à tester

La page `index.html` contient :

```html
<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>SK login page</title>

    <link rel="stylesheet" href="2.css">
</head>

<body>

    <script src="3.js"></script>

    <div>

        <p>Login</p><br>

        <input
            type="text"
            placeholder="email_id"
            id="email"><br>

        <input
            type="text"
            placeholder="Password"
            id="password"><br>

        <button
            type="submit"
            onclick="login()">
            Login
        </button>

    </div>

</body>

</html>
```

Les éléments utilisés par Playwright sont :

```text
Email    : #email
Password : #password
Button   : Login
```

---

## 7. Fonction de Login

Le fichier `3.js` contient la logique de connexion :

```javascript
const Mail_id = "snehak71501@gmail.com";
const My_password = "Sneha@003";

function login() {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    if (!email || !password) {

        alert("Please enter both email and password🤨");

    } else if (
        email === Mail_id &&
        password === My_password
    ) {

        alert("You are successfully logged in!🤗");

    } else {

        alert("Oops! Invalid email or password🧐");
        return;
    }
}
```

Les identifiants valides sont :

```text
Email    : snehak71501@gmail.com
Password : Sneha@003
```

---

## 8. Créer le test Playwright

Dans le dossier :

```text
tests/
```

créer :

```text
login.spec.js
```

La structure devient :

```text
Login-page-using-HTML-CSS-JAVASCRIPT/
│
├── index.html
├── 2.css
├── 3.js
│
├── tests/
│   └── login.spec.js
│
├── playwright.config.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 9. Code des tests

Mettre dans `tests/login.spec.js` :

```javascript
const { test, expect } = require('@playwright/test');
const path = require('path');

const loginPage = 'file:///' + path
    .resolve(__dirname, '../index.html')
    .replace(/\\/g, '/');

test.beforeEach(async ({ page }) => {
    await page.goto(loginPage);
});


// TEST 1 : Login correct

test('Login avec identifiants corrects', async ({ page }) => {

    page.once('dialog', async dialog => {

        expect(dialog.message()).toBe(
            'You are successfully logged in!🤗'
        );

        await dialog.accept();
    });

    await page.locator('#email')
        .fill('snehak71501@gmail.com');

    await page.locator('#password')
        .fill('Sneha@003');

    await page
        .getByRole('button', { name: 'Login' })
        .click();
});


// TEST 2 : Email incorrect

test('Login avec email incorrect', async ({ page }) => {

    page.once('dialog', async dialog => {

        expect(dialog.message()).toBe(
            'Oops! Invalid email or password🧐'
        );

        await dialog.accept();
    });

    await page.locator('#email')
        .fill('wrong@gmail.com');

    await page.locator('#password')
        .fill('Sneha@003');

    await page
        .getByRole('button', { name: 'Login' })
        .click();
});


// TEST 3 : Mot de passe incorrect

test('Login avec mot de passe incorrect', async ({ page }) => {

    page.once('dialog', async dialog => {

        expect(dialog.message()).toBe(
            'Oops! Invalid email or password🧐'
        );

        await dialog.accept();
    });

    await page.locator('#email')
        .fill('snehak71501@gmail.com');

    await page.locator('#password')
        .fill('wrongPassword');

    await page
        .getByRole('button', { name: 'Login' })
        .click();
});


// TEST 4 : Champs vides

test('Login avec champs vides', async ({ page }) => {

    page.once('dialog', async dialog => {

        expect(dialog.message()).toBe(
            'Please enter both email and password🤨'
        );

        await dialog.accept();
    });

    await page
        .getByRole('button', { name: 'Login' })
        .click();
});
```

---

## 10. Scénarios testés

Quatre scénarios sont automatisés :

| Test | Email | Password | Résultat attendu |
|---|---|---|---|
| Login correct | Correct | Correct | Connexion réussie |
| Email incorrect | Incorrect | Correct | Login refusé |
| Password incorrect | Correct | Incorrect | Login refusé |
| Champs vides | Vide | Vide | Message demandant les identifiants |

---

## 11. Lancer les tests

Pour tester uniquement avec Chromium :

```cmd
npx playwright test tests/login.spec.js --project=chromium
```

Pour **voir le navigateur effectuer les actions automatiquement** :

```cmd
npx playwright test tests/login.spec.js --project=chromium --headed
```

Playwright va automatiquement :

1. Ouvrir le navigateur.
2. Ouvrir `index.html`.
3. Remplir l'email.
4. Remplir le mot de passe.
5. Cliquer sur Login.
6. Lire le message affiché.
7. Comparer le message avec le résultat attendu.
8. Indiquer si le test passe ou échoue.

Si les quatre tests fonctionnent, le terminal doit afficher :

```text
4 passed
```

---

## 12. Interface Playwright

Pour utiliser l'interface graphique de Playwright :

```cmd
npx playwright test --ui
```

Elle permet de sélectionner les tests et d'observer leur exécution plus facilement.

---

## 13. Rapport des tests

Pour ouvrir le dernier rapport HTML :

```cmd
npx playwright show-report
```

Le rapport permet de consulter les tests réussis et les tests échoués.

---

## Résumé des commandes

```cmd
npm init playwright@latest

npx playwright install

npx playwright test

npx playwright test tests/login.spec.js --project=chromium --headed

npx playwright test --ui

npx playwright show-report
```

Le projet permet ainsi de démontrer l'utilisation de **Playwright pour l'automated testing d'une application Web de Login**.

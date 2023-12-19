# Modul 183 101

## Einleitung

In diesem Portfolio gehe ich auf verschiedene Themen vom Modul 183 ein. Es konzentriert sich auf verschiedene Bedrohungen in der Cybersicherheit, einschließlich Phishing und Ransomware, und bietet Strategien zu deren Erkennung und Bekämpfung.

## HZ 1 - Bedrohungen

### Phishing

#### Erkennung und Gegenmaßnahmen

Phishing-Angriffe können oft durch verdächtige E-Mail-Adressen, Rechtschreibfehler, unerwartete Anhänge und dringende Handlungsaufforderungen erkannt werden. Gegenmaßnahmen umfassen Schulungen zur Sensibilisierung der Benutzer, Verwendung von Spamfiltern, regelmäßige Software-Updates und Zwei-Faktor-Authentifizierung.

#### Auswirkungen

Phishing kann zu Identitätsdiebstahl, finanziellen Verlusten und Verlust von Vertrauen führen. Es kann auch dazu führen, dass Malware oder Ransomware auf Systemen installiert wird.

### Ransomware

#### Erkennung und Gegenmaßnahmen

Ransomware kann oft durch plötzliche Systemverlangsamungen, unerwartete Dateiänderungen und Lösegeldforderungen erkannt werden. Gegenmaßnahmen umfassen regelmäßige Backups, Aktualisierung und Patching von Software, Verwendung von Antivirus-Software und Schulung der Benutzer.

#### Auswirkungen

Ransomware kann zu erheblichen finanziellen Verlusten führen, da die Angreifer oft ein Lösegeld für die Entschlüsselung der Daten verlangen. Es kann auch zu Betriebsunterbrechungen und Verlust von Daten führen.

### Cloud-Sicherheitsverletzungen

#### Erkennung und Gegenmaßnahmen

Cloud-Sicherheitsverletzungen können oft durch ungewöhnliche Netzwerkaktivitäten, unerwartete Änderungen in Benutzerkonten oder Dateien und Warnungen von Sicherheitstools erkannt werden. Gegenmaßnahmen umfassen die Verwendung von starken Passwörtern, Zwei-Faktor-Authentifizierung, Verschlüsselung von Daten und regelmäßige Überprüfung von Zugriffsprotokollen.

#### Auswirkungen

Cloud-Sicherheitsverletzungen können zu Datenverlust, Verlust von Vertrauen, finanziellen Verlusten und rechtlichen Konsequenzen führen.

### IoT-Sicherheitsverletzungen

#### Erkennung und Gegenmaßnahmen

IoT-Sicherheitsverletzungen können oft durch ungewöhnliche Geräteverhalten, unerwartete Netzwerkaktivitäten und Warnungen von Sicherheitstools erkannt werden. Gegenmaßnahmen umfassen die Verwendung von starken Passwörtern, regelmäßige Software-Updates, Netzwerksegmentierung und Deaktivierung unnötiger Dienste.

#### Auswirkungen

IoT-Sicherheitsverletzungen können zu Verlust von Vertrauen, Verletzung der Privatsphäre, Betriebsunterbrechungen und finanziellen Verlusten führen. In einigen Fällen können sie auch physische Sicherheitsrisiken darstellen, wenn sie kritische Infrastrukturen betreffen.

### Beurteilung

Ich denke ich habe das Handlungsziel ganz gut begriffen. Ich habe durch die Recherche einiges über IoT-Sicherheitslücken herausgefunden, was mir vorhin noch nicht bekannt war.

## HZ 2 - XSS (Cross-Site Scripting)

### Was ist XSS?

XSS oder auch Cross-Site Scripting genannt, ist eine Sicherheitslücke in Webanwendungen, die es ermöglicht schädliche Skripte in Webseiten einzubetten. Diese Skripte werden dann von anderen Nutzern ausgeführt, wenn sie die Webseite besuchen. Die Skripte können dabei beliebigen Code ausführen, wie z.B. Cookies auslesen, Session-Cookies stehlen, Passwörter auslesen, etc.

### Wie schützt man sich vor XSS?

Eine Methode die man verwenden kann ist das Escapen von Sonderzeichen. Dabei werden Sonderzeichen wie z.B. <, >, ", ', &, etc. in HTML-Entities umgewandelt. So wird z.B. aus dem Zeichen < das Zeichen `\&lt;` und aus dem Zeichen > das Zeichen `\&gt;`. Dadurch wird verhindert, dass der Browser die Sonderzeichen als HTML-Code interpretiert und ausführt.

In der InsecureApp im [NewsController](/InsecureApp/M183/Controllers/NewsController.cs) auf Zeile 80 wird das Escapen von Sonderzeichen demonstriert. Dabei habe ich die Methode `HtmlEncode` verwendet, welche das Escapen für mich erledigt.

```csharp
// Vorher
//            newNews.Header = request.Header;
//            newNews.Detail = request.Detail;
// Nacher
newNews.Header = HttpUtility.HtmlEncode(request.Header);
newNews.Detail = HttpUtility.HtmlEncode(request.Detail);

```

(Ich konnte keine Demo machen, da die Skripte nicht ausgeführt werden.)

### Beurteilung
Ich finde ich hätte das Handlungsziel ein bisschen besser verstehen können, da ich zum einen zwar das Konzept verstanden habe, ich aber auf meinem Laptop nie ein funktionierendes Beispiel von XSS zum laufen brachte.

## HZ 3 - Passwort Hashing

### Was ist Hashing?

Hashing ist das Verändern eines Passwortes, oder einfach eines Strings, mit Hilfe einer Funktion. Das spezielle dabei ist, dass man von dem Ergebnis der Funktion, nicht wieder auf den ursprünglichen String kommt. Man kann lediglich den gleichen String neu hashen und dann vergleichen.

### Wieso wird Hashing verwendet?

Hashing wird verwendet, um Passwörter zu verschlüsseln. Dabei wird das Passwort gehasht und in der Datenbank gespeichert. Wenn sich ein Nutzer dann einloggen möchte, wird das eingegebene Passwort gehasht und mit dem gehashten Passwort in der Datenbank verglichen. Wenn die beiden Hashes übereinstimmen, ist das Passwort korrekt. Das hilft, wenn die Datenbank gehackt wird, da der Hacker dann nur die Hashes sieht und nicht die Passwörter.

### Wie funktioniert Hashing?

Ich habe eine kleine Demo fürs Hashing erstellt, welche sie [hier](/nachweise/hashing/script.js) finden können.

Mit der Funktion `HashSync` kann man einen String hashen. Dabei wird der String und die Anzahl Runden, wie oft der String gehasht werden soll, übergeben. Je mehr Runden, desto länger dauert das Hashen. Die Anzahl Runden sollte so gewählt werden, dass das Hashen nicht zu lange dauert, aber auch nicht zu kurz ist, damit das Passwort nicht zu schnell geknackt werden kann.

```js
const bcrypt = require('bcrypt')

const input = '12345678' // Beispiel PW
const output = bcrypt.hashSync(input, 10)

// Ergebnis
// $2b$10$1Amla80iC2DyPXD7mTmleeNPd3eRQ7qgAzv0dxClbYFsrZeTkDu9e
console.log(output)

const isRightPassword = bcrypt.compareSync(input, output)

// Ergebnis hier 'true'
console.log(isRightPassword)
```

Um nun das Passwort zu überprüfen können wir, wie schon gesagt, nicht einfach vom gehashten Passwort auf das ursprüngliche Passwort schliessen. Wir müssen das Passwort neu hashen und dann vergleichen. Das geht mit der Funktion `CompareSync`. Diese nimmt zwei Parameter an, einmal das Passwort und einmal den Hash. Wenn die beiden übereinstimmen, gibt sie `true` zurück und das Passwort ist korrekt.

### Beurteilung
Das Thema Hashing habe ich super verstanden, da ich mich auch schon lange vor dem Modul mit Hashing in anderen Projekten beschäftigt habe.

## HZ 4 - Mensch als Sicherheitslücke

Die grösste Sicherheitslücke in Programmen ist normalerweise der User selbst. Der User kann z.B. auf Phishing-Mails reinfallen, oder sein Passwort weitergeben. Deshalb ist es wichtig, dass der User über die Gefahren aufgeklärt wird und dass er weiss, wie er sich schützen kann. Um dies zu erreichen, muss man den User manchmal zwingen ein sicheres Passwort zu verwenden.

In meinem [Code Beispiel](/nachweise/mensch-als-lücke/server.ts) habe ich eine kleine Express Demo erstellt. Dabei habe ich eine Route erstellt, welche ein Passwort entgegennimmt und dieses dann mit Hilfe von Zod validiert. Wenn das Passwort nicht den Anforderungen entspricht, wird ein Fehler geworfen und der User wird darüber informiert.

```ts
import chalk from 'chalk'
import express from 'express'
import { z } from 'zod'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const schema = z.object({
  username: z.string().min(3),
  password: z
    .string()
    .min(8)
    .max(100)
    .regex(/^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/),
})

app.post('/signup', async (req, res) => {
  try {
    const body: z.infer<typeof schema> = schema.parse(req.body)
    const { username, password } = body

    //* Logik zum erstellen eines Users

    Logger.info('user created')
    res.json({ message: 'user created' })
  } catch (err) {
    Logger.error(err)
    res.status(400).json({ error: err })
  }
})

app.listen(3000)

const info = chalk.green
const error = chalk.red

const Logger = {
  info: (message: string) => console.log(info('info: '), message),
  error: (message: string) => console.log(error('error: '), message),
} as const
```

### Beurteilung
Ich finde ich habe das Handlungsziel gut verstanden. Ich habe mich schon vor dem Modul mit dem Thema beschäftigt und habe auch schon in anderen Projekten versucht, die Passworteingabe zu validieren, um ein sicheres Passwort zu garantieren.

## HZ 5 - Logging

Ein weiteres Tool was man sich gut zu Nutze machen kann sind Logs. Ich selbst nutze das in meinen Projekten schon sehr lange. Selbst füge ich da einfach kurz ein `console.log` hinzu, aber ich habe für dieses Beispiel einen kleinen Logger gebastelt.

```ts
const info = chalk.green
const error = chalk.red

const Logger = {
  info: (message: string) => console.log(info('info: '), message),
  error: (message: string) => console.log(error('error: '), message),
} as const
```

`info` und `error` sind hier einfach zwei Funktionen, welche die Farbe des Textes ändern. Der Logger selbst ist ein Objekt, welches zwei Funktionen enthält. Diese Funktionen geben dann den Text in der Konsole aus. Man kann diese dann wie folgt verwenden:

```ts
app.post('/signup', async (req, res) => {
  try {
    const body: z.infer<typeof schema> = schema.parse(req.body)
    const { username, password } = body

    //* Logik zum erstellen eines Users

    Logger.info('user created') //            <==============
    res.json({ message: 'user created' })
  } catch (err) {
    Logger.error(err) //                      <==============
    res.status(400).json({ error: err })
  }
})
```

### Beurteilung
Das Thema Logging habe ich gut verstanden, da es mir vorher schon über den Weg gelaufen ist. Zudem habe ich das hier gut dargestellt.

## Reflexion
Ich finde ich habe den Portfolioeintrag ganz gut erledigt. Grundsätzlich hätte ich aber im Modul besser Arbeiten können und habe oft Aufträge nicht fertig gemacht. Ich denke es lag hauptsächlich daran, dass wir eigentlich seit August keine durchgehend freihe Woche hatten und ich langsam Ferien brauche. Dennoch habe ich im Modul einiges gelernt.

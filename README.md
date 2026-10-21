# RM Bin Forecast — Firebase edition (v3.0.1)

A cloud version of your dashboard: **one link, any device, shared data, email + password login, roles, saved history.**
Runs entirely on the **Firebase Spark (free) plan** — no credit card.

Created & maintained by **Md Nawazish Ali** · Deputy Manager, Operations · Akij Agro Feed Ltd.

---

## If you already installed the earlier copy (fix, 2 minutes)

If your dashboard said **"not approved"** or kept you on the sign-in screen even though you are the owner, that was a rules bug in the first copy — it is fixed in the files in this folder.

1. **Firestore Database → Rules** → delete everything → paste the new `firestore.rules` from this folder → **Publish**.
2. Replace `index.html` (and `firebase-config.js`, if you keep your keys in it) on your host.
3. Open the site and press **Ctrl + F5** (hard refresh).
4. Sign in. The owner named in `cfg/access` is now always treated as admin, and the dashboard creates the missing `members/{your-email}` row itself.

Stuck? The app now shows a red **"Almost there — Firestore is locked"** screen with the exact steps, and a **Rules published — retry** button. Any error text is printed on that screen — send me a screenshot and I can read it.

---

## What is in this folder

| File | What it is | Do I edit it? |
|---|---|---|
| `index.html` | The whole dashboard (same UI, now cloud-connected) | No |
| `firebase-config.js` | Your project keys | **Yes — 6 values, once** |
| `firestore.rules` | Security rules (who may read/write) | Paste into Firebase Console |
| `firebase.json` | Hosting settings for the CLI deploy | No |
| `README.md` | This guide | — |

> The dashboard also works **without** configuration: if you open `index.html` before editing `firebase-config.js`, it behaves exactly like your local file (data in that browser only). Handy for a quick look.

---

# PART 1 — Create the Firebase project (10 minutes, one time)

### Step 1 · Create the project
1. Go to **https://console.firebase.google.com**
2. Sign in with your **Google account** (a company Gmail is fine).
3. Click **Create a project** (or "Add project").
4. Project name: `rm-bin-forecast` (any name).
5. Google Analytics: **turn it OFF** (not needed, keeps things simple).
6. Create → wait ~30 sec → **Continue**.

### Step 2 · Add a Web App and copy the keys
1. On the project home page, click the **`</>`** (Web) icon.
2. App nickname: `RM Dashboard` → **Register app** (do NOT tick Firebase Hosting yet).
3. You will see a block like:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "rm-bin-forecast.firebaseapp.com",
  projectId: "rm-bin-forecast",
  storageBucket: "rm-bin-forecast.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcd1234"
};
```

4. Keep this tab open.

### Step 3 · Paste the keys into `firebase-config.js`
Open `firebase-config.js` in Notepad (or any editor) and replace the six `PASTE_...` values with your real ones. Keep the quotes and commas.

```js
window.FIREBASE_CONFIG = {
  apiKey:            "AIzaSy...",
  authDomain:        "rm-bin-forecast.firebaseapp.com",
  projectId:         "rm-bin-forecast",
  storageBucket:     "rm-bin-forecast.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId:             "1:123456789012:web:abcd1234"
};
```

Save the file. **These keys are not secrets** — they only identify the project. Access is controlled by the rules in Step 6, so the file is safe to publish.

### Step 4 · Turn on Email/Password login
1. Left menu → **Build → Authentication** → **Get started**.
2. Tab **Sign-in method** → click **Email/Password** → toggle **Enable** (leave "Email link" off) → **Save**.

### Step 5 · Create your own login (and your team's later)
1. Authentication → tab **Users** → **Add user**.
2. Email: your address (e.g. `nawazish@akij.net`) · Password: choose a strong one → **Add user**.
3. Repeat for each person who will use the dashboard (operators, managers). Write their passwords down — you give them to the person; they can change it later with "Forgot password".

> Anyone without a user account cannot sign in at all. Anyone with an account but no role gets "not approved" — see Part 3.

### Step 6 · Create the database
1. Left menu → **Build → Firestore Database** → **Create database**.
2. Choose **Production mode** (rules come in the next step).
3. Location: **asia-south1 (Mumbai)** — lowest latency for Bangladesh. *Location cannot be changed later.*
4. **Create**.

### Step 7 · Install the security rules
1. In Firestore Database, open the **Rules** tab.
2. Delete everything in the editor.
3. Open `firestore.rules` from this folder, copy **all** of it, paste.
4. Press **Publish**.

### Step 8 · Put it on the internet
Choose **one** of the two options. Both are free.

#### Option A — Firebase Hosting with the CLI (gives `https://your-project.web.app`)
Needs Node.js installed (https://nodejs.org → LTS). Then in this folder:

```bash
npm install -g firebase-tools
firebase login                     # opens browser, sign in with the same Google account
firebase use --add                 # choose your project, alias: default
firebase deploy --only hosting,firestore:rules
```

The last line prints your live URL: `https://rm-bin-forecast.web.app` (or `.firebaseapp.com`).

After any later edit, redeploy with the same `firebase deploy --only hosting,firestore:rules`.

> `firebase.json` is already prepared for this folder — when `firebase init` asks, choose **Hosting**, "use an existing project", public directory **`.`** (a single dot), **No** to single-page app, and **do not overwrite** `index.html`.

#### Option B — GitHub Pages (no Node install; you already have GitHub)
1. Create a repository, e.g. `rm-bin-forecast`.
2. Upload `index.html` **and** `firebase-config.js` (the `.rules` file is not needed on the web).
3. Repo → **Settings → Pages** → Source: **Deploy from a branch** → branch `main`, folder `/ (root)` → **Save**.
4. Wait a minute → your URL: `https://<username>.github.io/rm-bin-forecast/`
5. **Important:** tell Firebase about this address — Firebase Console → **Authentication → Settings → Authorized domains → Add domain** → `username.github.io`. Without this, login fails with `auth/unauthorized-domain`.

### Step 9 · First sign-in
1. Open your URL.
2. Sign in with the user from Step 5.
3. The first person to sign in becomes the **owner / admin** automatically (this is the bootstrap inside the rules).
4. The dashboard opens with your 95 formulas loaded as the starting library. The **Formulas** tab still lets you upload .xlsx / .csv / .md to update them.

### Step 10 · Add your team
1. **First** create their login: Firebase Console → Authentication → Users → Add user.
2. **Then** in the dashboard: **Access** tab → email + role → **Approve**.
3. Send them the link and their password.

| Role | Can do |
|---|---|
| **Admin** | Everything, including this access list |
| **Editor** | Add/complete runs, bin stock, upload formulas, save History records |
| **Viewer** | Read only + export PDF/CSV/print |

Roles are enforced in **two** places: the page (buttons hidden) and the Firestore rules (server-side). A viewer cannot write even from the browser console.

---

# PART 2 — Daily use

- **Feed Plan** — add the run: date, shift, feed code, line, MT. Tick when produced → forecast drops automatically.
- **Intake Points** — type the stock in each RM bin; Required = forecast − stock, per bin. The bin section is a toggle and shows only the bins the plan needs.
- **Final RM** — grand totals, export PDF / CSV / copy for email / print.
- **History** — "Save current view" freezes the plan + RM quantities + bin stock as a record. Each record re-opens as a report and exports.
- **Formulas** — upload the new BOM .xlsx whenever a formulation changes; it shows what is new/updated before saving.
- **Bin Setup** — change what each bin holds, its intake and its share weight.

Everyone signed in sees the same data live — when an operator adds a run on the mill floor, your screen updates within a second.

---

# PART 3 — Managing people

**Add someone:** Console → Authentication → Users → Add user → then dashboard **Access** tab → their email + role.
**Remove someone:** Access tab → Remove (they keep the login but can't open the dashboard). To block the login too: Authentication → Users → delete the account.
**Change a role:** Access tab → role dropdown.
**Forgot password:** on the login screen, type the email → "Forgot password?" → Firebase emails a reset link.

---

# PART 4 — Backups (important)

Cloud data still needs an archive you control:
1. Dashboard → **History** tab → **Download backup** (a `.json` with formulas, bins, plan, stock and every saved record).
2. Keep it in **Google Drive → a folder shared with yourself**, ideally weekly.
3. To restore (new project, or after a mistake): History → **Restore backup** → choose the file.

Firestore's own scheduled backups require the paid Blaze plan, so this file is your safety net.

---

# PART 5 — Free tier: what you get and what happens at the limit

| Item | Spark free allowance | Your likely usage |
|---|---|---|
| Firestore reads | 50,000 / day | ~110 per page load → ~450 loads/day |
| Firestore writes | 20,000 / day | 1 per run / stock change / snapshot |
| Firestore deletes | 20,000 / day | rare |
| Stored data | 1 GiB | each snapshot ≈ 30–60 KB → years |
| Network egress | 10 GiB / month | small |
| Hosting | 10 GB storage, 360 MB/day transfer | a 220 KB page |
| Authentication | unlimited email/password users | a handful |
| Custom domain + SSL | included, free | — |

**At the limit the product stops for the rest of that day** (quota resets ~midnight US Pacific) — it does not silently bill you. If you ever need more, upgrade to **Blaze** and the same free quota applies; only the excess is billed (reads $0.06/100K, writes $0.18/100K). For a feed mill of your size that is typically **under $1–2/month**.

Not available on Spark (and not needed here): Cloud Functions, Cloud Storage, phone/SMS login. That is why the "photo of formulation" upload is off in this edition — use the Excel/CSV/MD upload instead.

---

# PART 6 — Troubleshooting

| Message / symptom | Cause | Fix |
|---|---|---|
| `auth/api-key-not-valid` | `firebase-config.js` still has placeholders or a wrong key | Re-copy the config from Console → Project settings → Your apps |
| `auth/unauthorized-domain` | Your site's domain is not in the allow-list | Authentication → Settings → Authorized domains → add `username.github.io` or your domain |
| `auth/invalid-credential` / "Wrong email or password" | Typo, or the user was never created | Check Authentication → Users; reset the password |
| "Signed in as … but this email has no role yet" | Account exists, no role | Dashboard → Access tab → approve the email |
| `Missing or insufficient permissions` | Rules not published, or role changed | Firestore → Rules → Publish; re-check the Access tab |
| Page keeps saying "Connecting to Firebase…" | No internet, or config not saved | Check `firebase-config.js` in the same folder as `index.html`, hard-refresh (Ctrl+F5) |
| Blank page after upload | `firebase-config.js` missing on the host | Upload it next to `index.html` |
| Old version still showing | Browser cache | Ctrl+F5 / new incognito tab |
| Login fails with `auth/unauthorized-domain` **only when double-clicking `index.html`** | `file://` pages are not a real web origin | That is normal — test through your hosted URL, or run a tiny local server (`npx serve` then open `http://localhost:3000`) |
| Data looks duplicated after restore | You restored on top of existing runs | History → Restore replaces plan/stock/history; delete runs you don't want first |

---

# PART 7 — Optional: your own domain (free)

1. Buy a domain (e.g. `akij-rmforecast.com`) from any registrar (~$10–12/year).
2. Firebase Console → **Hosting** → **Add custom domain** → type it.
3. Firebase shows one or two DNS records → add them at your registrar.
4. Wait 10–60 min → SSL is issued automatically. `https://your-domain` now opens the dashboard.
5. Add that domain to **Authentication → Authorized domains**.

---

# Security notes (please read once)

- `firebase-config.js` is public by design; it cannot be used to read your data without signing in *and* having a role.
- Passwords are never stored by the dashboard — Firebase Authentication handles them.
- Give each person **their own** login (never share one). The History records and runs store who added them.
- The owner row cannot be demoted or deleted, so you cannot lock yourself out.
- Revoke access the same day when someone leaves the company: Authentication → Users → delete + Access tab → Remove.

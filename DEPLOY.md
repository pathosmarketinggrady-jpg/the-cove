# Deploying The Cove Social Club website

Written for someone who has never done this before. Follow it top to bottom.

There is **no build step**. These are plain files. Any host that can serve a
folder will serve this site. That also means most "deployment errors" are not
about the code, they are about where the files ended up.

---

## Part 1 — Get the code onto GitHub

You already have **GitHub Desktop** installed, and this folder is already a git
repository with one commit in it. You do not need the command line.

### Step 1. Open the repository in GitHub Desktop

1. Open **GitHub Desktop**.
2. Menu bar: **File → Add local repository**.
3. Click **Choose…** and select this exact folder:

   ```
   C:\Users\zlsmi\Downloads\Cove Social Club Website
   ```

4. Click **Add repository**.

If it says *"This directory does not appear to be a Git repository"*, you picked
the wrong folder. It must be the folder that directly contains `index.html`.

### Step 2. Sign in, if you have not already

**File → Options → Accounts → Sign in.** A browser window opens, you approve,
it returns to the app. If you are already signed in, skip this.

### Step 3. Publish

1. Click the blue **Publish repository** button at the top.
2. **Name:** `cove-social-club` (no spaces — spaces in a repo name cause
   problems later).
3. **Keep this code private:** see the note below before deciding.
4. Click **Publish repository**.

That is it. The code is on GitHub.

### Private or public?

| | Private | Public |
|---|---|---|
| Anyone can read the code and photos | No | Yes |
| Free GitHub Pages hosting | **No** | Yes |

The repo contains the club's photographs and their membership pricing. Private
is the safer default. **But free GitHub Pages hosting only works on a public
repo.** If you want to host on GitHub Pages without paying, it has to be public.

If that is not acceptable, use Netlify instead (Part 2b). Netlify hosts from a
private repo for free.

---

## Part 2a — Host it on GitHub Pages

Only works if the repo is **public**.

1. On github.com, open your new repository.
2. **Settings** (top tab) → **Pages** (left sidebar).
3. Under **Source**, choose **Deploy from a branch**.
4. **Branch:** `main`. **Folder:** `/ (root)`. Click **Save**.
5. Wait two or three minutes. Refresh the page. A green banner appears with
   your address, which will look like:

   ```
   https://<your-username>.github.io/cove-social-club/
   ```

### Things to know about GitHub Pages

- **It ignores `_redirects` and `vercel.json`.** GitHub Pages has no redirect
  feature at all. The old WordPress URLs (`/upcoming-events/` and so on) will
  **not** forward. If preserving those matters, use Netlify or Vercel instead.
- `.nojekyll` is included in this repo and is required. Do not delete it.
  Without it GitHub Pages runs the files through Jekyll, which skips anything
  starting with an underscore and can break the build.
- Your site sits in a **subfolder** (`/cove-social-club/`). Every link in this
  site is relative, so that works fine. But `sitemap.xml`, `robots.txt` and the
  canonical tags all say `covesocial.com`. That is correct for the real launch
  and wrong for this preview address. Leave them; fix nothing.

---

## Part 2b — Host it on Netlify (recommended)

Works with a **private** repo, and the redirects actually function.

1. Go to **app.netlify.com** and sign in with GitHub.
2. **Add new site → Import an existing project → GitHub**.
3. Authorise Netlify, then pick your `cove-social-club` repository.
4. Build settings:
   - **Build command:** *leave completely empty*
   - **Publish directory:** *leave empty, or type a single dot* `.`
5. Click **Deploy**.

**The most common Netlify mistake** is letting it guess a build command. There
is nothing to build. If it tries to run one, the deploy fails with something
like *"build command failed"*. Clear the field and redeploy.

Netlify reads `_redirects` automatically, so the old WordPress URLs will
forward properly.

---

## Part 3 — Point covesocial.com at the new site

Do this **last**, once you have loaded the new site at its temporary address
and clicked through all five pages.

### On Netlify
1. **Site configuration → Domain management → Add a domain**.
2. Enter `covesocial.com`.
3. Netlify shows you the DNS records to set. Log in wherever the domain is
   registered and set them.
4. Wait. DNS changes can take anywhere from minutes to a day.

### On GitHub Pages
1. **Settings → Pages → Custom domain**, enter `covesocial.com`, save.
2. At your registrar, point the DNS at GitHub's servers as instructed on that
   page.
3. Tick **Enforce HTTPS** once it becomes available.

**The existing site is WordPress.** Pointing the domain at the new host
replaces it. Do not delete the WordPress install until the new site is
confirmed live and working — you may want to go back.

---

## If something is broken, read this first

**The page loads but has no styling, just black text on white.**
The CSS is not being found. Either `css/styles.css` did not get uploaded, or
the files were uploaded from the wrong level. On GitHub, `index.html` must be
at the **top level** of the repository, not inside another folder. If you see a
folder named `Cove Social Club Website` when you open the repo on github.com,
that is the problem: everything is one level too deep.

**Images are missing but the styling works.**
Almost always upper/lower case. Linux servers treat `Logo.png` and `logo.png`
as different files; Windows does not. Every reference in this site has been
checked against the real filenames, so if this happens, something was renamed
after the fact.

**GitHub Pages says the site is live but shows a 404.**
Usually one of three things: it needs a few more minutes; the branch or folder
in Settings → Pages is wrong (must be `main` and `/ (root)`); or the repository
is private, which disables Pages on a free plan.

**Netlify deploy fails.**
Check the build command is empty. See Part 2b.

**The enquiry form does not send anything.**
This is expected and is not a deployment problem. See the "Going live" section
of `README.md` — the form needs connecting to a form service. Until then it
opens the visitor's email program instead.

**A page shows the old WordPress content.**
Browser cache, or DNS has not finished moving. Try a private window.

---

## What to check once it is live

Open the deployed site and click through:

- [ ] All five pages load: home, events, venue, membership, inquire
- [ ] Photographs appear on every page
- [ ] The gold marquee scrolls under the hero
- [ ] Tonight's event card is highlighted on the calendar (Wednesday to Sunday
      only; nothing is lit on a Monday or Tuesday, which is correct)
- [ ] The menu button works on a phone
- [ ] "Apply for membership" opens the Join It page
- [ ] Phone and email links work on a phone
- [ ] A deliberately wrong address, like `/nope.html`, shows the styled 404 page

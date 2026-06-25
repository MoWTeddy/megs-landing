---
layout: ../layouts/PrivacyLayout.astro
title: "Privacy - Megs"
---

# Megs - Privacy Notice

**Last updated:** June 2026.
**Contact:** `hello@megs.club`

---

## 1. Who we are and what Megs is

Megs is a mobile-first app - available on the web at `app.megs.club` and as native iOS and Android apps - that helps football groups manage their weekly games - sign-ups, team balancing, payments, results, and stats. You'll use it as either:
- A **player** - signed up to a group by an admin or via an invite link.
- An **admin** - running one or more groups for your friends/colleagues.

This policy explains what personal data we collect about you when you use Megs, why, and what your rights are.

---

## 2. The data we collect

### 2.1 Data you give us directly

| Data | When we collect it | Why |
|---|---|---|
| **Email address** | Sign-up | Authentication; sending you account-related emails (password reset, payment confirmations, reschedule notifications) |
| **Password** (hashed) | Sign-up | Authentication. We never store your password in readable form - only a bcrypt hash. |
| **Name** (first, last, optional nickname) | Profile setup or admin adds you to a group | Identifying you to other group members, MOTM votes, league tables |
| **Phone number** (optional) | Profile setup | Matching you to an existing player record if an admin added you before you signed up |
| **Profile picture** (optional) | Profile setup | Avatar shown to your group |
| **Favourite club / preferred position / fixed-keeper flag** (all optional) | Profile setup | Cosmetic + used by the team-balancing engine |

### 2.2 Data the app generates as you use it

| Data | Why |
|---|---|
| **Games you've signed up for / played in** | Game management; stats |
| **Game results, team you were on, goals, fantasy points** | Stats, leaderboards |
| **Skill rating + rating history** | Team balancing engine; leaderboards |
| **MOTM votes you cast and received** | Voting feature; player profile |
| **Dropout log** (if you drop out or get removed) | So your admin can see what happened |
| **Push notification subscriptions** (web browser endpoint + crypto keys, or a native device token from Apple/Google) | Sending you push notifications, only if you've enabled them |
| **Login timestamps + IP** (held by Supabase Auth) | Security monitoring, account abuse detection |
| **Product-usage events** (screens viewed, key actions like sign-up, group creation, game sign-up - tied to a pseudonymous ID, processed by PostHog) | Understanding how Megs is used so we can improve it. Not used for advertising. |

### 2.3 Payment data

If your group uses paid games:

- **Stripe handles all card details directly.** Cards are entered into Stripe's iframe, never touched by Megs servers, and stored by Stripe under [PCI DSS Level 1](https://stripe.com/docs/security).
- **We store**: your Stripe customer ID, payment intent IDs for each game, paid/unpaid/refunded status, and (for admins) connected-account IDs for the Stripe Connect organiser account.
- **We don't store**: card numbers, CVCs, expiry dates, or any data Stripe regards as cardholder data.

### 2.4 What we don't do

- We do **not** sell, rent, or share your data with advertisers.
- We do **not** profile you for behavioural advertising.
- We do **not** track you across other apps or websites, and we do not use any advertising or device-identifier (IDFA / AAID) tracking.

We do use privacy-friendly product analytics (PostHog, EU-hosted) to understand how Megs is used so we can improve it - see the analytics row in 2.2 and the processor table in section 4. This is usage data only (which screens/actions), never your messages or payment details.

---

## 3. Who can see your data inside Megs

| Field | Visible to fellow group members | Visible to your group admin | Visible to you only |
|---|---|---|---|
| Name, avatar, favourite club | ✅ | ✅ | |
| Skill rating, win/loss record, MOTM count, attendance | ✅ | ✅ | |
| Goals you scored, fantasy points | ✅ | ✅ | |
| Email | | | ✅ |
| Phone number | (via API only - not shown in any UI) | | ✅ |
| Payment status (paid / unpaid / refunded) | ✅ | ✅ | |
| Stripe customer ID, payment intent IDs | | (via API only) | |

Different groups are isolated from each other - players in Group A cannot see anything about players in Group B unless they're in both groups.

> **Note:** as of this version of the policy, phone numbers and Stripe payment intent IDs are accessible via Megs' API to other members of your group, even though no UI ever displays them. We're working on tightening this so they're admin-only. Tracked in our internal security log.

---

## 4. Third parties we share data with

We use the following processors. Each is a separate company you have a relationship with via us:

| Provider | Purpose | Data shared | Location | Their policy |
|---|---|---|---|---|
| **Supabase** | Database, authentication, file storage | All app data (encrypted at rest) | EU (Ireland) | [supabase.com/privacy](https://supabase.com/privacy) |
| **Vercel** | Hosting the website you load | None directly - they only see HTTP requests | EU (LHR) and US | [vercel.com/legal/privacy-policy](https://vercel.com/legal/privacy-policy) |
| **Stripe** | Payment processing, Connect accounts for organisers | Email, name, payment info (card data direct, not via us) | EU + US | [stripe.com/privacy](https://stripe.com/privacy) |
| **Resend** | Transactional emails (password reset, payment confirmation, reschedule notices) | Your email, the email content | US (with EU sub-processors) | [resend.com/legal/privacy-policy](https://resend.com/legal/privacy-policy) |
| **Sentry** | Error reporting & masked session replays | Stack traces, browser metadata, **masked** UI text (we set `maskAllText: true` and `blockAllMedia: true`) | EU (Frankfurt) | [sentry.io/privacy](https://sentry.io/privacy) |
| **Google** (optional) | Google sign-in if you choose this method | Email, basic profile from your Google account | US | [policies.google.com/privacy](https://policies.google.com/privacy) |
| **PostHog** | Product-usage analytics (improving the app) | Pseudonymous usage events (screens/actions), device/app metadata | EU | [posthog.com/privacy](https://posthog.com/privacy) |
| **Apple** (iOS app) / **Google Firebase** (Android app) | Delivering push notifications to the native apps | A device push token, only if you enable notifications | US | [apple.com/legal/privacy](https://www.apple.com/legal/privacy/) / [firebase.google.com/support/privacy](https://firebase.google.com/support/privacy) |
| **Capgo** | Delivering over-the-air app updates to the native apps | App version + a device identifier for update delivery | EU | [capgo.app/privacy](https://capgo.app/privacy) |

We do **not** sell your data to anyone.

---

## 5. Legal bases for processing (UK GDPR Article 6)

| Activity | Lawful basis |
|---|---|
| Maintaining your account | **Contract** - you can't use Megs without an account |
| Processing payments via Stripe | **Contract** - you've agreed to pay for the game |
| Sending you password reset / payment confirmation emails | **Contract** |
| Storing your skill rating and game stats | **Legitimate interest** - running team balancing and leaderboards |
| Sending you push notifications | **Consent** - only when you've enabled them in your browser |
| Logging errors via Sentry | **Legitimate interest** - debugging and stability |
| Product-usage analytics via PostHog | **Legitimate interest** - improving the app (usage data only, no advertising) |
| Retaining payment records | **Legal obligation** - HMRC / VAT record-keeping |

---

## 6. How long we keep your data

| Data | Retention |
|---|---|
| Account, profile, game history | Until you delete your account (Profile → Danger zone → Delete my account). |
| Payment records (Stripe customer IDs, transaction history) | 7 years (UK / HMRC requirement for tax record-keeping) |
| Auth logs (sign-in IPs, sessions) | 90 days (Supabase default) |
| Error reports in Sentry | 90 days |
| Backups of the production database | 7 days rolling (Supabase) |
| Push notification subscriptions | Until you turn notifications off, or your browser un-registers |

If you ask to be deleted, your profile + personal info is removed, but anonymised game history (the score of a game, which team won) is retained for the league tables of groups you played in - your name is removed from those records.

---

## 7. Your rights (UK GDPR)

You can:

1. **Access** - ask for a copy of the personal data we hold about you.
2. **Rectify** - fix anything that's wrong. Most of this you can do yourself in your profile.
3. **Erase** ("be forgotten") - delete your own account in-app (Profile → Danger zone → Delete my account), or email `hello@megs.club` if you need help.
4. **Restrict / object** - ask us to stop processing specific data for a specific reason.
5. **Portability** - ask for your data in a machine-readable format. (Self-serve export is on the roadmap. Until then, email `hello@megs.club` and we'll send you a JSON/CSV bundle within 30 days, as required by UK GDPR.)
6. **Withdraw consent** - for anything we process on a consent basis (push notifications, optional profile fields). Turning these off in-app is the easiest route.
7. **Complain** to the [Information Commissioner's Office](https://ico.org.uk/make-a-complaint/).

To exercise any of these: email `hello@megs.club` from the email address on your Megs account. We aim to respond within one month (UK GDPR maximum).

---

## 8. Security

What we do to keep your data safe (high-level - full details in our internal security log):

- All traffic over HTTPS with HSTS preload.
- Auth tokens stored only in your browser, scoped via Content Security Policy and other security headers.
- Passwords stored as bcrypt hashes (never in readable form).
- Payment cards never touch our servers - Stripe handles them directly.
- Row-level security in the database so groups are isolated.
- Sentry session replays mask all visible text and media.
- Privileged admin actions (refunds, player removals, season ends) are logged for audit.

No system is invulnerable. If we ever have a data breach affecting your information, we will notify you and the ICO within 72 hours, as required by UK GDPR.

---

## 9. Cookies and similar technologies

Megs uses:

- **Essential storage** for authentication (set by Supabase Auth and stored in your browser's localStorage). Without these you can't log in.
- **Product analytics** (PostHog) stores a pseudonymous analytics identifier so we can count usage without identifying you to advertisers.
- **No advertising cookies, and no cross-site or cross-app tracking.**

We don't currently show a cookie banner because we only set essential storage plus first-party, non-advertising analytics, but if you'd like that to be more explicit, get in touch.

---

## 10. Children

Megs isn't aimed at children. If we discover an account belongs to someone under 13 (UK / under 16 in the EU), we'll delete it. Admins setting up groups: do not add children's profiles.

---

## 11. International transfers

Most of your data is stored in the EU (Supabase Ireland, Sentry Frankfurt, Vercel London). Some processors (Stripe, Resend, Sentry) may transfer data to the US. Where they do, they rely on UK ICO-approved Standard Contractual Clauses + the EU-US Data Privacy Framework.

---

## 12. Changes to this policy

If we materially change how we use your data, we'll notify you by email or in-app banner at least 14 days before the change takes effect.

---

## 13. Contact

For any privacy-related question or to exercise any of the rights above, email us at `hello@megs.club`.

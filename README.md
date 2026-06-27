# Travels Point

A full-stack travel-agency website and admin console, built with **Laravel 13**, **Inertia.js v2** and **React 19 + TypeScript**. The static HTML mockup that this project was generated from now lives in [`design-reference/`](design-reference/).

## Stack

- **Backend:** Laravel 13 (PHP 8.4), SQLite, Laravel Fortify (auth)
- **Frontend:** Inertia.js v2, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Vite
- **Auth:** email/password login, registration, password reset, two-factor & passkeys (from the Laravel React starter kit)

## Getting started

```bash
composer install
npm install

cp .env.example .env        # already configured for SQLite
php artisan key:generate
php artisan migrate:fresh --seed

# Dev (hot reload)
npm run dev                 # Vite, then visit the Herd URL or `php artisan serve`

# Production assets
npm run build
```

The app is served by **Laravel Herd** at its `.test` domain, or via `php artisan serve`.

### Demo admin login

| Email | Password |
| --- | --- |
| `admin@travelspoint.com` | `password` |

Log in at **`/login`** → you land on the admin console at **`/admin`**.

## Structure

### Public marketing site
| Route | Page |
| --- | --- |
| `/` | Home — hero search, destinations, packages, offers, testimonials |
| `/about` | About — story, stats, values, reviews |
| `/contact` | Contact — inquiry form (writes to the database) |

### Admin console (`/admin`, auth-protected)
Dashboard with live stats, plus full CRUD for six entities:

| Section | Routes |
| --- | --- |
| Offers | `/admin/offers` |
| Destinations | `/admin/destinations` |
| Tour Packages | `/admin/packages` |
| Testimonials | `/admin/testimonials` |
| Homepage Banners | `/admin/banners` |
| Contact Inquiries | `/admin/inquiries` (view / change status / delete) |

### Data model (`app/Models`)
`Destination`, `TourPackage`, `Offer`, `Testimonial`, `Banner`, `Inquiry` — each with a migration, model, and seeded mock data (`database/seeders/TravelsPointSeeder.php`).

### Key frontend locations
- `resources/js/pages/public/*` — marketing pages
- `resources/js/pages/admin/*` — console pages (index + form per entity)
- `resources/js/layouts/public-layout.tsx` — public header/footer
- `resources/js/layouts/auth/auth-travel-layout.tsx` — branded split login
- `resources/js/components/admin/*` — shared console components
- `resources/css/app.css` — sky/amber brand theme (light + dark)

## Useful commands

```bash
php artisan migrate:fresh --seed   # rebuild + reseed the database
npm run build                      # compile assets
npm run types:check                # tsc --noEmit
npm run lint                       # eslint --fix
```

# AI Knowledge Hub CMS handover

## CMS dashboard

Open https://app.pagescms.org/ and sign in with the GitHub account that can access this repository.

1. Install/authorize the Pages CMS GitHub App for `yusiangsoon200-oss/ai-knowledge-hub` only.
2. Open the repository in Pages CMS.
3. Select the `main` branch.
4. The root `.pages.yml` configures the Homepage, AI News/Tips/Learning, Learning paths, and Business cases editors.
5. Edit content and save. Pages CMS commits the changes to GitHub.

## Content publishing

- Resource entries appear on the public site only when `Published on website` is checked.
- Learning paths and business cases follow the same publish checkbox.
- New entries should remain unchecked until reviewed.
- Resource categories control the public filter buttons; use only AI News, AI Tips, or AI Learning.
- Image uploads can be added under `media/`; image fields are not yet part of the current content schema.

## How public updates reach the site

The landing page reads JSON content from `/content/*.json`. A CMS save updates GitHub. The Cloudflare deployment must then publish the new repository revision. Confirm that the existing Cloudflare Worker deployment is connected to this GitHub repository and that commits to `main` trigger deployments. If it is not, configure a GitHub Actions/Cloudflare deploy workflow or trigger a deployment manually after CMS edits.

## Important boundaries

- Pages CMS is an external hosted dashboard; GitHub authentication and repository permissions control who can edit.
- Do not give broad repository write access to people who should only edit website content. GitHub write access can change code as well as content.
- This CMS does not yet manage the newsletter. The current newsletter form is a front-end placeholder and does not collect or send email addresses.
- The website uses static JSON files and does not have a separate content database or custom admin password.

# DigitalOcean Functions project for Flashcard Vocab API

## Structure

- .do/functions/vocab/index.js — DigitalOcean Function (returns vocab JSON)
- .do/functions/vocab/package.json — Function metadata
- public/index.html — Frontend
- public/app.js — Frontend JS (fetches vocab from function)
- public/style.css — Frontend CSS

## Deploying

1. Install doctl and authenticate: https://docs.digitalocean.com/reference/doctl/how-to/install/
2. Deploy the function:

   cd .do/functions/vocab
   doctl serverless deploy .

3. Deploy static files in `public/` to DigitalOcean App Platform (static site) or any static host.

4. Update the fetch URL in `public/app.js` if your function endpoint is different (e.g., full URL).

## Usage
- The frontend fetches vocab from the /vocab endpoint (DigitalOcean Function).
- Toggle language with the button.

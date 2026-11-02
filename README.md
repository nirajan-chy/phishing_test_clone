# FakeBook

FakeBook is a fictional, full-stack login simulation for security education. It
looks like a social-media login page, but it does **not** collect, store, log,
or transmit passwords. The browser sends only `{ "submitted": true }` to
record that the demo form was submitted.

## Requirements

- Node.js 18 or newer
- npm

## Install and start

From this directory, install the Express dependency and start the server:

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Test the application

1. Open the page and enter only made-up training data. Never use a real
   password.
2. Select **Log In**. The page sends a `POST` request to `/api/training`,
   displays the JSON success message, and clears both fields.
3. Open browser Developer Tools and select the **Network** tab.
4. Submit the form again and select the `training` request. Its request payload
   is only:

   ```json
   { "submitted": true }
   ```

   The password field is not read by `script.js` and is not included in the
   request.

You can also test the endpoint from a terminal:

```bash
curl -i -X POST http://localhost:3000/api/training \
  -H "Content-Type: application/json" \
  -d '{"submitted":true}'
```

Expected response:

```json
{
  "success": true,
  "message": "Training event received. No credentials were collected."
}
```

## Request flow

1. `GET /` is handled by Express's static-file middleware and returns
   `public/index.html`.
2. The browser loads `style.css` and `script.js`.
3. `script.js` prevents the normal HTML form submission and uses `fetch()` to
   send a JSON training event to `POST /api/training`.
4. Express validates that `submitted` is a boolean and returns JSON.
5. The browser shows the response message and resets the form.

## GET versus POST

- **GET** requests retrieve a resource, such as the login page at `/`. Data is
  commonly visible in the URL, so GET is not appropriate for sensitive values.
- **POST** requests send data to a server in the request body, such as the
  non-sensitive training event sent to `/api/training`. POST does not make
  data automatically secure; real applications still need HTTPS and careful
  handling of sensitive values.

The forgot-password link and create-account button are intentionally
non-functional parts of this educational simulation.

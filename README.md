
  # Untitled

  This is a code bundle for Untitled. The original project is available at https://www.figma.com/design/lBsQjn1pVA8hMcS62LT2IN/Untitled.

  ## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Configuration

The frontend talks to the FastAPI backend using the `VITE_API_URL` environment
variable. During local development the app falls back to
`http://localhost:8000`, but in production (e.g. Netlify) you must set
`VITE_API_URL` to the deployed backend URL.
  
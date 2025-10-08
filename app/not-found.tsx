"use client";

import Error from "next/error";

// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
      <h1 className="text-2xl font-bold">404 – Page non trouvée</h1>
      <p className="text-gray-500 mt-2">
        La page que vous cherchez n’existe pas.
      </p>
      <Error statusCode={404} />
    </div>
  );
}

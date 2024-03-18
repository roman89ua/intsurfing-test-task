import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageSpinner from "./components/PageSpinner";

const Pokemones = lazy(() => import("./pages/Pokemones"));
const PokemonDetails = lazy(() => import("./pages/PokemonDetails"));
const NotFound = lazy(() => import("./pages/NotFound"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Pokemones />,
  },
  {
    path: "/pokemon-details/:id",
    element: <PokemonDetails />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export const AppRouterProvider = () => {
  return (
    <Suspense fallback={<PageSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Todo from './components/Todo/Todo';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import './index.css';

// Define loader functions
const loader = async () => {
  // Simulating data loading delay using setTimeout
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log("Loader for main route completed");
  return null;
};

const todoLoader = async () => {
  // Simulating data loading delay using setTimeout
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log("Loader for todo route completed");
  return null;
};

// Create router with loaders
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: loader,
    children: [
      {
        path: "todo",
        element: <Todo />,
        loader: todoLoader,
        action: () => console.log("I'm an action"),
        lazy: () => import('./components/LazyLoadedComponent/LazyLoadedComponent'), // Specify the lazy-loaded component
      },
    ],
  },
]);

// Create a new instance of QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <RouterProvider router={router} fallbackElement={<h1>fallbackElement</h1>} />
  </QueryClientProvider>
);

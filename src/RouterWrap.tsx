import App from "./App"

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import Counter from "./features/counter/Counter"
import { Users } from "./features/users/Users"
import { Posts } from "./features/posts/Posts"

const RouterWrap = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <div>Oops! There was an error.</div>,
      children: [
        {
          errorElement: <div>Oops! There was an error.</div>,
          children: [
            { index: true, element: <Users /> },
            {
              path: "posts/:id",
              element: <Posts />,
            },
            {
              path: "*",
              element: <Navigate to="/" replace={true} />,
            },
          ],
        },
      ],
    },
  ])

  return <RouterProvider router={router} />
}

export default RouterWrap

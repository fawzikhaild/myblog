
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import AppBar from "./components/AppBar";
import AdminRoute from "./components/AdminRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import ErrorBoundary from "./components/ErrorBoundary";

import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

import NotFound from "./pages/NotFound";

function AppContent() {
  const location =
    useLocation();

  const is404 =
    location.pathname === "/404";

  return (
    <>
      {!is404 && <AppBar />}

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Posts */}
        <Route
          path="/posts"
          element={<Posts />}
        />

        <Route
          path="/posts/:id"
          element={<PostDetails />}
        />

        {/* Auth */}
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <Register />
            </PublicOnlyRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/dashboard/posts/create"
          element={
            <AdminRoute>
              <CreatePost />
            </AdminRoute>
          }
        />

        <Route
          path="/dashboard/posts/:id/edit"
          element={
            <AdminRoute>
              <EditPost />
            </AdminRoute>
          }
        />

        {/* 404 */}
        <Route
          path="/404"
          element={<NotFound />}
        />

        {/* Unknown routes */}
        <Route
          path="*"
          element={
            <Navigate
              to="/404"
              replace
            />
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}


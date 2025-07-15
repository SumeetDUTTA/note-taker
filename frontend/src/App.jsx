import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./Pages/homePage";
import CreatePage from "./Pages/CreatePage";
import NoteDetailPage from "./Pages/NoteDetailPage";
import RegisterForm from "./Pages/RegisterForm";
import LoginForm from "./Pages/LoginForm";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {

  
  return (
      <div className="relative h-full w-full">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />

        <Routes>
          {/* Public routes */}
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />

          {/* Protected routes (add auth logic later) */}
          <Route path="/" element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
            } />
          <Route path="/create" element={
            <PrivateRoute>
              <CreatePage />
            </PrivateRoute>} />
          <Route path="/note/:id" element={
            <PrivateRoute>
              <NoteDetailPage />
            </PrivateRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
  );
};
export default App;
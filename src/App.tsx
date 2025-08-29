import React from "react";
import { I18nextProvider } from "react-i18next";
import { AuthProvider } from "./contexts/auth/AuthContext";
import { LanguageProvider } from "./contexts/language/LanguageContext";
import requireAuth from "./components/Auth/requireAuth";
import Dashboard from "./pages/Dashboard";
import i18n from "./i18n";

const AuthenticatedDashboard = requireAuth(Dashboard);

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <AuthProvider>
          <AuthenticatedDashboard />
        </AuthProvider>
      </LanguageProvider>
    </I18nextProvider>
  );
};

export default App;

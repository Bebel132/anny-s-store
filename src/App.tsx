import { BrowserRouter } from "react-router"
import Navigation from "./routes"
import { AuthProvider } from "./contexts/AuthContext"
import { ToastProvider } from "./contexts/ToastContext"
import { ProfileProvider } from "./contexts/ProfileContext"

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ProfileProvider>
          <BrowserRouter>
            <Navigation />
          </BrowserRouter>
        </ProfileProvider>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App

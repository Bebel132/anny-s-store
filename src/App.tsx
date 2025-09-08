import { BrowserRouter } from "react-router"
import Navigation from "./routes"
import { AuthProvider } from "./contexts/AuthContext"
import { ToastProvider } from "./contexts/ToastContext"

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App

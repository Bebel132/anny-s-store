import { BrowserRouter } from "react-router"
import Navigation from "./routes"
import { AuthProvider } from "./contexts/AuthContext"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

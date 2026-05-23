import { AppStateProvider } from './store/AppState'
import { AppShell } from './layouts/AppShell'

function App() {
  return (
    <AppStateProvider>
      <AppShell />
    </AppStateProvider>
  )
}

export default App

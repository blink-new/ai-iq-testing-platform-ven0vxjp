import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import HomePage from '@/components/HomePage'
import IQTest from '@/components/IQTest'
import AIGames from '@/components/AIGames'
import Results from '@/components/Results'
import Navbar from '@/components/Navbar'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" enableSystem>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/iq-test" element={<IQTest />} />
            <Route path="/ai-games" element={<AIGames />} />
            <Route path="/results" element={<Results />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
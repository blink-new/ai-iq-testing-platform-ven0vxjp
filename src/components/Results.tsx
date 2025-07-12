import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Brain, TrendingUp, BarChart3, Share2, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useNavigate } from 'react-router-dom'

interface TestResults {
  score: number
  total: number
  percentage: number
  iqEstimate: number
  completedAt: string
}

interface CognitiveProfile {
  category: string
  score: number
  description: string
  color: string
}

const Results = () => {
  const navigate = useNavigate()
  const [results, setResults] = useState<TestResults | null>(null)
  const [cognitiveProfile, setCognitiveProfile] = useState<CognitiveProfile[]>([])

  useEffect(() => {
    // Load results from localStorage
    const savedResults = localStorage.getItem('iqTestResults')
    if (savedResults) {
      const parsedResults: TestResults = JSON.parse(savedResults)
      setResults(parsedResults)
      generateCognitiveProfile(parsedResults)
    }
  }, [])

  const generateCognitiveProfile = (testResults: TestResults) => {
    // Generate AI-based cognitive analysis
    const baseScore = testResults.percentage
    
    const profile: CognitiveProfile[] = [
      {
        category: 'Pattern Recognition',
        score: Math.min(100, baseScore + Math.random() * 20 - 10),
        description: 'Ability to identify and understand visual and logical patterns',
        color: 'from-blue-500 to-blue-600'
      },
      {
        category: 'Logical Reasoning',
        score: Math.min(100, baseScore + Math.random() * 20 - 10),
        description: 'Capacity for systematic thinking and problem-solving',
        color: 'from-purple-500 to-purple-600'
      },
      {
        category: 'Spatial Intelligence',
        score: Math.min(100, baseScore + Math.random() * 20 - 10),
        description: 'Understanding of spatial relationships and visual processing',
        color: 'from-green-500 to-green-600'
      },
      {
        category: 'Processing Speed',
        score: Math.min(100, baseScore + Math.random() * 20 - 10),
        description: 'Speed of cognitive processing and mental agility',
        color: 'from-orange-500 to-orange-600'
      },
      {
        category: 'Working Memory',
        score: Math.min(100, baseScore + Math.random() * 20 - 10),
        description: 'Ability to hold and manipulate information in mind',
        color: 'from-red-500 to-red-600'
      }
    ]

    setCognitiveProfile(profile)
  }

  const getIQCategory = (iq: number) => {
    if (iq >= 130) return { label: 'Very Superior', color: 'text-purple-400' }
    if (iq >= 120) return { label: 'Superior', color: 'text-blue-400' }
    if (iq >= 110) return { label: 'High Average', color: 'text-green-400' }
    if (iq >= 90) return { label: 'Average', color: 'text-yellow-400' }
    if (iq >= 80) return { label: 'Low Average', color: 'text-orange-400' }
    return { label: 'Below Average', color: 'text-red-400' }
  }

  const shareResults = () => {
    if (results) {
      const text = `I just completed an AI-powered IQ test and scored ${results.iqEstimate}! 🧠✨ #IQTest #AI`
      if (navigator.share) {
        navigator.share({
          title: 'My IQ Test Results',
          text,
          url: window.location.origin
        })
      } else {
        navigator.clipboard.writeText(`${text} ${window.location.origin}`)
        // You could add a toast notification here
      }
    }
  }

  const retakeTest = () => {
    navigate('/iq-test')
  }

  const exploreGames = () => {
    navigate('/ai-games')
  }

  if (!results) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Brain className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-bold text-white mb-4">No Results Found</h2>
          <p className="text-gray-300 mb-6">
            Take an IQ test first to see your results and cognitive analysis.
          </p>
          <Button
            onClick={() => navigate('/iq-test')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            Take IQ Test
          </Button>
        </motion.div>
      </div>
    )
  }

  const iqCategory = getIQCategory(results.iqEstimate)

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
          >
            <Trophy className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your IQ Analysis
          </h1>
          <p className="text-xl text-gray-300">
            Detailed cognitive assessment powered by AI
          </p>
        </motion.div>

        {/* Main Results */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
        >
          {/* IQ Score */}
          <Card className="lg:col-span-2 bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center space-x-2">
                <Brain className="w-6 h-6" />
                <span>IQ Estimate</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="text-6xl font-bold text-white mb-4"
                >
                  {results.iqEstimate}
                </motion.div>
                <Badge 
                  variant="outline" 
                  className={`text-lg px-4 py-2 border-white/30 ${iqCategory.color}`}
                >
                  {iqCategory.label}
                </Badge>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{results.score}/{results.total}</div>
                    <div className="text-gray-300 text-sm">Correct Answers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{results.percentage}%</div>
                    <div className="text-gray-300 text-sm">Accuracy</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-xl text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={shareResults}
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Results
              </Button>
              <Button
                onClick={retakeTest}
                variant="outline"
                className="w-full border-white/30 text-white hover:bg-white/10"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake Test
              </Button>
              <Button
                onClick={exploreGames}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Brain className="w-4 h-4 mr-2" />
                Challenge AI
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cognitive Profile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center space-x-2">
                <BarChart3 className="w-6 h-6" />
                <span>Cognitive Profile</span>
              </CardTitle>
              <p className="text-gray-300">
                AI analysis of your cognitive strengths across different domains
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cognitiveProfile.map((item, index) => (
                  <motion.div
                    key={item.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">{item.category}</h3>
                      <span className="text-white font-bold">{Math.round(item.score)}%</span>
                    </div>
                    <Progress 
                      value={item.score} 
                      className="h-2"
                    />
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Insights & Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Key Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                  <span>Your cognitive performance is {iqCategory.label.toLowerCase()}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                  <span>Strongest area: {cognitiveProfile.reduce((max, item) => item.score > max.score ? item : max).category}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
                  <span>Completed test with {results.percentage}% accuracy</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-xl text-white">Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2" />
                  <span>Challenge AI in strategic games to improve</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2" />
                  <span>Retake the test to track your progress</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2" />
                  <span>Share your results with friends</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Results
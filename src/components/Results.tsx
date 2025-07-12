import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Trophy, TrendingUp, Clock, RotateCcw, Home, Gamepad2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'

interface IQTestResult {
  score: number
  correctAnswers: number
  totalQuestions: number
  timeSpent: number
  date: string
}

const Results = () => {
  const [iqResult, setIqResult] = useState<IQTestResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load results from localStorage
    const savedResult = localStorage.getItem('iqTestResult')
    if (savedResult) {
      try {
        setIqResult(JSON.parse(savedResult))
      } catch (error) {
        console.error('Error parsing IQ test result:', error)
      }
    }
    setLoading(false)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const getIQDescription = (score: number) => {
    if (score >= 140) return { level: 'Genius', description: 'Exceptional intellectual ability', color: 'text-purple-400' }
    if (score >= 130) return { level: 'Very Superior', description: 'Outstanding cognitive performance', color: 'text-blue-400' }
    if (score >= 120) return { level: 'Superior', description: 'Above average intelligence', color: 'text-green-400' }
    if (score >= 110) return { level: 'High Average', description: 'Good cognitive abilities', color: 'text-yellow-400' }
    if (score >= 90) return { level: 'Average', description: 'Normal range of intelligence', color: 'text-gray-400' }
    if (score >= 80) return { level: 'Low Average', description: 'Below average performance', color: 'text-orange-400' }
    return { level: 'Below Average', description: 'Consider retaking the test', color: 'text-red-400' }
  }

  const clearResults = () => {
    localStorage.removeItem('iqTestResult')
    setIqResult(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading results...</p>
        </div>
      </div>
    )
  }

  if (!iqResult) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto px-4 text-center"
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-white mb-4">
                No Results Found
              </CardTitle>
              <p className="text-gray-300 text-lg">
                You haven't taken an IQ test yet. Take the test to see your cognitive assessment results here.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  <Link to="/iq-test">
                    <Brain className="w-5 h-5 mr-2" />
                    Take IQ Test
                  </Link>
                </Button>
                
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Link to="/">
                    <Home className="w-5 h-5 mr-2" />
                    Go Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  const iqDescription = getIQDescription(iqResult.score)
  const accuracyPercentage = Math.round((iqResult.correctAnswers / iqResult.totalQuestions) * 100)

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Your <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Cognitive Profile</span>
          </h1>
          <p className="text-xl text-gray-300">
            AI-powered analysis of your intellectual capabilities
          </p>
        </motion.div>

        {/* Main IQ Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-white/20 backdrop-blur-sm">
            <CardContent className="text-center py-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                className="mb-6"
              >
                <div className="text-8xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-2">
                  {iqResult.score}
                </div>
                <div className="text-2xl text-white font-semibold mb-2">IQ Score</div>
                <Badge className={`${iqDescription.color} bg-white/10 text-lg px-4 py-2`}>
                  {iqDescription.level}
                </Badge>
              </motion.div>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                {iqDescription.description}. Your cognitive assessment indicates strong problem-solving abilities and analytical thinking skills.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-green-400" />
                </div>
                <CardTitle className="text-white">Accuracy</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{accuracyPercentage}%</div>
                <p className="text-gray-300 text-sm">
                  {iqResult.correctAnswers} out of {iqResult.totalQuestions} correct
                </p>
                <Progress value={accuracyPercentage} className="mt-4 h-2" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle className="text-white">Completion Time</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{formatTime(iqResult.timeSpent)}</div>
                <p className="text-gray-300 text-sm">
                  {iqResult.timeSpent < 900 ? 'Quick thinker!' : iqResult.timeSpent < 1500 ? 'Good pace' : 'Thoughtful approach'}
                </p>
                <div className="mt-4 h-2 bg-white/10 rounded-full">
                  <div 
                    className="h-full bg-blue-400 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min((iqResult.timeSpent / 1800) * 100, 100)}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle className="text-white">Cognitive Ranking</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  Top {iqResult.score >= 130 ? '2' : iqResult.score >= 115 ? '15' : iqResult.score >= 100 ? '50' : '85'}%
                </div>
                <p className="text-gray-300 text-sm">
                  Compared to general population
                </p>
                <div className="mt-4 flex justify-center">
                  <div className="w-20 h-20 rounded-full border-4 border-purple-400/30 flex items-center justify-center">
                    <span className="text-purple-400 font-bold">
                      {iqResult.score >= 130 ? '98th' : iqResult.score >= 115 ? '85th' : iqResult.score >= 100 ? '50th' : '15th'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Cognitive Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-center text-2xl">
                AI Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-blue-400">Cognitive Strengths</h3>
                  <ul className="space-y-2 text-gray-300">
                    {iqResult.score >= 120 && (
                      <>
                        <li>• Exceptional pattern recognition</li>
                        <li>• Strong analytical reasoning</li>
                        <li>• Advanced problem-solving skills</li>
                      </>
                    )}
                    {iqResult.score >= 100 && iqResult.score < 120 && (
                      <>
                        <li>• Good logical thinking</li>
                        <li>• Solid reasoning abilities</li>
                        <li>• Effective cognitive processing</li>
                      </>
                    )}
                    {iqResult.score < 100 && (
                      <>
                        <li>• Room for cognitive development</li>
                        <li>• Potential for improvement</li>
                        <li>• Practice can enhance abilities</li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-purple-400">Next Steps</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Challenge yourself with strategic games</li>
                    <li>• Practice pattern recognition exercises</li>
                    <li>• Engage in logic puzzles regularly</li>
                    <li>• Consider cognitive training programs</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
            <Link to="/ai-games">
              <Gamepad2 className="w-5 h-5 mr-2" />
              Challenge AI Games
            </Link>
          </Button>
          
          <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
            <Link to="/iq-test">
              <RotateCcw className="w-5 h-5 mr-2" />
              Retake Test
            </Link>
          </Button>
          
          <Button 
            onClick={clearResults}
            size="lg" 
            variant="outline" 
            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
          >
            Clear Results
          </Button>
        </motion.div>

        {/* Test Date */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Test completed on {new Date(iqResult.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Results
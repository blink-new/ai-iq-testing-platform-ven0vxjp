import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Clock, Brain, CheckCircle, Trophy, Target } from 'lucide-react'
import { getAdaptiveQuestions, calculateIQScore, type IQQuestion } from '../data/iqQuestions'

interface TestResult {
  score: number
  totalQuestions: number
  averageTime: number
  iqScore: number
  breakdown: {
    pattern: number
    logic: number
    spatial: number
    numerical: number
    verbal: number
  }
}

export default function IQTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questions, setQuestions] = useState<IQQuestion[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  const [answers, setAnswers] = useState<Array<{questionId: string, answer: number, correct: boolean, timeSpent: number, type: string}>>([])
  const [testStarted, setTestStarted] = useState(false)
  const [testCompleted, setTestCompleted] = useState(false)
  const [result, setResult] = useState<TestResult | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  // Timer effect
  useEffect(() => {
    if (!testStarted || testCompleted) return

    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [testStarted, testCompleted])

  // Initialize test with adaptive questions
  const startTest = () => {
    const initialQuestions = getAdaptiveQuestions(0, [], 15) // Start with 15 questions
    setQuestions(initialQuestions)
    setTestStarted(true)
    setQuestionStartTime(Date.now())
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer === null) return

    const currentQ = questions[currentQuestion]
    const isCorrect = selectedAnswer === currentQ.correctAnswer
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000)

    // Update score and answers
    if (isCorrect) {
      setScore(prev => prev + currentQ.points)
    }

    const newAnswer = {
      questionId: currentQ.id,
      answer: selectedAnswer,
      correct: isCorrect,
      timeSpent,
      type: currentQ.type
    }

    setAnswers(prev => [...prev, newAnswer])

    // Check if test is complete
    if (currentQuestion === questions.length - 1) {
      completeTest([...answers, newAnswer])
    } else {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setQuestionStartTime(Date.now())
      setShowExplanation(false)
    }
  }

  const completeTest = (finalAnswers: typeof answers) => {
    const correctCount = finalAnswers.filter(a => a.correct).length
    const totalTime = finalAnswers.reduce((sum, a) => sum + a.timeSpent, 0)
    const avgTime = totalTime / finalAnswers.length
    const questionTypes = finalAnswers.map(a => a.type)
    
    const iqScore = calculateIQScore(correctCount, finalAnswers.length, avgTime, questionTypes)

    // Calculate breakdown by question type
    const breakdown = {
      pattern: 0,
      logic: 0,
      spatial: 0,
      numerical: 0,
      verbal: 0
    }

    finalAnswers.forEach(answer => {
      if (answer.correct && answer.type in breakdown) {
        breakdown[answer.type as keyof typeof breakdown]++
      }
    })

    const testResult: TestResult = {
      score: correctCount,
      totalQuestions: finalAnswers.length,
      averageTime: avgTime,
      iqScore,
      breakdown
    }

    setResult(testResult)
    setTestCompleted(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getIQRating = (iqScore: number) => {
    if (iqScore >= 140) return { label: 'Genius', color: 'text-purple-400', description: 'Exceptionally gifted' }
    if (iqScore >= 130) return { label: 'Gifted', color: 'text-blue-400', description: 'Highly gifted' }
    if (iqScore >= 115) return { label: 'Above Average', color: 'text-green-400', description: 'Above average intelligence' }
    if (iqScore >= 85) return { label: 'Average', color: 'text-yellow-400', description: 'Average intelligence' }
    return { label: 'Below Average', color: 'text-orange-400', description: 'Room for improvement' }
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Advanced IQ Assessment
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Take our comprehensive intelligence test featuring adaptive questions that adjust to your performance in real-time.
            </p>
          </motion.div>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-center">Test Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <h3 className="text-white font-semibold">Adaptive Testing</h3>
                  <p className="text-gray-300 text-sm">Questions adjust to your skill level</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="text-white font-semibold">15-20 Minutes</h3>
                  <p className="text-gray-300 text-sm">Average completion time</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <h3 className="text-white font-semibold">Comprehensive</h3>
                  <p className="text-gray-300 text-sm">5 different intelligence areas</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Test Areas:</h4>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-300">• Pattern Recognition</div>
                  <div className="text-gray-300">• Logical Reasoning</div>
                  <div className="text-gray-300">• Spatial Intelligence</div>
                  <div className="text-gray-300">• Numerical Reasoning</div>
                  <div className="text-gray-300">• Verbal Intelligence</div>
                </div>
              </div>

              <div className="text-center">
                <Button
                  onClick={startTest}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
                >
                  Begin Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (testCompleted && result) {
    const rating = getIQRating(result.iqScore)
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Test Complete!
            </h1>
            <p className="text-xl text-gray-300">
              Here are your comprehensive results
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white text-center">Your IQ Score</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <div className="text-6xl font-bold text-white mb-2">{result.iqScore}</div>
                  <div className={`text-xl font-semibold ${rating.color}`}>{rating.label}</div>
                  <div className="text-gray-300 text-sm">{rating.description}</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Accuracy</span>
                    <span className="text-white">{Math.round((result.score / result.totalQuestions) * 100)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Questions Correct</span>
                    <span className="text-white">{result.score}/{result.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Average Time</span>
                    <span className="text-white">{Math.round(result.averageTime)}s per question</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Performance Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(result.breakdown).map(([type, score]) => {
                    const maxPossible = answers.filter(a => a.type === type).length
                    const percentage = maxPossible > 0 ? (score / maxPossible) * 100 : 0
                    
                    return (
                      <div key={type}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300 capitalize">{type}</span>
                          <span className="text-white">{score}/{maxPossible}</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3"
            >
              Take Test Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  if (!question) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="text-white">
              <span className="text-2xl font-bold">{currentQuestion + 1}</span>
              <span className="text-gray-300">/{questions.length}</span>
            </div>
            <Progress value={((currentQuestion + 1) / questions.length) * 100} className="w-48" />
          </div>
          
          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeElapsed)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              <span>{score} pts</span>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">
                    {question.type.charAt(0).toUpperCase() + question.type.slice(1)} Question
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      question.difficulty === 'easy' ? 'bg-green-500/20 text-green-300' :
                      question.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {question.difficulty}
                    </span>
                    <span className="text-purple-300 text-sm">{question.points} pts</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl text-white mb-6 leading-relaxed">
                  {question.question}
                </h3>
                
                <div className="grid gap-3">
                  {question.options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerSelect(index)}
                      className={`p-4 text-left rounded-lg border transition-all ${
                        selectedAnswer === index
                          ? 'border-purple-400 bg-purple-500/20 text-white'
                          : 'border-white/20 bg-white/5 text-gray-300 hover:border-purple-400/50 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswer === index ? 'border-purple-400 bg-purple-400' : 'border-gray-400'
                        }`}>
                          {selectedAnswer === index && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="text-lg">{String.fromCharCode(65 + index)}. {option}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                  >
                    <div className="flex items-start gap-2">
                      <Brain className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <h4 className="text-blue-300 font-semibold mb-1">Explanation</h4>
                        <p className="text-gray-300">{question.explanation}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    {showExplanation ? 'Hide' : 'Show'} Explanation
                  </Button>
                  
                  <Button
                    onClick={handleNext}
                    disabled={selectedAnswer === null}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white disabled:opacity-50"
                  >
                    {currentQuestion === questions.length - 1 ? 'Finish Test' : 'Next Question'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
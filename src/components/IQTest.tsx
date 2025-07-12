import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Clock, CheckCircle, ArrowRight, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'

interface Question {
  id: number
  type: 'pattern' | 'logic' | 'spatial' | 'numerical'
  question: string
  options: string[]
  correct: number
  difficulty: 'easy' | 'medium' | 'hard'
  timeLimit: number
}

const IQTest = () => {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [timeLeft, setTimeLeft] = useState(60)
  const [isStarted, setIsStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [score, setScore] = useState(0)

  // AI-generated IQ test questions
  const questions: Question[] = [
    {
      id: 1,
      type: 'pattern',
      question: 'What comes next in the sequence? 2, 6, 18, 54, ?',
      options: ['108', '162', '216', '270'],
      correct: 1,
      difficulty: 'medium',
      timeLimit: 60
    },
    {
      id: 2,
      type: 'logic',
      question: 'If all Bloops are Razzles and all Razzles are Lazzles, then all Bloops are definitely Lazzles.',
      options: ['True', 'False', 'Cannot be determined', 'Insufficient information'],
      correct: 0,
      difficulty: 'easy',
      timeLimit: 45
    },
    {
      id: 3,
      type: 'spatial',
      question: 'Which shape completes the pattern?',
      options: ['Triangle pointing up', 'Circle', 'Square rotated 45°', 'Pentagon'],
      correct: 2,
      difficulty: 'hard',
      timeLimit: 90
    },
    {
      id: 4,
      type: 'numerical',
      question: 'What is the missing number? 1, 4, 9, 16, ?, 36',
      options: ['20', '25', '30', '32'],
      correct: 1,
      difficulty: 'easy',
      timeLimit: 30
    },
    {
      id: 5,
      type: 'logic',
      question: 'If RED is coded as 18-5-4, how is BLUE coded?',
      options: ['2-12-21-5', '2-12-20-5', '1-11-20-4', '3-13-22-6'],
      correct: 0,
      difficulty: 'medium',
      timeLimit: 75
    }
  ]

  useEffect(() => {
    if (isStarted && !isCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isCompleted) {
      handleNext()
    }
  }, [timeLeft, isStarted, isCompleted])

  useEffect(() => {
    if (isStarted && currentQuestion < questions.length) {
      setTimeLeft(questions[currentQuestion].timeLimit)
      setSelectedAnswer(null)
    }
  }, [currentQuestion, isStarted])

  const startTest = () => {
    setIsStarted(true)
    setCurrentQuestion(0)
    setAnswers(new Array(questions.length).fill(null))
    setTimeLeft(questions[0].timeLimit)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedAnswer
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      completeTest(newAnswers)
    }
  }

  const completeTest = (finalAnswers: (number | null)[]) => {
    let correctCount = 0
    finalAnswers.forEach((answer, index) => {
      if (answer === questions[index].correct) {
        correctCount++
      }
    })
    
    setScore(correctCount)
    setIsCompleted(true)
    
    // Store results for the Results page
    localStorage.setItem('iqTestResults', JSON.stringify({
      score: correctCount,
      total: questions.length,
      percentage: Math.round((correctCount / questions.length) * 100),
      iqEstimate: Math.round(85 + (correctCount / questions.length) * 45),
      completedAt: new Date().toISOString()
    }))
  }

  const restartTest = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers([])
    setTimeLeft(60)
    setIsStarted(false)
    setIsCompleted(false)
    setScore(0)
  }

  const goToResults = () => {
    navigate('/results')
  }

  if (!isStarted) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto px-4"
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader className="text-center pb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
              >
                <Brain className="w-10 h-10 text-white" />
              </motion.div>
              <CardTitle className="text-3xl font-bold text-white mb-4">
                AI-Powered IQ Test
              </CardTitle>
              <p className="text-gray-300 text-lg">
                Test your cognitive abilities with our advanced AI assessment system
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Test Format</h3>
                  <p className="text-gray-300 text-sm">5 carefully selected questions covering pattern recognition, logic, and spatial reasoning</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Time Limit</h3>
                  <p className="text-gray-300 text-sm">Each question has a specific time limit based on difficulty level</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">AI Analysis</h3>
                  <p className="text-gray-300 text-sm">Advanced algorithms analyze your response patterns and thinking speed</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Instant Results</h3>
                  <p className="text-gray-300 text-sm">Get your IQ estimate and detailed cognitive profile immediately</p>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={startTest}
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg"
                >
                  Start IQ Test
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto px-4"
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader className="text-center pb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              <CardTitle className="text-3xl font-bold text-white mb-4">
                Test Completed!
              </CardTitle>
              <p className="text-gray-300 text-lg">
                Your results have been analyzed by our AI system
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">
                  {score}/{questions.length}
                </div>
                <p className="text-gray-300">Questions Correct</p>
                <div className="mt-4">
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {Math.round((score / questions.length) * 100)}% Accuracy
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={goToResults}
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  View Detailed Results
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                
                <Button
                  onClick={restartTest}
                  size="lg"
                  variant="outline"
                  className="flex-1 border-white/30 text-white hover:bg-white/10"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Take Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-white/30 text-white">
                Question {currentQuestion + 1} of {questions.length}
              </Badge>
              <Badge 
                variant="outline" 
                className={`border-white/30 text-white ${
                  currentQ.difficulty === 'easy' ? 'bg-green-500/20' :
                  currentQ.difficulty === 'medium' ? 'bg-yellow-500/20' :
                  'bg-red-500/20'
                }`}
              >
                {currentQ.difficulty}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2 text-white">
              <Clock className="w-5 h-5" />
              <span className={`text-lg font-mono ${timeLeft <= 10 ? 'text-red-400' : ''}`}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </span>
            </div>
          </div>
          
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-white">
                  {currentQ.question}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentQ.options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerSelect(index)}
                      className={`p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                        selectedAnswer === index
                          ? 'border-blue-500 bg-blue-500/20 text-white'
                          : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/40 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswer === index ? 'border-blue-500 bg-blue-500' : 'border-gray-400'
                        }`}>
                          {selectedAnswer === index && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="text-lg">{option}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex justify-end">
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
          >
            {currentQuestion === questions.length - 1 ? 'Complete Test' : 'Next Question'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default IQTest
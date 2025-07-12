import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { 
  Gamepad2, 
  Brain, 
  Trophy, 
  Timer,
  Lightbulb,
  Target,
  Zap,
  Star,
  ArrowRight,
  RotateCcw,
  Cpu
} from 'lucide-react'

interface MemoryGame {
  sequence: number[]
  playerSequence: number[]
  currentStep: number
  showingSequence: boolean
  gameOver: boolean
  level: number
}

interface MathChallenge {
  question: string
  answer: number
  userAnswer: string
  timeLeft: number
  streak: number
  difficulty: number
}

const AIGames = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [memoryGame, setMemoryGame] = useState<MemoryGame | null>(null)
  const [mathChallenge, setMathChallenge] = useState<MathChallenge | null>(null)

  // Tic Tac Toe Game
  const [ticTacToeBoard, setTicTacToeBoard] = useState<Array<'X' | 'O' | null>>(Array(9).fill(null))
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [ticTacToeWinner, setTicTacToeWinner] = useState<'X' | 'O' | 'tie' | null>(null)

  const games = [
    {
      id: 'tic-tac-toe',
      title: 'Tic Tac Toe',
      description: 'Classic strategy game against our advanced AI',
      icon: Target,
      difficulty: 'Medium',
      color: 'from-blue-500 to-cyan-500',
      estimatedTime: '2-5 minutes'
    },
    {
      id: 'memory-sequence',
      title: 'Memory Sequence',
      description: 'Remember and repeat increasingly complex patterns',
      icon: Brain,
      difficulty: 'Hard',
      color: 'from-purple-500 to-pink-500',
      estimatedTime: '5-10 minutes'
    },
    {
      id: 'speed-math',
      title: 'Speed Math Battle',
      description: 'Solve math problems faster than the AI',
      icon: Zap,
      difficulty: 'Easy',
      color: 'from-green-500 to-teal-500',
      estimatedTime: '3-7 minutes'
    },
    {
      id: 'pattern-logic',
      title: 'Pattern Logic',
      description: 'Identify patterns in sequences before the AI does',
      icon: Lightbulb,
      difficulty: 'Hard',
      color: 'from-orange-500 to-red-500',
      estimatedTime: '4-8 minutes'
    }
  ]

  // Tic Tac Toe Logic
  const checkWinner = (board: Array<'X' | 'O' | null>) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ]

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }

    if (board.every(cell => cell !== null)) {
      return 'tie'
    }

    return null
  }

  const getAiMove = (board: Array<'X' | 'O' | null>) => {
    // Simple AI strategy: try to win, block player, or take center/corner
    const availableMoves = board.map((cell, index) => cell === null ? index : null).filter(val => val !== null) as number[]
    
    // Try to win
    for (const move of availableMoves) {
      const testBoard = [...board]
      testBoard[move] = 'O'
      if (checkWinner(testBoard) === 'O') {
        return move
      }
    }

    // Block player from winning
    for (const move of availableMoves) {
      const testBoard = [...board]
      testBoard[move] = 'X'
      if (checkWinner(testBoard) === 'X') {
        return move
      }
    }

    // Take center if available
    if (board[4] === null) return 4

    // Take corners
    const corners = [0, 2, 6, 8].filter(i => board[i] === null)
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)]
    }

    // Take any available move
    return availableMoves[Math.floor(Math.random() * availableMoves.length)]
  }

  const handleTicTacToeClick = (index: number) => {
    if (!isPlayerTurn || ticTacToeBoard[index] !== null || ticTacToeWinner) return

    const newBoard = [...ticTacToeBoard]
    newBoard[index] = 'X'
    setTicTacToeBoard(newBoard)

    const winner = checkWinner(newBoard)
    if (winner) {
      setTicTacToeWinner(winner)
      return
    }

    setIsPlayerTurn(false)

    // AI move after delay
    setTimeout(() => {
      const aiMove = getAiMove(newBoard)
      if (aiMove !== undefined) {
        newBoard[aiMove] = 'O'
        setTicTacToeBoard(newBoard)
        
        const finalWinner = checkWinner(newBoard)
        if (finalWinner) {
          setTicTacToeWinner(finalWinner)
        } else {
          setIsPlayerTurn(true)
        }
      }
    }, 1000)
  }

  // Memory Game Logic
  const startMemoryGame = () => {
    const initialSequence = [Math.floor(Math.random() * 4)]
    setMemoryGame({
      sequence: initialSequence,
      playerSequence: [],
      currentStep: 0,
      showingSequence: true,
      gameOver: false,
      level: 1
    })

    // Show sequence
    setTimeout(() => {
      setMemoryGame(prev => prev ? { ...prev, showingSequence: false } : null)
    }, 2000)
  }

  const handleMemoryClick = (color: number) => {
    if (!memoryGame || memoryGame.showingSequence || memoryGame.gameOver) return

    const newPlayerSequence = [...memoryGame.playerSequence, color]
    
    if (newPlayerSequence[memoryGame.currentStep] !== memoryGame.sequence[memoryGame.currentStep]) {
      // Wrong move - game over
      setMemoryGame(prev => prev ? { ...prev, gameOver: true } : null)
      return
    }

    if (newPlayerSequence.length === memoryGame.sequence.length) {
      // Completed sequence - level up
      const newSequence = [...memoryGame.sequence, Math.floor(Math.random() * 4)]
      setTimeout(() => {
        setMemoryGame(prev => prev ? {
          ...prev,
          sequence: newSequence,
          playerSequence: [],
          currentStep: 0,
          showingSequence: true,
          level: prev.level + 1
        } : null)

        setTimeout(() => {
          setMemoryGame(prev => prev ? { ...prev, showingSequence: false } : null)
        }, 2000)
      }, 1000)
    } else {
      setMemoryGame(prev => prev ? {
        ...prev,
        playerSequence: newPlayerSequence,
        currentStep: prev.currentStep + 1
      } : null)
    }
  }

  // Math Challenge Logic
  const generateMathProblem = (difficulty: number) => {
    const operations = ['+', '-', '*']
    const operation = operations[Math.floor(Math.random() * operations.length)]
    
    let a, b, answer
    
    switch (operation) {
      case '+':
        a = Math.floor(Math.random() * (10 * difficulty)) + 1
        b = Math.floor(Math.random() * (10 * difficulty)) + 1
        answer = a + b
        break
      case '-':
        a = Math.floor(Math.random() * (10 * difficulty)) + 10
        b = Math.floor(Math.random() * a) + 1
        answer = a - b
        break
      case '*':
        a = Math.floor(Math.random() * difficulty) + 2
        b = Math.floor(Math.random() * difficulty) + 2
        answer = a * b
        break
      default:
        a = 1; b = 1; answer = 2
    }

    return {
      question: `${a} ${operation} ${b}`,
      answer
    }
  }

  const startMathChallenge = () => {
    const problem = generateMathProblem(1)
    setMathChallenge({
      question: problem.question,
      answer: problem.answer,
      userAnswer: '',
      timeLeft: 10,
      streak: 0,
      difficulty: 1
    })
  }

  // Timer for math challenge
  useEffect(() => {
    if (!mathChallenge || mathChallenge.timeLeft <= 0) return

    const timer = setTimeout(() => {
      if (mathChallenge.timeLeft === 1) {
        // Time's up - generate new problem
        const problem = generateMathProblem(mathChallenge.difficulty)
        setMathChallenge(prev => prev ? {
          ...prev,
          question: problem.question,
          answer: problem.answer,
          userAnswer: '',
          timeLeft: 10,
          streak: 0
        } : null)
      } else {
        setMathChallenge(prev => prev ? { ...prev, timeLeft: prev.timeLeft - 1 } : null)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [mathChallenge?.timeLeft])

  const handleMathAnswer = () => {
    if (!mathChallenge) return

    const userNum = parseInt(mathChallenge.userAnswer)
    if (userNum === mathChallenge.answer) {
      // Correct answer
      const newStreak = mathChallenge.streak + 1
      const newDifficulty = Math.min(5, Math.floor(newStreak / 3) + 1)
      const problem = generateMathProblem(newDifficulty)
      
      setMathChallenge({
        ...mathChallenge,
        question: problem.question,
        answer: problem.answer,
        userAnswer: '',
        timeLeft: Math.max(5, 10 - Math.floor(newStreak / 5)),
        streak: newStreak,
        difficulty: newDifficulty
      })
    } else {
      // Wrong answer
      const problem = generateMathProblem(1)
      setMathChallenge({
        ...mathChallenge,
        question: problem.question,
        answer: problem.answer,
        userAnswer: '',
        timeLeft: 10,
        streak: 0,
        difficulty: 1
      })
    }
  }

  const resetGame = () => {
    setSelectedGame(null)
    setMemoryGame(null)
    setMathChallenge(null)
    setTicTacToeBoard(Array(9).fill(null))
    setIsPlayerTurn(true)
    setTicTacToeWinner(null)
  }

  if (!selectedGame) {
    return (
      <div className="min-h-screen pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
              <Gamepad2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Challenge the AI
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Test your intelligence against our advanced AI in these mind-bending games. Choose your challenge and see how you measure up!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${game.color}`}>
                        <game.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${
                          game.difficulty === 'Easy' ? 'border-green-400 text-green-300' :
                          game.difficulty === 'Medium' ? 'border-yellow-400 text-yellow-300' :
                          'border-red-400 text-red-300'
                        }`}
                      >
                        {game.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-white">{game.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{game.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-sm text-gray-400">
                        <Timer className="w-4 h-4" />
                        {game.estimatedTime}
                      </div>
                      <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <Button
                      onClick={() => {
                        setSelectedGame(game.id)
                        if (game.id === 'memory-sequence') startMemoryGame()
                        if (game.id === 'speed-math') startMathChallenge()
                      }}
                      className={`w-full bg-gradient-to-r ${game.color} hover:opacity-90 text-white`}
                    >
                      Start Challenge
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Tic Tac Toe Game
  if (selectedGame === 'tic-tac-toe') {
    return (
      <div className="min-h-screen pt-16">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Tic Tac Toe vs AI</h1>
            <Button variant="outline" onClick={resetGame} className="border-white/20 text-white">
              <RotateCcw className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
          </div>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white">
                    <div className="text-sm text-gray-300">You</div>
                    <div className="text-2xl font-bold">X</div>
                  </div>
                  <div className="text-white">
                    VS
                  </div>
                  <div className="text-white">
                    <div className="text-sm text-gray-300">AI</div>
                    <div className="text-2xl font-bold">O</div>
                  </div>
                </div>
                
                {ticTacToeWinner && (
                  <div className="mb-4">
                    {ticTacToeWinner === 'tie' ? (
                      <div className="text-yellow-400 text-xl font-bold">It's a Tie!</div>
                    ) : ticTacToeWinner === 'X' ? (
                      <div className="text-green-400 text-xl font-bold flex items-center justify-center gap-2">
                        <Trophy className="w-6 h-6" />
                        You Win!
                      </div>
                    ) : (
                      <div className="text-red-400 text-xl font-bold flex items-center justify-center gap-2">
                        <Cpu className="w-6 h-6" />
                        AI Wins!
                      </div>
                    )}
                  </div>
                )}

                {!ticTacToeWinner && (
                  <div className="text-gray-300 mb-4">
                    {isPlayerTurn ? "Your turn" : "AI is thinking..."}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
                {ticTacToeBoard.map((cell, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: cell === null ? 1.05 : 1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTicTacToeClick(index)}
                    className="aspect-square bg-white/10 border border-white/20 rounded-lg text-4xl font-bold text-white hover:bg-white/20 transition-all"
                    disabled={!isPlayerTurn || cell !== null || ticTacToeWinner !== null}
                  >
                    {cell}
                  </motion.button>
                ))}
              </div>

              {ticTacToeWinner && (
                <div className="text-center mt-6">
                  <Button
                    onClick={() => {
                      setTicTacToeBoard(Array(9).fill(null))
                      setIsPlayerTurn(true)
                      setTicTacToeWinner(null)
                    }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    Play Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Memory Sequence Game
  if (selectedGame === 'memory-sequence' && memoryGame) {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500']
    
    return (
      <div className="min-h-screen pt-16">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Memory Sequence</h1>
            <Button variant="outline" onClick={resetGame} className="border-white/20 text-white">
              <RotateCcw className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
          </div>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-white">
                    <div className="text-sm text-gray-300">Level</div>
                    <div className="text-2xl font-bold">{memoryGame.level}</div>
                  </div>
                  <div className="text-white">
                    <div className="text-sm text-gray-300">Sequence Length</div>
                    <div className="text-2xl font-bold">{memoryGame.sequence.length}</div>
                  </div>
                </div>

                {memoryGame.showingSequence && (
                  <div className="text-purple-400 text-lg mb-4">Watch the sequence...</div>
                )}
                
                {!memoryGame.showingSequence && !memoryGame.gameOver && (
                  <div className="text-green-400 text-lg mb-4">Repeat the sequence!</div>
                )}

                {memoryGame.gameOver && (
                  <div className="text-red-400 text-lg mb-4">
                    Game Over! You reached level {memoryGame.level}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-6">
                {colors.map((color, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleMemoryClick(index)}
                    className={`aspect-square ${color} rounded-lg opacity-70 hover:opacity-100 transition-all ${
                      memoryGame.showingSequence && memoryGame.sequence[memoryGame.currentStep] === index
                        ? 'opacity-100 ring-4 ring-white'
                        : ''
                    }`}
                    disabled={memoryGame.showingSequence || memoryGame.gameOver}
                  />
                ))}
              </div>

              {memoryGame.gameOver && (
                <div className="text-center">
                  <Button
                    onClick={startMemoryGame}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    Play Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Speed Math Game
  if (selectedGame === 'speed-math' && mathChallenge) {
    return (
      <div className="min-h-screen pt-16">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Speed Math Battle</h1>
            <Button variant="outline" onClick={resetGame} className="border-white/20 text-white">
              <RotateCcw className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
          </div>

          <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-6 mb-6">
                  <div className="text-white">
                    <div className="text-sm text-gray-300">Streak</div>
                    <div className="text-2xl font-bold flex items-center gap-1">
                      <Star className="w-6 h-6 text-yellow-400" />
                      {mathChallenge.streak}
                    </div>
                  </div>
                  <div className="text-white">
                    <div className="text-sm text-gray-300">Time Left</div>
                    <div className="text-2xl font-bold text-red-400">{mathChallenge.timeLeft}s</div>
                  </div>
                  <div className="text-white">
                    <div className="text-sm text-gray-300">Difficulty</div>
                    <div className="text-2xl font-bold text-purple-400">{mathChallenge.difficulty}</div>
                  </div>
                </div>

                <Progress value={(mathChallenge.timeLeft / 10) * 100} className="mb-6" />
              </div>

              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-white mb-6">
                  {mathChallenge.question} = ?
                </div>
                
                <div className="flex gap-2 max-w-xs mx-auto">
                  <input
                    type="number"
                    value={mathChallenge.userAnswer}
                    onChange={(e) => setMathChallenge(prev => prev ? { ...prev, userAnswer: e.target.value } : null)}
                    onKeyPress={(e) => e.key === 'Enter' && handleMathAnswer()}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-center text-xl focus:outline-none focus:border-purple-400"
                    placeholder="Answer"
                    autoFocus
                  />
                  <Button
                    onClick={handleMathAnswer}
                    className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-6"
                  >
                    Submit
                  </Button>
                </div>
              </div>

              <div className="text-center text-gray-300">
                <p>Solve as many problems as you can!</p>
                <p className="text-sm">Higher streaks increase difficulty and reduce time</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return null
}

export default AIGames
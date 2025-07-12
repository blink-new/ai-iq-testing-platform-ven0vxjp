import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, RotateCcw, Crown, Target, Brain } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface GameResult {
  playerMove: string
  aiMove: string
  result: 'win' | 'lose' | 'draw'
}

const AIGames = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [gameHistory, setGameHistory] = useState<GameResult[]>([])
  const [playerScore, setPlayerScore] = useState(0)
  const [aiScore, setAiScore] = useState(0)
  const [currentRound, setCurrentRound] = useState(1)
  const [isThinking, setIsThinking] = useState(false)
  const [lastResult, setLastResult] = useState<GameResult | null>(null)

  const games = [
    {
      id: 'rock-paper-scissors',
      name: 'Rock Paper Scissors',
      description: 'Classic game with AI that learns your patterns',
      icon: Target,
      difficulty: 'Medium',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'tic-tac-toe',
      name: 'Tic-Tac-Toe',
      description: 'Strategic board game against advanced AI',
      icon: Crown,
      difficulty: 'Hard',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'memory-sequence',
      name: 'Memory Challenge',
      description: 'Remember and repeat increasingly complex patterns',
      icon: Brain,
      difficulty: 'Expert',
      color: 'from-green-500 to-green-600'
    }
  ]

  // AI strategy for rock-paper-scissors (learns from player patterns)
  const getAIMove = () => {
    if (gameHistory.length < 3) {
      // Random move for first few rounds
      const moves = ['rock', 'paper', 'scissors']
      return moves[Math.floor(Math.random() * moves.length)]
    }

    // Analyze player's last 3 moves and predict next move
    const recentMoves = gameHistory.slice(-3).map(game => game.playerMove)
    const patterns = {
      rock: recentMoves.filter(move => move === 'rock').length,
      paper: recentMoves.filter(move => move === 'paper').length,
      scissors: recentMoves.filter(move => move === 'scissors').length
    }

    // Predict player's next move based on frequency
    const predictedMove = Object.keys(patterns).reduce((a, b) => 
      patterns[a as keyof typeof patterns] > patterns[b as keyof typeof patterns] ? a : b
    )

    // Counter the predicted move
    const counters = {
      rock: 'paper',
      paper: 'scissors',
      scissors: 'rock'
    }

    return counters[predictedMove as keyof typeof counters]
  }

  const playRockPaperScissors = (playerMove: string) => {
    setIsThinking(true)
    
    setTimeout(() => {
      const aiMove = getAIMove()
      let result: 'win' | 'lose' | 'draw'

      if (playerMove === aiMove) {
        result = 'draw'
      } else if (
        (playerMove === 'rock' && aiMove === 'scissors') ||
        (playerMove === 'paper' && aiMove === 'rock') ||
        (playerMove === 'scissors' && aiMove === 'paper')
      ) {
        result = 'win'
        setPlayerScore(prev => prev + 1)
      } else {
        result = 'lose'
        setAiScore(prev => prev + 1)
      }

      const gameResult = { playerMove, aiMove, result }
      setGameHistory(prev => [...prev, gameResult])
      setLastResult(gameResult)
      setCurrentRound(prev => prev + 1)
      setIsThinking(false)
    }, 1500) // AI thinking time
  }

  const resetGame = () => {
    setGameHistory([])
    setPlayerScore(0)
    setAiScore(0)
    setCurrentRound(1)
    setLastResult(null)
  }

  const renderGameSelection = () => (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Challenge the <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">AI</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Test your skills against advanced artificial intelligence in strategic games designed to push your cognitive limits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {games.map((game, index) => {
            const Icon = game.icon
            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => {
                  setSelectedGame(game.id)
                  resetGame()
                }}
                className="cursor-pointer"
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${game.color} flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-white text-center mb-2">
                      {game.name}
                    </CardTitle>
                    <Badge variant="secondary" className="mx-auto bg-white/10 text-white">
                      {game.difficulty}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-center leading-relaxed">
                      {game.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderRockPaperScissors = () => (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={() => setSelectedGame(null)}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            ← Back to Games
          </Button>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Rock Paper Scissors</h1>
            <p className="text-gray-300">Round {currentRound}</p>
          </div>
          <Button 
            onClick={resetGame}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* Score */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="bg-blue-500/20 border-blue-500/30 text-center">
            <CardContent className="py-4">
              <div className="text-2xl font-bold text-blue-400">{playerScore}</div>
              <div className="text-white">You</div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 text-center">
            <CardContent className="py-4">
              <div className="text-lg text-gray-400">VS</div>
            </CardContent>
          </Card>
          <Card className="bg-red-500/20 border-red-500/30 text-center">
            <CardContent className="py-4">
              <div className="text-2xl font-bold text-red-400">{aiScore}</div>
              <div className="text-white">AI</div>
            </CardContent>
          </Card>
        </div>

        {/* Game Result */}
        {lastResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <Card className="bg-white/5 border-white/10">
              <CardContent className="py-6">
                <div className="flex items-center justify-center space-x-8 mb-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{lastResult.playerMove === 'rock' ? '🪨' : lastResult.playerMove === 'paper' ? '📄' : '✂️'}</div>
                    <div className="text-white">You</div>
                  </div>
                  <div className="text-2xl text-gray-400">VS</div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">{lastResult.aiMove === 'rock' ? '🪨' : lastResult.aiMove === 'paper' ? '📄' : '✂️'}</div>
                    <div className="text-white">AI</div>
                  </div>
                </div>
                <div className={`text-xl font-bold ${
                  lastResult.result === 'win' ? 'text-green-400' : 
                  lastResult.result === 'lose' ? 'text-red-400' : 'text-yellow-400'
                }`}>
                  {lastResult.result === 'win' ? 'You Win!' : 
                   lastResult.result === 'lose' ? 'AI Wins!' : 'Draw!'}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Game Controls */}
        <div className="grid grid-cols-3 gap-4">
          {['rock', 'paper', 'scissors'].map((move) => (
            <Button
              key={move}
              onClick={() => playRockPaperScissors(move)}
              disabled={isThinking}
              size="lg"
              className="h-20 bg-white/5 border-white/10 hover:bg-white/10 text-white flex flex-col items-center space-y-2"
            >
              <div className="text-3xl">
                {move === 'rock' ? '🪨' : move === 'paper' ? '📄' : '✂️'}
              </div>
              <span className="capitalize">{move}</span>
            </Button>
          ))}
        </div>

        {isThinking && (
          <div className="text-center mt-6">
            <div className="flex items-center justify-center space-x-2 text-blue-400">
              <Zap className="w-5 h-5 animate-pulse" />
              <span>AI is thinking...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  if (!selectedGame) {
    return renderGameSelection()
  }

  if (selectedGame === 'rock-paper-scissors') {
    return renderRockPaperScissors()
  }

  // For now, return a placeholder for other games
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          {games.find(g => g.id === selectedGame)?.name}
        </h1>
        <p className="text-gray-300 mb-8">Coming soon...</p>
        <Button 
          onClick={() => setSelectedGame(null)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          Back to Games
        </Button>
      </div>
    </div>
  )
}

export default AIGames
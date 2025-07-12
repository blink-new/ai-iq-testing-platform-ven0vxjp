import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Brain, Gamepad2, Zap, Trophy, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const HomePage = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered IQ Testing',
      description: 'Advanced algorithms that adapt to your thinking patterns for accurate intelligence assessment.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Gamepad2,
      title: 'Strategic AI Games',
      description: 'Challenge artificial intelligence in mind-bending games designed to test your cognitive abilities.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Zap,
      title: 'Real-time Analysis',
      description: 'Get instant feedback and detailed insights into your cognitive strengths and areas for improvement.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Trophy,
      title: 'Progress Tracking',
      description: 'Monitor your intellectual growth with comprehensive statistics and achievement systems.',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20"
            >
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">Next-Gen Intelligence Testing</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              Test Your{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Intelligence
              </span>
              <br />
              Against AI
            </h1>

            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the future of cognitive assessment with our AI-powered platform. 
              Take advanced IQ tests and challenge artificial intelligence in strategic games 
              designed to push your mental limits.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full">
                <Link to="/iq-test" className="flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>Start IQ Test</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full">
                <Link to="/ai-games" className="flex items-center space-x-2">
                  <Gamepad2 className="w-5 h-5" />
                  <span>Challenge AI</span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-30">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-2 border-blue-400 rounded-full"
          />
        </div>
        <div className="absolute bottom-20 right-10 opacity-30">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-2 border-purple-400 rounded-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Powered by Advanced AI
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our cutting-edge artificial intelligence adapts to your unique cognitive patterns, 
              providing personalized challenges and accurate assessments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-3xl p-12"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Discover Your Cognitive Potential?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users who have already tested their intelligence and challenged AI in strategic battles.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-full">
              <Link to="/iq-test" className="flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>Begin Your Journey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
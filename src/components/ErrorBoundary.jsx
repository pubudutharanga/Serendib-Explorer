// src/components/ErrorBoundary.jsx
import React from 'react'
import { ModernButton } from './ui/ModernButton'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    // Log error to console
    console.error('💥 Error caught by boundary:', error, errorInfo)
    
    // Here you could also log to an error reporting service
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-3xl font-bold text-slate-800 mb-4">
              Something went wrong
            </h1>
            
            <p className="text-slate-600 mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>

            {this.props.showDetails && this.state.error && (
              <details className="text-left bg-white/50 rounded-lg p-4 mb-6 text-sm">
                <summary className="cursor-pointer font-semibold mb-2">
                  Error Details
                </summary>
                <pre className="whitespace-pre-wrap text-xs">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <ModernButton
                onClick={() => window.location.reload()}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Page
              </ModernButton>
              
              <ModernButton
                variant="outline"
                onClick={() => {
                  this.setState({ hasError: false, error: null, errorInfo: null })
                  window.location.href = '/'
                }}
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Go Home
              </ModernButton>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
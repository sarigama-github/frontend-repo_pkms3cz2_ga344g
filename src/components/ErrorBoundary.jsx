import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative w-full h-[40vh] md:h-[50vh] rounded-3xl overflow-hidden bg-slate-900 grid place-items-center border border-white/10">
          <div className="text-center px-6">
            <p className="text-white font-semibold">Interactive hero failed to load.</p>
            <p className="text-slate-300 text-sm mt-1">This can happen on slow networks or when 3D is blocked. The rest of the dashboard remains available below.</p>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

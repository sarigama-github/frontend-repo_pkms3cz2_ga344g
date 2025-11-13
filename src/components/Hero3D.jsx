import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero3D() {
  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] rounded-3xl overflow-hidden bg-slate-900">
      <Spline scene="https://prod.spline.design/N8g2VNcx8Rycz93J/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/10 to-slate-900/70" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.25),transparent_60%)]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl px-6 py-4 shadow-xl">
          <h1 className="text-2xl md:text-4xl font-semibold text-white tracking-tight">
            Startup Expenditure Dashboard
          </h1>
          <p className="mt-2 text-sm md:text-base text-slate-200">
            Interactive 3D hero with live spending analytics
          </p>
        </div>
      </div>
    </div>
  )
}

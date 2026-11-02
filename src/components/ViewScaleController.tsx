import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Monitor,
  Smartphone,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronDown,
  ChevronUp,
  Sliders
} from 'lucide-react';

export const ViewScaleController: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    effectiveView,
    scalePercent,
    setScalePercent,
    windowWidth
  } = useApp();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleZoomIn = () => {
    setScalePercent(Math.min(150, scalePercent + 10));
  };

  const handleZoomOut = () => {
    setScalePercent(Math.max(70, scalePercent - 10));
  };

  const handleResetZoom = () => {
    setScalePercent(100);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 select-none print:hidden">
      {isCollapsed ? (
        <button
          onClick={() => setIsCollapsed(false)}
          className="bg-[#0A193F]/90 hover:bg-[#0A193F] text-white border border-[#1e428e] shadow-2xl px-3 py-2 rounded-full text-xs font-bold flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer group"
          title="Open View & Scale Controller"
          aria-label="Open View & Scale Controller"
        >
          {effectiveView === 'desktop' ? (
            <Monitor className="w-3.5 h-3.5 text-sky-400" />
          ) : (
            <Smartphone className="w-3.5 h-3.5 text-sky-400" />
          )}
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-200">
            {viewMode === 'auto' ? `Auto (${effectiveView})` : viewMode}
          </span>
          <span className="text-[10px] text-sky-300 font-bold bg-[#142B66] px-1.5 py-0.5 rounded">
            {scalePercent}%
          </span>
          <ChevronUp className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
        </button>
      ) : (
        <div className="bg-[#0A193F]/95 border border-[#1e428e] shadow-2xl rounded-2xl p-2.5 backdrop-blur-md text-white flex flex-col gap-2 min-w-[280px] animate-in fade-in slide-in-from-bottom-2">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-1.5 border-b border-[#142B66] px-1">
            <div className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[11px] font-black uppercase tracking-wider text-sky-200">
                View &amp; Screen Scale
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-slate-300 font-mono">
                {windowWidth}px
              </span>
              <button
                onClick={() => setIsCollapsed(true)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-[#142B66] transition-colors cursor-pointer"
                title="Minimize controller"
                aria-label="Minimize"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Mode Switcher: Desktop | Mobile | Auto */}
          <div className="grid grid-cols-3 gap-1 bg-[#06112d] p-1 rounded-xl border border-[#142B66]">
            <button
              onClick={() => setViewMode('desktop')}
              className={`py-1.5 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'desktop'
                  ? 'bg-[#0B5FFF] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-[#142B66]'
              }`}
              title="Force Desktop View on any screen"
            >
              <Monitor className="w-3 h-3" />
              <span>Desktop</span>
            </button>

            <button
              onClick={() => setViewMode('mobile')}
              className={`py-1.5 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'mobile'
                  ? 'bg-[#0B5FFF] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-[#142B66]'
              }`}
              title="Force Mobile View"
            >
              <Smartphone className="w-3 h-3" />
              <span>Mobile</span>
            </button>

            <button
              onClick={() => setViewMode('auto')}
              className={`py-1.5 px-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'auto'
                  ? 'bg-[#0B5FFF] text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-[#142B66]'
              }`}
              title="Auto scale based on screen size"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Auto</span>
            </button>
          </div>

          {/* Scale Zoom Controls: [-] 100% [+] */}
          <div className="flex items-center justify-between gap-1 pt-0.5 px-1">
            <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">
              Zoom:
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={handleZoomOut}
                disabled={scalePercent <= 70}
                className="w-7 h-7 rounded-lg bg-[#142B66] hover:bg-[#1a3885] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors cursor-pointer"
                title="Zoom Out (Scale down)"
                aria-label="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleResetZoom}
                className="px-2.5 h-7 rounded-lg bg-[#142B66] hover:bg-[#1a3885] text-sky-200 text-xs font-black transition-colors cursor-pointer"
                title="Reset to 100%"
                aria-label="Reset Zoom"
              >
                {scalePercent}%
              </button>

              <button
                onClick={handleZoomIn}
                disabled={scalePercent >= 150}
                className="w-7 h-7 rounded-lg bg-[#142B66] hover:bg-[#1a3885] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors cursor-pointer"
                title="Zoom In (Scale up)"
                aria-label="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

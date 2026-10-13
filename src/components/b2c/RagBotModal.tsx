'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Plane,
  ChevronDown,
} from 'lucide-react';
import { useBookingStore } from '@/store/useBookingStore';

export function RagBotModal() {
  const {
    isChatOpen,
    setIsChatOpen,
    chatMessages,
    addChatMessage,
    isAiTyping,
  } = useBookingStore();

  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isChatOpen, isAiTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    addChatMessage({
      sender: 'user',
      text: text.trim(),
    });

    if (!textToSend) setInputMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-indigo-950 to-indigo-900 hover:from-indigo-900 hover:to-indigo-800 text-white rounded-full shadow-2xl hover:shadow-indigo-950/50 transition-all duration-300 group border border-indigo-700/50"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-saffron-400 group-hover:scale-110 transition-transform" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 animate-pulse" />
          </div>
          <span className="text-xs font-bold tracking-wide hidden sm:inline">
            Fly Wid Us Assistant
          </span>
          <span className="text-[10px] bg-saffron-500/30 text-saffron-300 px-1.5 py-0.5 rounded-full font-bold">
            AI
          </span>
        </button>
      </div>

      {/* Slide-Up Chat Interface */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-96 max-h-[580px] h-[540px] bg-white rounded-3xl border border-slate-200/90 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-950 to-indigo-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-saffron-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm">Fly Wid Us Assistant</h3>
                    <span className="text-[10px] font-bold bg-emerald-500 text-white px-1.5 py-0.2 rounded-full">
                      Online
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Smart RAG & Flight Booking Concierge
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/60">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-indigo-900 text-white rounded-br-none'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>

                  {/* Suggestion Chips */}
                  {msg.chips && msg.chips.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {msg.chips.map((chip, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSend(chip)}
                          className="text-[11px] font-medium bg-white hover:bg-indigo-50 hover:text-indigo-900 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-full transition shadow-2xs text-left"
                        >
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isAiTyping && (
                <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-slate-200/80 text-xs text-slate-500 w-24">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about flights, packages, or baggage..."
                  className="flex-1 px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={!inputMessage.trim()}
                  className="w-9 h-9 rounded-xl bg-indigo-900 hover:bg-indigo-800 disabled:bg-slate-200 text-white disabled:text-slate-400 flex items-center justify-center transition shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="text-[10px] text-slate-400 text-center mt-1.5">
                Fly Wid Us AI Assistant • RAG Semantic Engine
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

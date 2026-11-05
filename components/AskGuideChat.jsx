'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Compass, HelpCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const SUGGESTED_QUESTIONS = [
  "Is this route safe for a solo traveler after dark?",
  "How can I make this itinerary even cheaper?",
  "What is the best way to get between these stops?",
  "Are there authentic vegetarian/vegan options nearby?",
];

export default function AskGuideChat({ itinerary }) {
  const { t } = useApp();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Namaste! I am your native on-the-ground guide for ${itinerary?.destination || 'your destination'}. Ask me anything about safety, negotiation, secret lanes, or how to customize these stops!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (questionText) => {
    const textToSend = questionText || input;
    if (!textToSend || !textToSend.trim() || loading) return;

    const userMsg = { role: 'user', content: textToSend.trim() };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itinerary,
          userMessage: textToSend.trim(),
          chatHistory: newHistory,
        }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: "I couldn't reach the local network right now, but feel free to ask a nearby chai vendor or shopkeeper upon arrival!",
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Apologies! There was a connection hiccup. Local elders always recommend bargaining politely with rickshaw drivers and carrying small cash notes!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ask-guide-chat" className="mt-12 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200/90 dark:border-stone-800 shadow-lg overflow-hidden transition-colors">
      {/* Header */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-terracotta-500 flex items-center justify-center text-white shadow-md">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-base sm:text-lg font-bold">
              {t.askGuideTitle}
            </h3>
            <p className="text-xs text-stone-300">
              {t.askGuideSubtitle}
            </p>
          </div>
        </div>
        <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-xs text-stone-200">
          <Sparkles className="w-3.5 h-3.5 text-saffron-400" />
          <span>Musafir AI</span>
        </div>
      </div>

      {/* Suggested quick chips */}
      <div className="px-5 sm:px-6 pt-4 pb-2 bg-sand-50/70 dark:bg-stone-850 border-b border-stone-100 dark:border-stone-800 flex flex-wrap gap-2">
        <div className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase flex items-center gap-1 w-full sm:w-auto">
          <HelpCircle className="w-3 h-3 text-terracotta-600 dark:text-terracotta-400" />
          Quick inquiries:
        </div>
        {SUGGESTED_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(q)}
            disabled={loading}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-terracotta-400 dark:hover:border-terracotta-500 hover:bg-terracotta-50 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-300 hover:text-terracotta-800 dark:hover:text-terracotta-300 transition-colors disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="p-5 sm:p-6 max-h-80 overflow-y-auto space-y-4 bg-stone-50/40 dark:bg-stone-950/40">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-terracotta-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold shadow-xs">
                M
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-terracotta-600 text-white rounded-tr-xs shadow-xs'
                  : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 rounded-tl-xs shadow-xs'
              }`}
            >
              <div className="whitespace-pre-line">{msg.content}</div>
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-stone-700 dark:bg-stone-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold shadow-xs">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-xs italic pl-11">
            <div className="w-2 h-2 rounded-full bg-terracotta-500 animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-terracotta-500 animate-bounce delay-100" />
            <div className="w-2 h-2 rounded-full bg-terracotta-500 animate-bounce delay-200" />
            <span className="ml-1 text-stone-600 dark:text-stone-300">Guide is answering...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-4 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2 sm:gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.askGuidePlaceholder}
          className="flex-1 px-4 py-2.5 rounded-xl bg-sand-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:border-terracotta-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 py-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
        >
          <span>{t.sendBtn}</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}

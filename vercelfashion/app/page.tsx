"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Home, Download, Send, Cloud, ImageIcon, Sun, Moon, CloudRain, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export default function Page() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! I'm your AI assistant. How can I help you today?", isUser: false },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [weatherData, setWeatherData] = useState({ temp: "25°C", condition: "Sunny", icon: "sun" })
  const [filesAttached, setFilesAttached] = useState(0)
  const [activeView, setActiveView] = useState<"split" | "chat">("split")
  const [isTyping, setIsTyping] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const sendMessage = () => {
    if (inputMessage.trim() === "") return

    const newMessages = [...messages, { text: inputMessage, isUser: true }]

    setMessages(newMessages)
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: getAIResponse(inputMessage), isUser: false }])
      setIsTyping(false)
    }, 1500)

    // Scroll to bottom of chat
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
      }
    }, 100)
  }

  const getAIResponse = (message: string) => {
    const responses = [
      "I understand what you're saying. Can you tell me more?",
      "That's interesting! Let me think about that for a moment.",
      "I appreciate your question. Here's what I think...",
      "Great point! Have you considered looking at it from this perspective?",
      "I see what you mean. Let's explore that idea further.",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Scroll to bottom on initial load
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const WeatherIcon = () => {
    switch (weatherData.icon) {
      case "sun":
        return <Sun size={64} className="text-yellow-500" />
      case "cloud":
        return <Cloud size={64} className="text-gray-400" />
      case "rain":
        return <CloudRain size={64} className="text-blue-400" />
      default:
        return <Sun size={64} className="text-yellow-500" />
    }
  }

  return (
    <main
      className={cn(
        "flex flex-col h-screen overflow-hidden transition-colors duration-300",
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800",
      )}
    >
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className={theme === "dark" ? "text-yellow-300" : "text-indigo-600"}
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
      </div>

      {activeView === "split" ? (
        <>
          {/* Top Section - Weather and Images */}
          <div
            className={cn(
              "h-1/2 transition-all duration-300",
              theme === "dark" ? "border-b border-gray-700" : "border-b border-indigo-100",
            )}
          >
            <Tabs defaultValue="weather" className="h-full">
              <TabsList
                className={cn(
                  "w-full grid grid-cols-2 h-14 rounded-none",
                  theme === "dark"
                    ? "bg-gray-800 border-b border-gray-700"
                    : "bg-white/80 backdrop-blur-sm border-b border-indigo-100",
                )}
              >
                <TabsTrigger
                  value="weather"
                  className={cn(
                    "text-xl font-medium rounded-none transition-all data-[state=active]:border-b-2",
                    theme === "dark"
                      ? "data-[state=active]:border-blue-400 data-[state=active]:text-blue-400"
                      : "data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-700",
                  )}
                >
                  weather
                </TabsTrigger>
                <TabsTrigger
                  value="images"
                  className={cn(
                    "text-xl font-medium rounded-none transition-all data-[state=active]:border-b-2",
                    theme === "dark"
                      ? "data-[state=active]:border-blue-400 data-[state=active]:text-blue-400"
                      : "data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-700",
                  )}
                >
                  images
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="weather"
                className={cn(
                  "h-[calc(100%-3.5rem)] p-6 flex items-center justify-center",
                  theme === "dark" ? "bg-gray-800/50" : "bg-white/30 backdrop-blur-sm",
                )}
              >
                <div
                  className={cn(
                    "text-center p-8 rounded-xl transition-all",
                    theme === "dark"
                      ? "bg-gray-800 shadow-lg shadow-gray-900/30"
                      : "bg-white/80 shadow-lg shadow-indigo-200/50",
                  )}
                >
                  <WeatherIcon />
                  <h2 className={cn("text-4xl font-bold mt-4", theme === "dark" ? "text-gray-100" : "text-indigo-900")}>
                    {weatherData.temp}
                  </h2>
                  <p className={cn("text-xl mt-2", theme === "dark" ? "text-gray-300" : "text-indigo-600")}>
                    {weatherData.condition}
                  </p>
                  <div className="mt-6 flex gap-2 justify-center">
                    <Button
                      size="sm"
                      variant={theme === "dark" ? "outline" : "default"}
                      className={theme === "dark" ? "border-gray-600" : ""}
                      onClick={() => setWeatherData({ temp: "25°C", condition: "Sunny", icon: "sun" })}
                    >
                      Sunny
                    </Button>
                    <Button
                      size="sm"
                      variant={theme === "dark" ? "outline" : "default"}
                      className={theme === "dark" ? "border-gray-600" : ""}
                      onClick={() => setWeatherData({ temp: "18°C", condition: "Cloudy", icon: "cloud" })}
                    >
                      Cloudy
                    </Button>
                    <Button
                      size="sm"
                      variant={theme === "dark" ? "outline" : "default"}
                      className={theme === "dark" ? "border-gray-600" : ""}
                      onClick={() => setWeatherData({ temp: "15°C", condition: "Rainy", icon: "rain" })}
                    >
                      Rainy
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent
                value="images"
                className={cn(
                  "h-[calc(100%-3.5rem)] p-6 flex items-center justify-center",
                  theme === "dark" ? "bg-gray-800/50" : "bg-white/30 backdrop-blur-sm",
                )}
              >
                <div
                  className={cn(
                    "text-center p-8 rounded-xl w-full max-w-md transition-all",
                    theme === "dark"
                      ? "bg-gray-800 shadow-lg shadow-gray-900/30"
                      : "bg-white/80 shadow-lg shadow-indigo-200/50",
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg p-8 mb-6 border-2 border-dashed flex flex-col items-center justify-center",
                      theme === "dark" ? "border-gray-700" : "border-indigo-200",
                    )}
                  >
                    <ImageIcon size={64} className={theme === "dark" ? "text-gray-600" : "text-indigo-300"} />
                    <p className={cn("mt-4 text-lg", theme === "dark" ? "text-gray-400" : "text-indigo-500")}>
                      Drag and drop images here
                    </p>
                  </div>
                  <Button
                    className={cn(
                      "px-6",
                      theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-indigo-600 hover:bg-indigo-700",
                    )}
                  >
                    Upload Image
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Toggle Button */}
          <div className="relative">
            <Button
              variant={theme === "dark" ? "outline" : "default"}
              className={cn(
                "absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10 h-12 w-12 p-0 rounded-full shadow-lg transition-all",
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  : "bg-white border-indigo-100 hover:bg-indigo-50",
              )}
              onClick={() => setActiveView("chat")}
            >
              <Home size={20} className={theme === "dark" ? "text-blue-400" : "text-indigo-600"} />
            </Button>
          </div>

          {/* Bottom Section - Chat */}
          <div className="flex-1 flex flex-col">
            <div
              className={cn("py-4 px-6", theme === "dark" ? "border-b border-gray-700" : "border-b border-indigo-100")}
            >
              <h2
                className={cn("text-2xl font-bold text-center", theme === "dark" ? "text-blue-400" : "text-indigo-700")}
              >
                chat(with ai)
              </h2>
            </div>

            <div
              ref={chatContainerRef}
              className={cn(
                "flex-1 overflow-y-auto p-4 space-y-4",
                theme === "dark" ? "bg-gray-800/50" : "bg-white/30 backdrop-blur-sm",
              )}
            >
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={cn(
                      "max-w-[80%] p-4 rounded-2xl shadow-md",
                      message.isUser
                        ? theme === "dark"
                          ? "bg-blue-600 text-white"
                          : "bg-indigo-600 text-white"
                        : theme === "dark"
                          ? "bg-gray-700 text-gray-100 border border-gray-600"
                          : "bg-white text-gray-800 border border-indigo-100",
                    )}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div
                    className={cn(
                      "max-w-[80%] p-4 rounded-2xl shadow-md flex items-center gap-2",
                      theme === "dark"
                        ? "bg-gray-700 text-gray-100 border border-gray-600"
                        : "bg-white text-gray-800 border border-indigo-100",
                    )}
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>AI is typing...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6">
              <div
                className={cn(
                  "flex rounded-full overflow-hidden shadow-lg",
                  theme === "dark" ? "bg-gray-700" : "bg-white",
                )}
              >
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="chat here"
                  className={cn(
                    "flex-1 border-0 focus-visible:ring-0 text-center py-6",
                    theme === "dark" ? "bg-gray-700 text-gray-100" : "bg-white text-gray-800",
                  )}
                />
                <Button
                  onClick={sendMessage}
                  className={cn(
                    "rounded-full px-6",
                    theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-indigo-600 hover:bg-indigo-700",
                  )}
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Top Section - Weather and Files */}
          <div
            className={cn("h-20 flex", theme === "dark" ? "border-b border-gray-700" : "border-b border-indigo-100")}
          >
            <div
              className={cn(
                "w-1/2 flex items-center justify-center",
                theme === "dark" ? "border-r border-gray-700" : "border-r border-indigo-100",
              )}
            >
              <div className="flex items-center gap-2">
                <WeatherIcon />
                <div>
                  <p className={cn("font-bold", theme === "dark" ? "text-blue-400" : "text-indigo-700")}>weather(C)</p>
                  <p className={theme === "dark" ? "text-gray-400" : "text-indigo-500"}>{weatherData.temp}</p>
                </div>
              </div>
            </div>
            <div className="w-1/2 flex items-center justify-center">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center",
                    theme === "dark" ? "bg-gray-700" : "bg-indigo-100",
                  )}
                >
                  <p className={cn("font-bold", theme === "dark" ? "text-blue-400" : "text-indigo-700")}>
                    {filesAttached}
                  </p>
                </div>
                <p className={cn("font-bold", theme === "dark" ? "text-gray-300" : "text-gray-600")}>files attached</p>
              </div>
            </div>
          </div>

          {/* Toggle Button */}
          <div className="relative">
            <Button
              variant={theme === "dark" ? "outline" : "default"}
              className={cn(
                "absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10 h-12 w-12 p-0 rounded-full shadow-lg transition-all",
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 hover:bg-gray-700"
                  : "bg-white border-indigo-100 hover:bg-indigo-50",
              )}
              onClick={() => setActiveView("split")}
            >
              <Download size={20} className={theme === "dark" ? "text-blue-400" : "text-indigo-600"} />
            </Button>
          </div>

          {/* Chat Section (Larger) */}
          <div className="flex-1 flex flex-col">
            <div
              className={cn("py-4 px-6", theme === "dark" ? "border-b border-gray-700" : "border-b border-indigo-100")}
            >
              <h2
                className={cn("text-2xl font-bold text-center", theme === "dark" ? "text-blue-400" : "text-indigo-700")}
              >
                chat(with ai)
              </h2>
            </div>

            <div
              ref={chatContainerRef}
              className={cn(
                "flex-1 overflow-y-auto p-4 space-y-4",
                theme === "dark" ? "bg-gray-800/50" : "bg-white/30 backdrop-blur-sm",
              )}
            >
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={cn(
                      "max-w-[80%] p-4 rounded-2xl shadow-md",
                      message.isUser
                        ? theme === "dark"
                          ? "bg-blue-600 text-white"
                          : "bg-indigo-600 text-white"
                        : theme === "dark"
                          ? "bg-gray-700 text-gray-100 border border-gray-600"
                          : "bg-white text-gray-800 border border-indigo-100",
                    )}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div
                    className={cn(
                      "max-w-[80%] p-4 rounded-2xl shadow-md flex items-center gap-2",
                      theme === "dark"
                        ? "bg-gray-700 text-gray-100 border border-gray-600"
                        : "bg-white text-gray-800 border border-indigo-100",
                    )}
                  >
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>AI is typing...</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6">
              <div
                className={cn(
                  "flex rounded-full overflow-hidden shadow-lg",
                  theme === "dark" ? "bg-gray-700" : "bg-white",
                )}
              >
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="chat here"
                  className={cn(
                    "flex-1 border-0 focus-visible:ring-0 text-center py-6",
                    theme === "dark" ? "bg-gray-700 text-gray-100" : "bg-white text-gray-800",
                  )}
                />
                <Button
                  onClick={sendMessage}
                  className={cn(
                    "rounded-full px-6",
                    theme === "dark" ? "bg-blue-600 hover:bg-blue-700" : "bg-indigo-600 hover:bg-indigo-700",
                  )}
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  )
}

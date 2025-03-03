import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Base64EncoderDecoderContent } from "./encoder-decoder-content"
import { ThemeProvider } from "@/components/theme-provider"

export default function EncoderDecoder() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl border-gray-700 shadow-xl">
          <CardHeader className="border-b border-gray-700">
            <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-2">
              <span className="text-2xl">🐧</span> Message Encoder Decoder <span className="text-2xl">🐧</span>
            </CardTitle>
          </CardHeader>
          <Suspense fallback={<CardContent>Loading...</CardContent>}>
            <Base64EncoderDecoderContent />
          </Suspense>
          <div className="text-center my-3">
            <a href="https://github.com/penguinlalo/message-encoder-decoder.git" target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:text-blue-300">Source on GitHub</a>
          </div>
        </Card>
      </div>
    </ThemeProvider>
  )
}

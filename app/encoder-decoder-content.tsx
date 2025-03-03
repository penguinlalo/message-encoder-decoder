"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { decode, encode } from "./encoding"
import { EmojiSelector } from "@/components/emoji-selector"
import { ALPHABET_LIST, EMOJI_LIST, NUMBER_LIST } from "./emoji"

export function Base64EncoderDecoderContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Read mode from URL parameters, other state stored locally
  const mode = searchParams.get("mode") || "encode"
  const [inputText, setInputText] = useState("")
  const [selectedEmoji, setSelectedEmoji] = useState("🐧")
  const [outputText, setOutputText] = useState("")
  const [errorText, setErrorText] = useState("")
  const [copied, setCopied] = useState(false)

  // Update URL when mode changes
  const updateMode = (newMode: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("mode", newMode)
    router.replace(`?${params.toString()}`)
  }

  // Convert input whenever it changes
  useEffect(() => {
    try {
      const isEncoding = mode === "encode"
      const output = isEncoding ? encode(selectedEmoji, inputText) : decode(inputText)
      setOutputText(output)
      setErrorText("")
    } catch (e) {
      setOutputText("")
      setErrorText(`Error ${mode === "encode" ? "encoding" : "decoding"}: Invalid input`)
    }
  }, [mode, selectedEmoji, inputText])

  // Handle initial URL state
  useEffect(() => {
    if (!searchParams.has("mode")) {
      updateMode("encode")
    }
  }, [searchParams, updateMode])

  const isEncoding = mode === "encode"

  const copyToClipboard = async () => {
    if (outputText) {
      await navigator.clipboard.writeText(outputText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <CardContent className="space-y-6 p-6">
      <p className="text-gray-400">This tool allows you to encode secret messages into emojis, letters, or numbers. Use the decoder to reveal hidden messages!</p>

      <Tabs defaultValue={isEncoding ? "encode" : "decode"} className="w-full" onValueChange={(value) => updateMode(value)}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="encode" className="text-lg">
            Encode <span className="ml-1">🔒</span>
          </TabsTrigger>
          <TabsTrigger value="decode" className="text-lg">
            Decode <span className="ml-1">🔓</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="encode" className="space-y-4">
          <div className="space-y-2">
            <div className="font-semibold text-sm text-gray-300">Enter your secret message</div>
            <Textarea
              placeholder="Enter text to encode"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px] bg-gray-800 border-gray-700"
            />
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-sm text-gray-300">Pick an emoji carrier</div>
            <div className="bg-gray-800 border border-gray-700 rounded-md p-3">
              <EmojiSelector
                onEmojiSelect={setSelectedEmoji}
                selectedEmoji={selectedEmoji}
                emojiList={EMOJI_LIST}
                disabled={false}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-sm text-gray-300">Or pick a letter carrier</div>
            <div className="bg-gray-800 border border-gray-700 rounded-md p-3">
              <EmojiSelector
                onEmojiSelect={setSelectedEmoji}
                selectedEmoji={selectedEmoji}
                emojiList={ALPHABET_LIST}
                disabled={false}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-sm text-gray-300">Or pick a number carrier</div>
            <div className="bg-gray-800 border border-gray-700 rounded-md p-3">
              <EmojiSelector
                onEmojiSelect={setSelectedEmoji}
                selectedEmoji={selectedEmoji}
                emojiList={NUMBER_LIST}
                disabled={false}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-sm text-gray-300">
              Encoded message with {selectedEmoji}
            </div>
            <div className="relative">
              <Textarea
                placeholder="Encoded output"
                value={outputText}
                readOnly
                className="min-h-[120px] bg-gray-800 border-gray-700"
              />
              {outputText && (
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="absolute top-2 right-2"
                  onClick={copyToClipboard}
                >
                  {copied ? "Copied! ✓" : "Copy"}
                </Button>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="decode" className="space-y-4">
          <div className="space-y-2">
            <div className="font-semibold text-sm text-gray-300">Paste the encoded message</div>
            <Textarea
              placeholder="Paste an emoji or text with hidden message to decode"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px] bg-gray-800 border-gray-700"
            />
          </div>

          <div className="space-y-2">
            <div className="font-semibold text-sm text-gray-300">Decoded secret message</div>
            <div className="relative">
              <Textarea
                placeholder="Decoded output"
                value={outputText}
                readOnly
                className="min-h-[120px] bg-gray-800 border-gray-700"
              />
              {outputText && (
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className="absolute top-2 right-2"
                  onClick={copyToClipboard}
                >
                  {copied ? "Copied! ✓" : "Copy"}
                </Button>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {errorText && <div className="text-red-500 text-center">{errorText}</div>}
    </CardContent>
  )
}

"use client"

import { Button } from "@/components/ui/button"

interface EmojiSelectorProps {
  onEmojiSelect: (emoji: string) => void
  disabled: boolean
  selectedEmoji: string
  emojiList: string[]
}

export function EmojiSelector({ onEmojiSelect, disabled, selectedEmoji, emojiList }: EmojiSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-1">
      {emojiList.map((emoji) => (
        <Button
          key={emoji}
          variant="outline"
          className={`w-10 h-10 p-0 text-lg transition-all hover:scale-110 hover:bg-gray-700 disabled:opacity-50
            ${emoji === selectedEmoji 
              ? "bg-gray-700 border-cyan-500 shadow-sm shadow-cyan-900 ring-1 ring-cyan-500" 
              : "bg-gray-800 border-gray-700"}`}
          onClick={() => onEmojiSelect(emoji)}
          disabled={disabled}
        >
          {emoji}
        </Button>
      ))}
    </div>
  )
}


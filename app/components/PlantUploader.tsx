'use client'

import { useState, useRef } from 'react'

interface PlantUploaderProps {
  onUpload: (file: File) => void
}

export default function PlantUploader({ onUpload }: PlantUploaderProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
        onUpload(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="card">
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
      
      <button 
        onClick={triggerFileInput}
        className="upload-btn"
      >
        Upload Plant Image
      </button>
      
      {previewImage && (
        <img 
          src={previewImage} 
          alt="Uploaded plant" 
          className="preview-image"
        />
      )}
    </div>
  )
}
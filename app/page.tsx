'use client'

import { useState } from 'react'
import Image from 'next/image'
import PlantUploader from './components/PlantUploader'
import PlantDetails from './components/PlantDetails'
import './globals.css'

export default function Home() {
  const [plantDetails, setPlantDetails] = useState<{
    name?: string;
    description?: string;
    scientificName?: string;
  } | null>(null)
  
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handlePlantIdentification = async (file: File) => {
    try {
      // Create a preview of the uploaded image
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      
      const formData = new FormData()
      formData.append('image', file)

      // Simulate API call (replace with your actual API endpoint)
      setTimeout(() => {
        // Mock response
        const mockResult = {
          name: "Cape Daisy",
          scientificName: "Osteospermum",
          description: "A flowering plant in the daisy family with vibrant purple petals and a dark center."
        }
        setPlantDetails(mockResult)
      }, 1500)

      // Uncomment this for actual API implementation
      /*
      const response = await fetch('/api/identify', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Plant identification failed')
      }

      const result = await response.json()
      setPlantDetails(result)
      */

    } catch (error) {
      console.error('Plant identification error:', error)
    }
  }

  return (
    <div className="container">
      {/* Hero Section with Image */}
      <div className="hero-section">
      
        <h1 className="app-title">
          Plant Identifier
        </h1>
        <p className="app-subtitle">
          Identify plants instantly with AI
        </p>
      </div>
      
      {/* Upload Section - Only show when no preview */}
      {!previewImage && (
        <PlantUploader onUpload={handlePlantIdentification} />
      )}
      
      {/* Results Section - Only ONE instance of the image */}
      {previewImage && (
        <div className="results-layout">
          <div className="results-container">
            <div className="image-container">
              <img 
                src={previewImage} 
                alt="Uploaded plant" 
                className="preview-image" 
              />
              
              {/* Add a reset button below the image */}
              <button 
                className="reset-btn"
                onClick={() => {
                  setPreviewImage(null);
                  setPlantDetails(null);
                }}
              >
                Identify Another Plant
              </button>
            </div>
            
            <div className="details-container">
              {plantDetails ? (
                <PlantDetails 
                  name={plantDetails.name}
                  description={plantDetails.description}
                  scientificName={plantDetails.scientificName}
                />
              ) : (
                <div className="loading-details">
                  <p>Analyzing your plant...</p>
                  <div className="loading-spinner"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '')

console.log('Google API Key:', process.env.GOOGLE_API_KEY); // For debugging


export async function POST(request: NextRequest) {
  try {
    // Get the image file from the request
    const formData = await request.formData()
    const file = formData.get('image') as File

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString('base64')

    // Use Gemini to identify the plant
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    
    const prompt = "Identify this plant. Provide the common name, scientific name, and a brief description of its characteristics, habitat, and care requirements."

    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [
          { text: prompt },
          { inlineData: { 
            mimeType: 'image/jpeg', 
            data: base64Image 
          }}
        ]
      }]
    })

    const response = result.response
    const text = response.text()

    // Parse the response (you might need to improve parsing logic)
    const [name, scientificName, description] = text.split('\n').map(line => line.replace(/^[*\d\s]+/, '').trim())

    return NextResponse.json({
      name,
      scientificName,
      description
    })
  } catch (error) {
    console.error('Plant identification error:', error)
    return NextResponse.json({ 
      error: 'Failed to identify plant' 
    }, { status: 500 })
  }
}
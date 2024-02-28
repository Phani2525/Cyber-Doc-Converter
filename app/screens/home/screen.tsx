import React, { useState } from 'react'
import { YStack, Button, Text } from 'ui'
import FileUploader from 'app/components/FileUploader'

export const HomeScreen = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [outputFormat, setOutputFormat] = useState<string>('pdf')
  const [convertedFileUrl, setConvertedFileUrl] = useState<string | null>(null)

  const handleFileUpload = (file: File) => {
    setSelectedFile(file)
    setConvertedFileUrl(null) // Reset converted file URL if a new file is uploaded
  }

  const handleConvert = async () => {
    if (selectedFile) {
      // Simulated conversion process (replace with actual logic)
      const convertedUrl = await simulateConversion(selectedFile, outputFormat)
      setConvertedFileUrl(convertedUrl)
    }
  }

  const handleDownload = () => {
    if (convertedFileUrl) {
      // Simulated download process (replace with actual logic)
      simulateDownload(convertedFileUrl)
    }
  }

  // Simulated conversion process (replace with actual logic)
  const simulateConversion = async (file: File, format: string): Promise<string> => {
    // Simulate conversion process (e.g., using FileReader for simplicity)
    return new Promise<string>((resolve) => {
      const reader = new FileReader()
      reader.onload = () => {
        // Simulate server call or processing to convert the file
        // In real-world scenario, you'd use libraries or APIs for conversion
        setTimeout(() => {
          // For demonstration, return a data URL
          resolve(reader.result as string)
        }, 2000) // Simulate delay
      }
      reader.readAsDataURL(file)
    })
  }

  // Simulated download process (replace with actual logic)
  const simulateDownload = (url: string) => {
    // Simulate download by creating a temporary link
    const a = document.createElement('a')
    a.href = url
    a.download = `converted.${outputFormat}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <YStack>
      <Text fontSize="$10">Document Converter</Text>
      <FileUploader onFileUpload={handleFileUpload} />
      <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)}>
        <option value="pdf">PDF</option>
        <option value="docx">Word</option>
        {/* Add more options for supported formats */}
      </select>
      <Button disabled={!selectedFile} onPress={handleConvert}>
        Convert
      </Button>
      {convertedFileUrl && <Button onPress={handleDownload}>Download Converted File</Button>}
    </YStack>
  )
}

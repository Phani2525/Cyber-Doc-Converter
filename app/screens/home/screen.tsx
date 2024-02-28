import React, { useState } from 'react'
import { YStack, Button, Text } from 'ui'
import FileUploader from 'app/components/FileUploader'
import { ImageBackground } from 'react-native'

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
    // <ImageBackground source="/homebackground.png" style={{ flex: 1 }}>
    <YStack space="$4">
      <YStack marginTop="$8" ai="center" space="$2">
        <Text fontStyle="italic" fontWeight="700" fontSize="$10">
          Welcome To Document Converter
        </Text>
      </YStack>
      <YStack marginTop="$10" ai="center" space="$4">
        <FileUploader onFileUpload={handleFileUpload} />
      </YStack>
      <YStack marginTop="$6" ai="center" space="$2">
        <select
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.target.value)}
          style={{ width: '10%', height: '40px', fontSize: '16px' }}
        >
          <option value="pdf">PDF</option>
          <option value="docx">Word</option>
          <option value="txt">Text</option>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
          <option value="svg">SVG</option>
          <option value="mp3">MP3</option>
          <option value="mp4">MP4</option>
          <option value="jpg">JPG</option>
          {/* Add more options for supported formats */}
        </select>
      </YStack>
      <YStack ai="center" space="$3">
        <Button width="$10" disabled={!selectedFile} onPress={handleConvert}>
          Convert
        </Button>
      </YStack>
      {convertedFileUrl && (
        <YStack ai="center" space="$2">
          <Button onPress={handleDownload}>Download Converted File</Button>
        </YStack>
      )}
    </YStack>
    // </ImageBackground>
  )
}

import React, { useState } from 'react'
import { YStack, Button, Text, Spinner } from 'ui'
import FileUploader from 'app/components/FileUploader'
import { ImageBackground } from 'react-native'

export const HomeScreen = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [outputFormat, setOutputFormat] = useState<string>('pdf')
  const [convertedFileUrl, setConvertedFileUrl] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState<boolean>(false) // State to manage conversion spinner

  const handleFileUpload = (file: File) => {
    setSelectedFile(file)
    setConvertedFileUrl(null) // Reset converted file URL if a new file is uploaded
  }

  const handleConvert = async () => {
    if (selectedFile) {
      setIsConverting(true) // Start spinner
      const convertedUrl = await simulateConversion(selectedFile, outputFormat)
      setConvertedFileUrl(convertedUrl)
      setIsConverting(false) // Stop spinner once conversion is done
    }
  }

  const handleDownload = () => {
    if (convertedFileUrl) {
      simulateDownload(convertedFileUrl)
    }
  }

  const simulateConversion = async (file: File, format: string): Promise<string> => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader()
      reader.onload = () => {
        setTimeout(() => {
          resolve(reader.result as string)
        }, 2000) // Simulate delay
      }
      reader.readAsDataURL(file)
    })
  }

  const simulateDownload = (url: string) => {
    const a = document.createElement('a')
    a.href = url
    a.download = `converted.${outputFormat}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <YStack space="$4">
      <YStack marginTop="$8" ai="center" space="$2">
        <Text fontStyle="italic" fontWeight="700" fontSize="$10">
          Welcome To Cyber-Doc-Converter
        </Text>{' '}
        <Text fontStyle="italic">Convert Your Document to Any Format You Want..!!</Text>
      </YStack>

      <YStack marginTop="$10" ai="center" space="$4">
        <Text>Click here to upload</Text>
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
        </select>
      </YStack>
      <YStack ai="center" space="$3">
        <Button width="$10" disabled={!selectedFile || isConverting} onPress={handleConvert}>
          Convert
        </Button>
        {isConverting && <Spinner size="large" />}
      </YStack>
      {convertedFileUrl && (
        <YStack ai="center" space="$2">
          <Button onPress={handleDownload}>Download Converted File</Button>
        </YStack>
      )}
    </YStack>
  )
}

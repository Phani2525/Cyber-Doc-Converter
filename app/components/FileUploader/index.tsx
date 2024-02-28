import React, { useState } from 'react'
import { Button, Input, YStack } from 'ui'

export interface FileUploaderProps {
  onFileUpload: (file: File) => void
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      onFileUpload(selectedFile)
    }
  }

  return (
    <YStack>
      <input type="file" onChange={handleFileChange} />
      <Button onPress={handleUpload} disabled={!selectedFile}>
        Upload
      </Button>
    </YStack>
  )
}

export default FileUploader

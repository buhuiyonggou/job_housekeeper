"use client";
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Box, Button, Flex, Image, useToast, Input, Heading, Text } from '@chakra-ui/react';
import { uploadFile, getFile } from '../src/utils/firebaseStorage';
import fallbackImage from './_assets/default-fallback-image.png';    
import axios from 'axios';

const Resume = () => {
  const { data: session, status } = useSession();
  const [file, setFile] = useState<File | null>();
  const [pdfUrl, setPdfUrl] = useState<string | null>();
  const toast = useToast();
    const router = useRouter();

  useEffect(() => {
    const fetchResume = async () => {
      if (session?.user?.email) {
        try {
          const response = await axios.get('/api/resume');
          if (response.data.resume) {
            setPdfUrl(response.data.resume);
          }
        } catch (error) {
          console.error('Error fetching resume:', error);
        }
      }
    };
  
    fetchResume();
  }, [session?.user?.email]);

  const handleUploadComplete = (url: string) => {
    setPdfUrl(url);
    toast({
      title: 'Upload successful.',
      description: 'Your resume has been uploaded.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleUploadError = (error: any) => {
    console.error('Upload error:', error);
    toast({
      title: 'Upload failed.',
      description: 'There was an error uploading your resume.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !session?.user?.email) return;
  
    try {
      const path = await uploadFile(file, 'resumes', session.user.email);
      const downloadURL = await getFile(path);
  
      // Update the file URL using the API route
      await axios.patch('/api/resume', { resumeUrl: downloadURL });
  
      handleUploadComplete(downloadURL);
    } catch (error) {
      handleUploadError(error);
    }
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  return (
    <Box maxW="xl" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="md" boxShadow="lg">
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        Upload Your Resume
      </Heading>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" alignItems="center">
          <Input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            p={1}
            mb={6}
            borderColor="gray.300"
            _hover={{ borderColor: 'gray.500' }}
          />
          <Button type="submit" colorScheme="teal" mb={4}>
            Upload Resume
          </Button>
        </Flex>
      </form>
      {pdfUrl ? (
        <Box width="100%" height="600px" border="1px solid #ccc" mt={2} borderRadius="md" boxShadow="md">
          <iframe src={pdfUrl} width="100%" height="100%" style={{ border: 'none', borderRadius: 'md' }} />
        </Box>
      ) : (
        <Box width="100%" height="600px" border="1px solid #ccc" mt={2} borderRadius="md" boxShadow="md" position="relative">
            <Text textAlign="center" m={4}>You don't have a resume yet</Text>
            <Image src= {fallbackImage.src} alt="Empty Resume" boxSize={{ base: "300px", md: "400px" }} mx="auto" objectFit='cover'/>
        </Box>
      )}
    </Box>
  );
};

export default Resume;
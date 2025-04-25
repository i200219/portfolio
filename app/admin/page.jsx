'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ServicesManager from './components/ServicesManager';
import WorkManager from './components/WorkManager';
import ResumeManager from './components/ResumeManager';

export default function AdminPage() {
  const [cvFile, setCvFile] = useState(null);
  const [currentCv, setCurrentCv] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  
  // Fetch current CV info
  useEffect(() => {
    async function fetchCvInfo() {
      try {
        const response = await fetch('/api/cv');
        if (response.ok) {
          const data = await response.json();
          if (data.filename) {
            setCurrentCv(data);
          }
        }
      } catch (error) {
        console.error('Error fetching CV info:', error);
      }
    }
    
    fetchCvInfo();
  }, []);
  
  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setCvFile(e.target.files[0]);
    }
  };
  
  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!cvFile) {
      setUploadStatus({ type: 'error', message: 'Please select a file to upload' });
      return;
    }
    
    setIsUploading(true);
    setUploadStatus(null);
    
    try {
      const formData = new FormData();
      formData.append('file', cvFile);
      
      const response = await fetch('/api/cv', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload CV');
      }
      
      const data = await response.json();
      setCurrentCv(data);
      setCvFile(null);
      setUploadStatus({ type: 'success', message: 'CV uploaded successfully!' });
    } catch (error) {
      console.error('Error uploading CV:', error);
      setUploadStatus({ type: 'error', message: 'Failed to upload CV' });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this CV?')) return;
    
    try {
      const response = await fetch('/api/cv', {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete CV');
      }
      
      setCurrentCv(null);
      setUploadStatus({ type: 'success', message: 'CV deleted successfully!' });
    } catch (error) {
      console.error('Error deleting CV:', error);
      setUploadStatus({ type: 'error', message: 'Failed to delete CV' });
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-white text-center">
          Admin <span className="text-[#3ba8ae]">Dashboard</span>
        </h1>
        
        <Tabs defaultValue="cv" className="space-y-6">
          <TabsList className="w-full justify-start bg-gray-800/50 p-1 rounded-lg">
            <TabsTrigger 
              value="cv"
              className="data-[state=active]:bg-[#3ba8ae] data-[state=active]:text-white"
            >
              CV
            </TabsTrigger>
            <TabsTrigger 
              value="services"
              className="data-[state=active]:bg-[#3ba8ae] data-[state=active]:text-white"
            >
              Services
            </TabsTrigger>
            <TabsTrigger 
              value="work"
              className="data-[state=active]:bg-[#3ba8ae] data-[state=active]:text-white"
            >
              Work
            </TabsTrigger>
            <TabsTrigger 
              value="resume"
              className="data-[state=active]:bg-[#3ba8ae] data-[state=active]:text-white"
            >
              Resume
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cv">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">CV Management</CardTitle>
                <CardDescription className="text-gray-400">Upload or update your CV document</CardDescription>
              </CardHeader>
              <CardContent>
                {uploadStatus && (
                  <div className={`p-4 mb-4 rounded-md ${
                    uploadStatus.type === 'success' 
                      ? 'bg-green-500/20 border border-green-500 text-green-500' 
                      : 'bg-red-500/20 border border-red-500 text-red-500'
                  }`}>
                    {uploadStatus.message}
                  </div>
                )}
                
                {currentCv && (
                  <div className="mb-6 p-4 bg-gray-700/50 rounded-md border border-gray-600">
                    <h3 className="font-medium mb-2 text-white">Current CV</h3>
                    <p className="text-gray-300"><strong>Filename:</strong> {currentCv.originalName}</p>
                    <p className="text-gray-300"><strong>Uploaded:</strong> {new Date(currentCv.uploadDate).toLocaleString()}</p>
                    <div className="mt-2 flex gap-3">
                      <a 
                        href={currentCv.path} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#3ba8ae] hover:text-[#3ba8ae]/80 inline-block"
                      >
                        View CV
                      </a>
                      <button 
                        onClick={handleDelete}
                        className="text-red-400 hover:text-red-500 inline-block"
                      >
                        Delete CV
                      </button>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleUpload} className="space-y-4">
                  <div>
                    <Input 
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleFileChange}
                      className="cursor-pointer bg-gray-700 border-gray-600 text-white file:bg-[#3ba8ae] file:text-white file:border-0"
                    />
                    <p className="text-sm text-gray-400 mt-1">Accepted formats: PDF, DOC, DOCX</p>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isUploading || !cvFile}
                    className="bg-[#3ba8ae] hover:bg-[#3ba8ae]/80 text-white"
                  >
                    {isUploading ? 'Uploading...' : 'Upload CV'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Services Management</CardTitle>
                <CardDescription className="text-gray-400">Manage your offered services</CardDescription>
              </CardHeader>
              <CardContent>
                <ServicesManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="work">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Work Management</CardTitle>
                <CardDescription className="text-gray-400">Manage your portfolio projects</CardDescription>
              </CardHeader>
              <CardContent>
                <WorkManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resume">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Resume Management</CardTitle>
                <CardDescription className="text-gray-400">Manage your resume sections</CardDescription>
              </CardHeader>
              <CardContent>
                <ResumeManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
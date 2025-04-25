'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, Trash2, Plus, Upload } from 'lucide-react';

export default function WorkManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    github: '',
    demo: '',
    technologies: [],
    category: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/work');
      if (!response.ok) throw new Error('Failed to fetch projects');
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = currentProject ? 'PUT' : 'POST';
      const url = '/api/work';
      const body = currentProject 
        ? { id: currentProject.id, ...formData }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error('Failed to save project');
      
      await fetchProjects();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const response = await fetch('/api/work', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (!response.ok) throw new Error('Failed to delete project');
      
      await fetchProjects();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (project) => {
    setCurrentProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      image: project.image,
      github: project.github,
      demo: project.demo,
      technologies: project.technologies,
      category: project.category
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setCurrentProject(null);
    setFormData({
      name: '',
      description: '',
      image: '',
      github: '',
      demo: '',
      technologies: [],
      category: ''
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={resetForm} className="mb-4 bg-[#3ba8ae] hover:bg-[#3ba8ae]/80 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add New Project
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md bg-[#1c1c1c] border border-[#3ba8ae]/20 overflow-y-auto max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-white">
              {currentProject ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block mb-1 text-white/70 text-sm">Project Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="w-full bg-[#1c1c1c]/80 border border-[#3ba8ae]/20 rounded-lg p-2 text-white 
                focus:outline-none focus:ring-2 focus:ring-[#3ba8ae]/50 focus:border-[#3ba8ae]
                placeholder:text-white/50 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block mb-1 text-white/70 text-sm">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                className="w-full bg-[#1c1c1c]/80 border border-[#3ba8ae]/20 rounded-lg p-2 text-white 
                focus:outline-none focus:ring-2 focus:ring-[#3ba8ae]/50 focus:border-[#3ba8ae]
                placeholder:text-white/50 transition-all min-h-[80px] resize-y text-sm"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1 text-white/70 text-sm">Image URL</label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  required
                  className="w-full bg-[#1c1c1c]/80 border border-[#3ba8ae]/20 rounded-lg p-2 text-white 
                  focus:outline-none focus:ring-2 focus:ring-[#3ba8ae]/50 focus:border-[#3ba8ae]
                  placeholder:text-white/50 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block mb-1 text-white/70 text-sm">Category</label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                  className="w-full bg-[#1c1c1c]/80 border border-[#3ba8ae]/20 rounded-lg p-2 text-white 
                  focus:outline-none focus:ring-2 focus:ring-[#3ba8ae]/50 focus:border-[#3ba8ae]
                  placeholder:text-white/50 transition-all text-sm"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1 text-white/70 text-sm">GitHub URL</label>
                <Input
                  value={formData.github}
                  onChange={(e) => setFormData({...formData, github: e.target.value})}
                  required
                  className="w-full bg-[#1c1c1c]/80 border border-[#3ba8ae]/20 rounded-lg p-2 text-white 
                  focus:outline-none focus:ring-2 focus:ring-[#3ba8ae]/50 focus:border-[#3ba8ae]
                  placeholder:text-white/50 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block mb-1 text-white/70 text-sm">Demo URL</label>
                <Input
                  value={formData.demo}
                  onChange={(e) => setFormData({...formData, demo: e.target.value})}
                  required
                  className="w-full bg-[#1c1c1c]/80 border border-[#3ba8ae]/20 rounded-lg p-2 text-white 
                  focus:outline-none focus:ring-2 focus:ring-[#3ba8ae]/50 focus:border-[#3ba8ae]
                  placeholder:text-white/50 transition-all text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block mb-1 text-white/70 text-sm">Technologies (comma-separated)</label>
              <Input
                value={formData.technologies.join(', ')}
                onChange={(e) => setFormData({
                  ...formData, 
                  technologies: e.target.value.split(',').map(tech => tech.trim())
                })}
                required
                className="w-full bg-[#1c1c1c]/80 border border-[#3ba8ae]/20 rounded-lg p-2 text-white 
                focus:outline-none focus:ring-2 focus:ring-[#3ba8ae]/50 focus:border-[#3ba8ae]
                placeholder:text-white/50 transition-all text-sm"
              />
            </div>
            
            <div className="flex justify-end gap-2 mt-4 sticky bottom-0 pt-2 bg-[#1c1c1c]">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                className="bg-transparent border border-[#3ba8ae] text-[#3ba8ae] hover:bg-[#3ba8ae]/10
                font-medium py-1 px-3 rounded-lg transition-all duration-300 text-sm"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-[#3ba8ae] hover:bg-[#3ba8ae]/80 text-white font-medium py-1 px-3 rounded-lg
                transition-all duration-300 flex items-center justify-center gap-2 text-sm"
              >
                {currentProject ? 'Update' : 'Create'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="p-4 bg-[#1c1c1c] border border-[#3ba8ae]/20 hover:border-[#3ba8ae]/40 transition-all">
            <div className="flex items-start gap-4">
              <img 
                src={project.image} 
                alt={project.name} 
                className="w-32 h-24 object-cover rounded-md border border-[#3ba8ae]/20"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{project?.name}</h3>
                <p className="text-sm text-white/70">{project.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-[#3ba8ae]/10 border border-[#3ba8ae]/20 rounded-full text-xs text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex gap-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-[#3ba8ae] hover:text-[#3ba8ae]/80 transition-all"
                  >
                    GitHub
                  </a>
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-[#3ba8ae] hover:text-[#3ba8ae]/80 transition-all"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEdit(project)}
                  className="bg-transparent border border-[#3ba8ae]/20 hover:bg-[#3ba8ae]/10 text-[#3ba8ae]"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(project.id)}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
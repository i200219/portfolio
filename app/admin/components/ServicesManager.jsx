'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, Trash2, Plus } from 'lucide-react';

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [formData, setFormData] = useState({
    text: '',
    description: '',
    path: '',
    icon: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      setServices(data.services || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = currentService ? 'PUT' : 'POST';
      const url = '/api/services';
      const body = currentService 
        ? { id: currentService.id, ...formData }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error('Failed to save service');
      
      await fetchServices();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
      const response = await fetch('/api/services', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (!response.ok) throw new Error('Failed to delete service');
      
      await fetchServices();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (service) => {
    setCurrentService(service);
    setFormData({
      text: service.text,
      description: service.description,
      path: service.path,
      icon: service.icon
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setCurrentService(null);
    setFormData({
      text: '',
      description: '',
      path: '',
      icon: ''
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Manage Services</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={resetForm}
              className="bg-[#3ba8ae] hover:bg-[#3ba8ae]/80 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-[#1c1c1c] border border-[#3ba8ae]/20 overflow-y-auto max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="text-white">
                {currentService ? 'Edit Service' : 'Add New Service'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block mb-1 text-white/70 text-sm">Title</label>
                <Input
                  value={formData.text}
                  onChange={(e) => setFormData({...formData, text: e.target.value})}
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
              <div>
                <label className="block mb-1 text-white/70 text-sm">Path</label>
                <Input
                  value={formData.path}
                  onChange={(e) => setFormData({...formData, path: e.target.value})}
                  required
                  className="w-full bg-[#1c1c1c]/80 border border-[#3ba8ae]/20 rounded-lg p-2 text-white 
                  focus:outline-none focus:ring-2 focus:ring-[#3ba8ae]/50 focus:border-[#3ba8ae]
                  placeholder:text-white/50 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block mb-1 text-white/70 text-sm">Icon (emoji)</label>
                <Input
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
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
                  className="bg-[#3ba8ae] hover:bg-[#3ba8ae]/80 text-white
                  font-medium py-1 px-3 rounded-lg transition-all duration-300 text-sm"
                >
                  {currentService ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id} className="p-4 bg-[#1c1c1c]/80 border border-[#3ba8ae]/20 rounded-lg hover:border-[#3ba8ae]/50 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{service.text}</h3>
                <p className="text-sm text-white/70">{service.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-2xl">{service.icon}</span>
                  <span className="text-sm text-[#3ba8ae]">{service.path}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEdit(service)}
                  className="bg-transparent border border-[#3ba8ae]/20 text-[#3ba8ae] hover:bg-[#3ba8ae]/10 h-8 w-8"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(service.id)}
                  className="bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 h-8 w-8"
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
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, Plus } from 'lucide-react';

const SECTIONS = ['experience', 'education', 'skills', 'certifications', 'languages'];

export default function ResumeManager() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [selectedSection, setSelectedSection] = useState(SECTIONS[0]);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    date: '',
    section: SECTIONS[0]
  });

  useEffect(() => {
    fetchEntries();
  }, [selectedSection]);

  const fetchEntries = async () => {
    try {
      const response = await fetch(`/api/resume?section=${selectedSection}`);
      if (!response.ok) throw new Error('Failed to fetch entries');
      const data = await response.json();
      setEntries(data.entries || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = currentEntry ? 'PUT' : 'POST';
      const url = '/api/resume';
      const body = currentEntry 
        ? { id: currentEntry.id, ...formData }
        : { ...formData, section: selectedSection };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error('Failed to save entry');
      
      await fetchEntries();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;
    
    try {
      const response = await fetch('/api/resume', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (!response.ok) throw new Error('Failed to delete entry');
      
      await fetchEntries();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (entry) => {
    setCurrentEntry(entry);
    setFormData({
      title: entry.title,
      subtitle: entry.subtitle,
      description: entry.description,
      date: entry.date,
      section: entry.section
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setCurrentEntry(null);
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      date: '',
      section: selectedSection
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <Select value={selectedSection} onValueChange={setSelectedSection}>
          <SelectTrigger className="w-[200px] bg-[#1c1c1c]/80 border border-[#3ba8ae]/20 rounded-lg text-white">
            <SelectValue placeholder="Select section" />
          </SelectTrigger>
          <SelectContent className="bg-[#1c1c1c] border border-[#3ba8ae]/20 text-white">
            {SECTIONS.map(section => (
              <SelectItem key={section} value={section} className="hover:bg-[#3ba8ae]/10 focus:bg-[#3ba8ae]/10">
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={resetForm}
              className="bg-[#3ba8ae] hover:bg-[#3ba8ae]/80 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md bg-[#1c1c1c] border border-[#3ba8ae]/20 overflow-y-auto max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="text-white">
                {currentEntry ? 'Edit Entry' : 'Add New Entry'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block mb-1 text-white/70 text-sm">Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  className="w-full bg-[#1c1c1c]/80 border border-[#3ba8ae]/20 rounded-lg p-2 text-white 
                  focus:outline-none focus:ring-2 focus:ring-[#3ba8ae]/50 focus:border-[#3ba8ae]
                  placeholder:text-white/50 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block mb-1 text-white/70 text-sm">Subtitle</label>
                <Input
                  value={formData.subtitle}
                  onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
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
                <label className="block mb-1 text-white/70 text-sm">Date</label>
                <Input
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
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
                  {currentEntry ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {entries.map((entry) => (
          <Card key={entry.id} className="p-4 bg-[#1c1c1c] border border-[#3ba8ae]/20 hover:border-[#3ba8ae]/40 transition-all">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{entry.title}</h3>
                {entry.subtitle && (
                  <p className="text-sm text-white/70">{entry.subtitle}</p>
                )}
                {entry.date && (
                  <p className="text-sm text-[#3ba8ae]/80">{entry.date}</p>
                )}
                <p className="mt-2 text-white/80">{entry.description}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleEdit(entry)}
                  className="bg-transparent border border-[#3ba8ae]/20 hover:bg-[#3ba8ae]/10 text-[#3ba8ae]"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(entry.id)}
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
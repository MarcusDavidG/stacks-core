'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ImageUpload from '@/components/ImageUpload';
import { Plus } from 'lucide-react';

interface CreateListingFormProps {
  onCreateListing?: (data: {
    name: string;
    description: string;
    price: number;
    duration: number;
    imageUrl?: string;
  }) => void;
}

export default function CreateListingForm({ onCreateListing }: CreateListingFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    imageUrl: '',
  });

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Item name must be at least 3 characters';
    } else if (formData.name.length > 64) {
      newErrors.name = 'Item name must be less than 64 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    } else if (formData.description.length > 256) {
      newErrors.description = 'Description must be less than 256 characters';
    }

    const price = parseFloat(formData.price);
    if (!formData.price || isNaN(price)) {
      newErrors.price = 'Valid price is required';
    } else if (price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    } else if (price > 1000000) {
      newErrors.price = 'Price is too high';
    }

    const duration = parseInt(formData.duration);
    if (!formData.duration || isNaN(duration)) {
      newErrors.duration = 'Valid duration is required';
    } else if (duration < 1) {
      newErrors.duration = 'Duration must be at least 1 day';
    } else if (duration > 365) {
      newErrors.duration = 'Duration cannot exceed 365 days';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!onCreateListing) return;

    setIsSubmitting(true);
    try {
      const price = parseFloat(formData.price) * 1000000; // Convert to microSTX
      const duration = parseInt(formData.duration) * 144; // Convert days to blocks (approx 10 min per block)

      await onCreateListing({
        name: formData.name,
        description: formData.description,
        price,
        duration,
        imageUrl: formData.imageUrl,
      });

      // Reset form and close dialog
      setFormData({ name: '', description: '', price: '', duration: '', imageUrl: '' });
      setErrors({});
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating listing:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-6">
          <Plus className="h-4 w-4 mr-2" />
          Create Listing
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Listing</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Item Image (Optional)</Label>
            <ImageUpload
              onImageSelect={(url) => handleInputChange('imageUrl', url)}
              currentImage={formData.imageUrl}
            />
            <p className="text-xs text-slate-500 mt-1">
              Add an image to make your listing more attractive
            </p>
          </div>

          <div>
            <Label htmlFor="name">Item Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter item name"
              maxLength={64}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your item"
              maxLength={256}
              rows={3}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
            <p className="text-xs text-slate-500 mt-1">
              {formData.description.length}/256 characters
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (STX) *</Label>
              <Input
                id="price"
                type="number"
                step="0.000001"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="0.00"
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && (
                <p className="text-xs text-red-500 mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <Label htmlFor="duration">Duration (days) *</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                max="365"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                placeholder="30"
                className={errors.duration ? 'border-red-500' : ''}
              />
              {errors.duration && (
                <p className="text-xs text-red-500 mt-1">{errors.duration}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Listing'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

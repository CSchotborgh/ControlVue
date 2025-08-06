/**
 * EDGERACK Cooling Unit Control System - User Login Modal Component
 * 
 * Authentication modal providing secure access to the cooling unit monitoring system.
 * This component handles user credential input and authentication for accessing
 * sensitive system controls and configuration in industrial environments.
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

/**
 * User Login Modal Props Interface
 * 
 * Defines the properties required by the UserLoginModal component
 * for proper modal lifecycle management and parent communication.
 */
interface UserLoginModalProps {
  onClose: () => void;  // Callback function to close the modal
}

export default function UserLoginModal({ onClose }: UserLoginModalProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the login logic
    console.log('Login attempt:', formData);
    // For now, just close the modal
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white text-gray-900">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 border-b pb-4">
            EdgeRack™ Access - Sign In
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Enter your user name and password to access the control dashboard
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium text-gray-900">
              Your user name
            </Label>
            <Input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="user name"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-900">
              Your user ID
            </Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900"
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                name="remember"
                checked={formData.remember}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, remember: checked as boolean }))
                }
              />
              <Label htmlFor="remember" className="text-sm font-medium text-gray-900">
                Remember me
              </Label>
            </div>
            <a href="#" className="text-sm text-blue-700 hover:underline">
              Lost User ID?
            </a>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white"
          >
            Login to control dashboard
          </Button>
          
          <div className="text-sm font-medium text-gray-500 text-center">
            Not registered?{' '}
            <a href="#" className="text-blue-700 hover:underline">
              Create user ID
            </a>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
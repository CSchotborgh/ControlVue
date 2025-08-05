import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white text-slate-900">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            EdgeRack™ Access - Sign In
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username" className="block mb-2 text-sm font-medium">
              Your user name
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="user name or name@company.com"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-slate-50 border-slate-300"
            />
          </div>
          
          <div>
            <Label htmlFor="password" className="block mb-2 text-sm font-medium">
              Your user ID
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-slate-50 border-slate-300"
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                checked={remember}
                onCheckedChange={(checked) => setRemember(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm">
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
          
          <div className="text-sm text-slate-500 text-center">
            Not registered?{" "}
            <a href="#" className="text-blue-700 hover:underline">
              Create user ID
            </a>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

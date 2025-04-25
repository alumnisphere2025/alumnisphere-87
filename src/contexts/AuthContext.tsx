
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export type UserRole = "alumni" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
}

interface StoredUser extends User {
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Get registered users from localStorage
  const getRegisteredUsers = (): StoredUser[] => {
    const users = localStorage.getItem("registeredUsers");
    return users ? JSON.parse(users) : [
      { id: "1", name: "Alex Alumni", email: "alumni@example.com", password: "password", role: "alumni" as UserRole },
      { id: "2", name: "Sam Student", email: "student@example.com", password: "password", role: "student" as UserRole }
    ];
  };

  // Save registered users to localStorage
  const saveRegisteredUsers = (users: StoredUser[]): void => {
    localStorage.setItem("registeredUsers", JSON.stringify(users));
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const registeredUsers = getRegisteredUsers();
      
      const foundUser = registeredUsers.find(
        (u) => u.email === email && u.password === password
      );
      
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        toast({
          title: "Login successful",
          description: `Welcome back, ${userWithoutPassword.name}!`,
        });
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);
    try {
      const registeredUsers = getRegisteredUsers();
      
      // Check if user with this email already exists
      if (registeredUsers.some(user => user.email === email)) {
        throw new Error("User with this email already exists");
      }
      
      // Create new user
      const newUser: StoredUser = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        password,
        role
      };
      
      // Add to registered users
      saveRegisteredUsers([...registeredUsers, newUser]);
      
      // Set current user (without password)
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Account created",
        description: `Welcome to AlumniSphere, ${name}!`,
        className: "bg-gradient-to-r from-green-500 to-emerald-500 border-green-600 text-white",
      });
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        signup
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

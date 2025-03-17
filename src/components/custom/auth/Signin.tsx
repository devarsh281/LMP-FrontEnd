import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

interface user {
  email: string;
  password: string;
}

export function UserAuthForm() {
  const [signIn, setsignIn] = useState<user>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setsignIn((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    
      setsignIn({ email: "", password: "" });

      setTimeout(() => {
        navigate("/dashboard/page");
      }, 2000);
    } catch {
      // Handle errors
    }
  };

  const isPasswordValid = (password: string) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md mx-auto overflow-hidden shadow-2xl bg-white/80 backdrop-filter backdrop-blur-lg">
          <CardHeader className="bg-black text-white p-6">
            <CardTitle className="text-3xl font-bold text-center">
              Welcome Back
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={signIn.email}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={signIn.password}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 p-1 bg-transparent border-none"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="w-5 h-5 text-gray-500" />
                    ) : (
                      <FaEye className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-black text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                  disabled={!isPasswordValid(signIn.password) || !signIn.email}
                >
                  Login
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

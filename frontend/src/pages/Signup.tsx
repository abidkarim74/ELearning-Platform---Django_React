import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postRequest } from "../requests/requests";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [first_name, setFirstname] = useState<string>("");
  const [last_name, setLast_name] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [isEmailTouched, setIsEmailTouched] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isEmailValid = () => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setValidEmail(regex.test(email));
    };

    if (email) {
      isEmailValid();
    } else {
      setValidEmail(false);
    }

    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  }, [email, password, confirmPassword, error]);

  const validateForm = (): string | null => {
    if (!email.trim()) return "Email is required";
    if (!validEmail) return "Please enter a valid email address";
    if (!username.trim()) return "Username is required";
    if (username.length < 3) return "Username must be at least 3 characters";
    if (!first_name.trim()) return "First name is required";
    if (!last_name.trim()) return "Last name is required";
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
    if (!confirmPassword) return "Please confirm your password";
    if (password !== confirmPassword) return "Passwords do not match";
    return null;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      await postRequest('/auth/signup/', {
        username,
        first_name,
        last_name,
        email,
        password
      });

      setSuccess(true);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err: any) {
      // Error handling EXACTLY like Login component
      if (!err.response?.data) {
        setError(err.message);
      } else {
        setError(err.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (!isEmailTouched) {
      setIsEmailTouched(true);
    }
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  // Check if passwords match
  const passwordsMatch = password === confirmPassword;
  const isPasswordTouched = password.length > 0 && confirmPassword.length > 0;

  return (
    <>
      {/* Success Popup Modal */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 animate-scaleIn">
            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h3>
              <p className="text-gray-600">
                Your account has been created successfully. Redirecting to login...
              </p>
            </div>

            {/* Loading Indicator */}
            <div className="mb-6">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-progressBar"></div>
              </div>
              <p className="text-center text-sm text-gray-500 mt-2">
                Redirecting in 2 seconds...
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Go to Login Now
            </button>
          </div>
        </div>
      )}

      {/* Signup Form - Made more compact */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-white to-gray-50 p-4">
        <div className="w-full max-w-md">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex justify-center items-center">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-red-700">{error}</span>
              </div>
            </div>
          )}

          {/* Main Card - More compact */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/80 shadow-xl p-6">
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-grid-light opacity-5 pointer-events-none rounded-2xl"></div>

            {/* Logo/Header Section - More compact */}
            <div className="text-center mb-6">
              <div className="relative mx-auto mb-3 w-fit">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur opacity-30"></div>
                <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm">
                  <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white tracking-tighter">L</span>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-1">Create Account</h2>
              <p className="text-gray-600 text-xs">Join our learning community</p>
            </div>

            {/* Signup Form - More compact spacing */}
            <form onSubmit={handleSignup} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="first_name" className="block text-xs font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    value={first_name}
                    onChange={(e) => setFirstname(e.target.value)}
                    disabled={loading}
                    className="block w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label htmlFor="last_name" className="block text-xs font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                    disabled={loading}
                    className="block w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={() => setIsEmailTouched(true)}
                    disabled={loading}
                    className={`block w-full pl-9 pr-9 py-2 bg-white/50 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed
                      ${isEmailTouched && email
                        ? validEmail
                          ? 'border-green-500 focus:border-green-500 focus:ring-green-500/30'
                          : 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/30'
                      }`}
                    placeholder="you@example.com"
                  />
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <svg className={`h-3.5 w-3.5 transition-colors ${isEmailTouched && email
                      ? validEmail
                        ? 'text-green-500'
                        : 'text-red-500'
                      : 'text-gray-400 group-focus-within:text-blue-500'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>

                  {isEmailTouched && email && (
                    <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
                      {validEmail ? (
                        <svg className="h-3.5 w-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="h-3.5 w-3.5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  )}
                </div>

                {isEmailTouched && email && (
                  <p className={`mt-1 text-xs flex items-center gap-1 ${validEmail ? 'text-green-600' : 'text-red-600'}`}>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      {validEmail ? (
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      ) : (
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      )}
                    </svg>
                    {validEmail ? 'Valid email format' : 'Please enter a valid email address'}
                  </p>
                )}
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-xs font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  className="block w-full px-3 py-2 bg-white/50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="john_doe"
                />
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      className="block w-full pl-9 pr-9 py-2 bg-white/50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="••••••••"
                    />
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                      <svg className="h-3.5 w-3.5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('password')}
                      disabled={loading}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                    >
                      {showPassword ? (
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Minimum 8 characters
                  </p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={loading}
                      className={`block w-full pl-9 pr-9 py-2 bg-white/50 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed
                        ${isPasswordTouched
                          ? passwordsMatch
                            ? 'border-green-500 focus:border-green-500 focus:ring-green-500/30'
                            : 'border-red-500 focus:border-red-500 focus:ring-red-500/30'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/30'
                        }`}
                      placeholder="••••••••"
                    />
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                      <svg className={`h-3.5 w-3.5 transition-colors ${isPasswordTouched
                        ? passwordsMatch
                          ? 'text-green-500'
                          : 'text-red-500'
                        : 'text-gray-400 group-focus-within:text-blue-500'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                      disabled={loading}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                    >
                      {showConfirmPassword ? (
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {isPasswordTouched && (
                    <p className={`mt-1 text-xs flex items-center gap-1 ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        {passwordsMatch ? (
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        ) : (
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        )}
                      </svg>
                      {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  disabled={loading}
                  className="mt-0.5 h-3.5 w-3.5 text-blue-500 border-gray-300 rounded focus:ring-blue-500/30 disabled:opacity-50"
                />
                <label htmlFor="terms" className="ml-2 text-xs text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={!validEmail || !password || !confirmPassword || !username || !first_name || !last_name || loading || !passwordsMatch}
                className={`w-full py-2.5 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 transform transition-all duration-200 shadow hover:shadow-md text-sm flex items-center justify-center
                  ${validEmail && password && confirmPassword && username && first_name && last_name && passwordsMatch && !loading
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 cursor-pointer'
                    : 'bg-gradient-to-r from-gray-400 to-gray-300 cursor-not-allowed'
                  }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>

              {/* Login Link */}
              <div className="text-center pt-3">
                <p className="text-gray-600 text-xs">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Terms Footer */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:text-blue-500 hover:underline transition-colors">Terms</a> and{" "}
              <a href="#" className="text-blue-600 hover:text-blue-500 hover:underline transition-colors">Privacy</a>
            </p>
          </div>
        </div>
      </section>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes progressBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        .animate-progressBar {
          animation: progressBar 2s linear forwards;
        }
      `}</style>
    </>
  );
};

export default Signup;
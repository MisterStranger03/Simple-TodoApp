import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          full_name: fullName,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || "Registration failed");
      } else {
        setSuccess("Registration successful. Redirecting...");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (err) {
      setError("An error occurred during registration.");
    }
  };

  return (
    <>
      <Head>
        <title>Register - TODO App</title>
        <meta name="description" content="Register for the TODO App" />
      </Head>
      <div className="outer">
        <div className="container">
          <h1>Register</h1>
          <form onSubmit={handleRegister} className="register-form">
            <div className="register-fields">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Full Name (optional)"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <button type="submit" className="add-task-button">
              Register
            </button>
          </form>
          {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
          {success && <p style={{ color: "green", marginTop: "1rem" }}>{success}</p>}
        </div>
      </div>
    </>
  );
}

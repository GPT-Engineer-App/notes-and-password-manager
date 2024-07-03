import React, { useState, useEffect } from 'react';

const Passwords = () => {
  const [passwords, setPasswords] = useState([]);
  const [site, setSite] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetch('PasswordServlet')
      .then(response => response.json())
      .then(data => setPasswords(data))
      .catch(error => console.error('Error fetching passwords:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('PasswordServlet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ site, password }),
    })
      .then(response => response.json())
      .then(data => {
        setPasswords([...passwords, data]);
        setSite('');
        setPassword('');
      })
      .catch(error => console.error('Error saving password:', error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Passwords</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="site"
          placeholder="Website"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Save Password
        </button>
      </form>
      <h2 className="text-xl font-semibold mb-2">Saved Passwords</h2>
      <ul id="passwordsList" className="list-disc pl-5">
        {passwords.map((password, index) => (
          <li key={index}>{password.site}: {password.password}</li>
        ))}
      </ul>
    </div>
  );
};

export default Passwords;
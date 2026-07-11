'use client';
import { signup } from '@/lib/action';
import React, { useState } from 'react';

const page = () => {
  const [user, setUser] = useState<{
    username: string;
    email: string;
    password: string;
  }>({
    username: '',
    email: '',
    password: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const { username, email, password } = user;
    const result = await signup(username, email, password);
    console.log(result);
    if (!result.success) {
      let errors = Object.values(result.errors ?? {});
      errors.map((err) => alert(err));
    }
  }

  return (
    <form
      onSubmit={(e) => {
        submit(e);
      }}
    >
      <div className="flex flex-col">
        <input
          name="username"
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="username"
        />
        <input
          name="email"
          onChange={(e) => handleChange(e)}
          type="email"
          placeholder="email"
        />
        <input
          name="password"
          onChange={(e) => handleChange(e)}
          type="password"
          placeholder="password"
        />
        <button type="submit">submit</button>
      </div>
    </form>
  );
};

export default page;

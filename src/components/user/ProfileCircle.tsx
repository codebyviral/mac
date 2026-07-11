import { Input } from '@/components/ui/input';
import { useWindowManager } from '@/hooks/useWindowManager';
import { isEnter } from '@/lib/keyboard';
import { ArrowRightIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import AppleWhiteBg from '@/app/assets/apple-white-bg-modified.png';
import { toast } from 'sonner';
import { log } from 'console';
import { signup } from '@/lib/action';

type ProfileProps = {
  imageUrl: string;
};

type UserProps = {
  username: string;
  email: string;
  password: string;
};

type Step = 'username' | 'email' | 'password';

const ProfileCircle = (props: ProfileProps) => {

  const [passwordDisplay, setPasswordDisplay] = useState<boolean>(false);
  const [rightArrowDisplay, setRightArrowDisplay] = useState<boolean>(false);
  const [step, setStep] = useState<Step>('username');

  const [user, setUser] = useState<UserProps>({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    const { username, email, password } = user

    const result = await signup(username, email, password)
    if (!result.success) {
      let errors = Object.values(result.errors ?? {});
      errors.map((err) => toast(err));
    }
    console.log(result)
  }

  const validate = (step: string): boolean => {
    if (step === 'username') {
      if (user.username.length < 2) {
        toast('Username must have at least 2 characters')
        return false
      }
    } else if (step === 'email') {
      if (!user.email.includes('@') || user.email.length < 4 || user.email.startsWith('@')) {
        toast('Invalid email format')
        return false
      }
    } else if (step === 'password') {
      if (user.password.length < 5) {
        toast('password must have at least 5 characters')
        return false
      }
    }
    return true
  }

  const handleEnter = async () => {
    switch (step) {
      case 'username':
        setRightArrowDisplay(false)
        if (!validate(step)) {
          setStep('username')
          setUser((prev) => ({
            ...prev,
            username: ''
          }))
          return
        }
        setStep('email')
        break;

      case 'email':
        setRightArrowDisplay(false)
        if (!validate(step)) {
          setStep('email')
          setUser((prev) => ({
            ...prev,
            email: ''
          }))
          return
        }
        setStep('password')
        break;

      case 'password':
        if (!validate(step)) {
          setStep('password')
          setUser((prev) => ({
            ...prev,
            password: ''
          }))
          return
        }
        await handleSubmit()
        break
    }
  }

  useEffect(() => {

    const handleKeyPress = async (e: KeyboardEvent) => {
      if (isEnter(e)) {
        if (!passwordDisplay) {
          setPasswordDisplay(true)
          return
        }
      }

    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [passwordDisplay, step]);

  useEffect(() => {
    setStep(step)
  }, [step])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(step)
    setRightArrowDisplay(true)

    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  };

  return (
    <div className="select-none">
      <div className="absolute top-170 items-center left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center">
          <Image
            width={60}
            height={60}
            className="rounded-full"
            quality={100}
            src={AppleWhiteBg}
            draggable={false}
            alt="profile"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
          {passwordDisplay ? (
            <>
              <div className="mt-3 flex flex-col items-center">
                <h1 className="text-white bg-white/10 bg-clip-text text-transparent">
                  {`Create ${step}`}
                </h1>
                <div className="relative w-40 mt-2">
                  <Input
                    name={step}
                    autoComplete='off'
                    value={user[step]}
                    onChange={handleChange}
                    autoFocus
                    type={step === 'password' ? 'password' : 'text'}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleEnter()
                      }
                    }}
                    className="pr-10 h-8 text-white placeholder:text-white focus-visible:ring-0"
                    placeholder={
                      step === "username"
                        ? "Username"
                        : step === "email"
                          ? "Email"
                          : "Password"
                    }
                  />
                  <button
                    className={`${rightArrowDisplay ? 'opacity-100' : 'opacity-0'} absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center h-6 w-6 rounded-full bg-white/20 hover:bg-white/30 transition`}
                  >
                    <ArrowRightIcon className="h-4 w-4 text-white" />
                  </button>
                </div>
                <h2
                  data-cursor="pointer"
                  className="mt-3 text-xs text-center font-bold text-white/60 bg-white/10 bg-clip-text text-transparent whitespace-nowrap"
                >
                  Continue without account
                </h2>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center">
                <h1 className="mt-3 text-white bg-white/10 bg-clip-text text-transparent">
                  Create account
                </h1>
                <h2 className="mt-3 text-xs text-center font-bold text-white/60 bg-white/10 bg-clip-text text-transparent">
                  Touch ID or Enter password
                </h2>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCircle;

import { prisma } from '../utils/data.server';
import bcrypt from 'bcryptjs';
import { createCookieSessionStorage, redirect } from '@remix-run/node';

// eslint-disable-next-line no-undef
const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    httpOnly: true,
    // eslint-disable-next-line no-undef
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET],
  },
});

const createSession = async (id, redirectPath) => {
  const session = await sessionStorage.getSession();
  session.set('userId', id);
  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
};

export const getUserFromSession = async (request) => {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );
  const userId = session.get('userId');

  if (!userId) {
    return null;
  }

  return userId;
};

export const requireUserSession = async (request) => {
  const userId = await getUserFromSession(request);

  if (!userId) {
    return redirect('/login');
  }

  return userId;
};

export const createUser = async (credentials) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: credentials.email,
    },
  });

  if (existingUser) {
    const error = new Error('A user with provided email already exited');
    error.status = 422;
    throw error;
  }

  if (credentials.password !== credentials.confirmPassword) {
    const error = new Error('Password not matching');
    error.status = 401;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(credentials.password, 12);

  const user = await prisma.user.create({
    data: {
      username: credentials.username,
      email: credentials.email,
      password: hashedPassword,
    },
  });

  return createSession(user.id, '/login');
};

export const loginUser = async (credentials) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      email: credentials.email,
    },
  });

  if (!existingUser) {
    const error = new Error('Please check the provided email or password');
    error.status = 401;
    throw error;
  }

  const passwordCheck = await bcrypt.compare(
    credentials.password,
    existingUser.password
  );

  if (!passwordCheck) {
    const error = new Error('Please check the provided email or password');
    error.status = 401;
    throw error;
  }

  return createSession(existingUser.id, '/');
};

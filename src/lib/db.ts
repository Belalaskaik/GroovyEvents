
import { Low, JSONFile } from 'lowdb';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// For ESM, if you need to resolve __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

// Define your types: Club, User, Event, and DatabaseSchema

export type Club = {
  id: number;
  name: string;
  email: string;
  members: number;
  description: string;
  password: string;
};

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

type Event = {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
};

type DatabaseSchema = {
  events: Event[];
  clubs: Club[];
  users: User[];
};

const adapter = new JSONFile<DatabaseSchema>(join(__dirname, 'db.json'));
const db = new Low<DatabaseSchema>(adapter);
// Initialize the database
export async function initializeDatabase(): Promise<void> {
  await db.read();
  db.data ||= { events: [], clubs: [], users: [] };
  await db.write();
}
// Immediately invoke the async function to initialize the database
initializeDatabase();

async function postEvent(newEvent: Omit<Event, 'id'>): Promise<void> {
  await db.read();
  const event: Event = {
    id: db.data.events.length + 1,
    ...newEvent
  };
  db.data.events.push(event);
  await db.write();
}

async function postClub(newClub: Omit<Club, 'id'>): Promise<void> {
  await db.read();
  if (db.data.clubs.some(club => club.email === newClub.email)) {
    throw new Error('A club with this email already exists');
  }
  const club: Club = {
    id: db.data.clubs.length + 1,
    ...newClub
  };
  db.data.clubs.push(club);
  await db.write();
}

async function getEvents(): Promise<Event[]> {
  await db.read();
  return db.data.events;
}

async function createUser(newUser: Omit<User, 'id'>): Promise<void> {
  await db.read();
  const user: User = {
    id: db.data.users.length + 1,
    ...newUser
  };
  db.data.users.push(user);
  await db.write();
}

export { postEvent, getEvents, postClub, createUser };

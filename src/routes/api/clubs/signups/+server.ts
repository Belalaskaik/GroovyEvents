// src/routes/api/clubs/register/+server.ts
import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import type { RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/db'; // Adjust the path according to your project structure

export const POST: RequestHandler = async ({ request }) => {
    // Parse the form data from the request
    const form = await request.formData();
    const name = form.get('name')?.toString();
    const description = form.get('description')?.toString();
    const email = form.get('email')?.toString();
    const password = form.get('password')?.toString();
    const membersString = form.get('members')?.toString();
    const members = membersString ? parseInt(membersString, 10) : NaN;

    // Perform basic validation
    if (!name || !description || !email || !password || isNaN(members)) {
        return json({ error: 'Please provide all required fields' }, { status: 400 });
    }

    // Read the current state from the database
    await db.read();
    db.data ||= { events: [], clubs: [], users: [] };

    // Check if a club with the same email already exists
    const exists = db.data.clubs.some(club => club.email === email);
    if (exists) {
        return json({ error: 'A club with this email already exists' }, { status: 409 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new club object with an auto-incremented id
    const club = {
        id: db.data.clubs.length + 1,
        name,
        description,
        email,
        members,
        password: hashedPassword
    };

    // Add the new club to the array and write it to the database
    db.data.clubs.push(club);
    await db.write();

    // Return a success response
    return json({ message: 'Club registered successfully' }, { status: 201 });
};

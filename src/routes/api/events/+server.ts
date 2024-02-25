import { json } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import { db, postEvent, getEvents } from "$lib/db";

// GET request handler to fetch all events
export const GET: RequestHandler = async () => {
  const events = await getEvents();
  return json({ events });
};

// POST request handler to add a new event
export const POST: RequestHandler = async ({ request }) => {
  try {
    const newEvent = await request.json();
    await postEvent(newEvent);
    return json({
      message: "Event added successfully",
      event: newEvent
    }, { status: 201 });
  } catch (error) {
    return json({ error: "Failed to add event" }, { status: 500 });
  }
};


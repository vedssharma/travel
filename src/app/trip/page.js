"use client";
import { useState } from "react";
import { db } from "@vercel/postgres";

export default function Trip() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  async function addTrip() {
    const client = await db.connect();
    try {
      await client.sql`INSERT INTO trips (title, description, destination, startDate, endDate) VALUES (${title}, ${description}, ${destination}, ${startDate}, ${endDate});`;
    } catch (err) {
      console.error(err);
    }

    const trips = await client.sql`SELECT * FROM trips;`;
    console.log(trips);
  }

  return (
    <>
      <h1>Create a Trip</h1>
      <form onSubmit={() => addTrip()}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="destination">Destination</label>
        <input
          id="destination"
          type="text"
          onChange={(e) => setDestination(e.target.value)}
        />
        <label htmlFor="startDate">Start Date</label>
        <input
          id="startDate"
          type="date"
          onChange={(e) => setStartDate(e.target.valueAsDate)}
        />
        <label htmlFor="endDate">End Date</label>
        <input
          id="endDate"
          type="date"
          onChange={(e) => setEndDate(e.target.valueAsDate)}
        />
        <button type="submit">Create</button>
      </form>
    </>
  );
}

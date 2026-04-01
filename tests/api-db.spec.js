import { test, expect } from '@playwright/test';
import mysql from 'mysql2/promise';
import { faker } from '@faker-js/faker';

test('API + DB Validation', async ({ request }) => {

  // 1️⃣ Generate dynamic data
  const name = faker.person.fullName();
  const job = faker.person.jobTitle();

  // 2️⃣ Call API
  const response = await request.post('http://localhost:3000/api/users', {
    data: { name, job }
  });

  expect(response.status()).toBe(201);

  const responseBody = await response.json();
  const userId = responseBody.id;
  console.log("API Response:", responseBody);
  // 3️⃣ Connect to DB
  const connection = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'playwright_db'
  });

  // 4️⃣ Query DB
  const [rows] = await connection.execute(
    'SELECT * FROM users WHERE id = ?',
    [userId]
  );
    console.log("DB Query Result:", rows);
  // 5️⃣ Validate DB Data
  expect(rows.length).toBe(1);
  expect(rows[0].name).toBe(name);
  expect(rows[0].job).toBe(job);

  await connection.end();
});
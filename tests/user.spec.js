import { test, expect } from '@playwright/test';
import { executeQuery } from '../db/dbUtils.js';
import { faker } from '@faker-js/faker';

test('Validate API response with DB using Faker', async ({ request }) => {

  // 1️⃣ Generate dynamic data
  const dynamicName = faker.person.fullName();
  const dynamicJob = faker.person.jobTitle();

  console.log("Generated:", dynamicName, dynamicJob);

  // 2️⃣ Call API
  const response = await request.post('https://reqres.in/api/users', {
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      name: dynamicName,
      job: dynamicJob
    }
  });

  expect(response.status()).toBe(201);

  const responseBody = await response.json();

  const apiId = parseInt(responseBody.id);
  const apiName = responseBody.name;
  const apiJob = responseBody.job;

  console.log("API Response:", responseBody);

  // 3️⃣ Insert into DB (simulate backend persistence)
  await executeQuery(
    'INSERT INTO users (id, name, job) VALUES (?, ?, ?)',
    [apiId, apiName, apiJob]
  );

  // 4️⃣ Fetch from DB
  const dbResult = await executeQuery(
    'SELECT * FROM users WHERE id = ?',
    [apiId]
  );

  // 5️⃣ Validate API vs DB
  expect(dbResult.length).toBe(1);
  expect(dbResult[0].name).toBe(apiName);
  expect(dbResult[0].job).toBe(apiJob);

});
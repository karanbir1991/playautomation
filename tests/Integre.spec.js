import{test, expect} from '@playwright/test';
import {faker} from '@faker-js/faker';
import {z} from 'zod';
import mysql from 'mysql2/promise';

test.describe('Integration - validation cases for API-UI-DB', () => {
    test('checkuser created by API is present in DB and UI', async ({ request, browser}) => {
        // create user via API
        const name = faker.person.fullName();
        const job = faker.person.jobTitle();
        const response = await request.post('http://localhost:3000/api/users', {
            data: {
                name,
                job
            }
        });
        const body = await response.json();
        const userId = body.id;
        console.log('API response body:', body);
        expect(body.name).toBe(name);
        expect(body.job).toBe(job);
        expect(typeof userId).toBe('number');
        expect(userId).toBeGreaterThan(0);
        expect(response.status()).toBe(201);
        expect(response.statusText()).toBe('Created');
        expect(response.headers()['content-type']).toContain('application/json');
        const UserSchema = z.object({
            id: z.number(),
            name: z.string(),
            job: z.string(),
            createdAt: z.string()
        });
        const result = UserSchema.safeParse(body);
        console.log('Schema validation result:', result);
        expect(result.success).toBe(true);
        // verify user exists in DB
        const connection = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'playwright_db'
        });
        const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [userId]);
        const dbBody = rows[0];
        console.log('User fetched from DB:', dbBody);
        expect(dbBody).not.toBeNull();
        expect(dbBody.name).toBe(name);
        expect(dbBody.job).toBe(job);
        console.log('DB user matches API response:', dbBody.id === userId && dbBody.name === name && dbBody.job === job);
        await connection.end();
        // verify user exists in UI list
         const headedBrowser = await browser.browserType().launch({
        headless: false,    // ← always headed
        slowMo: 600,        // ← slow enough to watch
         });
        const page = await headedBrowser.newPage();
        await page.goto('http://localhost:3000/index.html');
        await page.locator('#viewBtn').click();
        await page.waitForURL('http://localhost:3000/users.html');
        await page.locator('#idSearch').fill(userId.toString());
        const uiname = await page.locator('#userName').textContent();
        const uijob = await page.locator('#userJob').textContent();
        expect(uiname).toBe(name);
        expect(uijob).toBe(job);
        console.log('UI user matches API response:', uiname === name && uijob === job);
        await headedBrowser.close();
     });
    });
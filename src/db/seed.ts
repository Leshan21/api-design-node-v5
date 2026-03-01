import { db } from './connection.ts';
import { users, habits, entries, tags, habitTags } from './schema.ts';

const seed = async () => {
    console.log('🌱 starting database seed....');


    try {
        console.log('clearing existing data...');

        // Clear existing data from the tables
        await db.delete(users).execute();
        await db.delete(habits).execute();
        await db.delete(entries).execute();
        await db.delete(tags).execute();
        await db.delete(habitTags).execute();

        // Insert seed data into the tables
        console.log('creating demo users...');
        const [demoUser] = await db.insert(users).values({
            username: 'demo',
            email: 'demo@app.com',
            password: 'password',
            firstName: 'demo',
            lastName: 'user',
        }).returning();

        // inserting tags
        console.log('creating demo tags...');
        const [healthTag] = await db.insert(tags).values({
            name: 'health',
            color: '#FF0000',
        }).returning();

        // inserting habits
        console.log('creating demo habits...');
        const [exerciseHabit] = await db.insert(habits).values({
            userId: demoUser.id,
            name: 'Exercise',
            description: 'Daily workout routine',
            frequency: 'daily',
            targetCount: 1,
        }).returning();

        // linking habit to tag
        await db.insert(habitTags).values({
            habitsId: exerciseHabit.id,
            tagId: healthTag.id,
        })

        // inserting entries
        console.log('creating demo entries...');

        const today = new Date();
        today.setHours(12, 0, 0, 0); // Set time to noon for consistency

        for(let i = 0; i < 7; i++){
            const date = new Date(today);
            date.setDate(today.getDate() - i); // Set date to today minus i days

            await db.insert(entries).values({
                habitsId: exerciseHabit.id,
                completionDate: date,
                note: `Completed exercise on ${date.toDateString()}`,

            })
        }

        console.log('✅ database seed completed successfully!');
        console.log('user credentials: ');
        console.log(`email: ${demoUser.email}`);
        console.log(`username: ${demoUser.username}`);
        console.log(`password: ${demoUser.password}`);

    } catch (error) {
        console.error('❌ error seeding database:', error);
        process.exit(1); // Exit with failure code
    }
}

if( import.meta.url === `file://${process.argv[1]}`){ // Check if the script is being run directly
    seed()
    .then(() => process.exit(0)) // Exit with success code
    .catch((e) => process.exit(1)); // Exit with failure code
}

export default seed;
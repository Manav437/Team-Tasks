import { MongoClient } from "mongodb";

// A shared MongoDB counter keeps the limit effective across app instances.
const WINDOW_MS = 60_000;
const LIMIT = 5;
let collectionPromise;

async function getCollection() {
    if (!collectionPromise) {
        collectionPromise = (async () => {
            const client = new MongoClient(process.env.DATABASE_URL);
            try {
                await client.connect();
                const collection = client.db().collection("AiSummaryRateLimit");
                await collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
                return collection;
            } catch (error) {
                await client.close();
                throw error;
            }
        })().catch((error) => {
            collectionPromise = undefined;
            throw error;
        });
    }
    return collectionPromise;
}

export async function checkAiRateLimit(userId) {
    const now = Date.now();
    const window = Math.floor(now / WINDOW_MS);
    const expiresAt = new Date((window + 1) * WINDOW_MS);
    const collection = await getCollection();
    const counter = await collection.findOneAndUpdate(
        { _id: `${userId}:${window}` },
        { $inc: { count: 1 }, $setOnInsert: { expiresAt } },
        { upsert: true, returnDocument: "after" },
    );
    return {
        allowed: counter.count <= LIMIT,
        retryAfter: Math.max(1, Math.ceil((expiresAt.getTime() - now) / 1000)),
    };
}

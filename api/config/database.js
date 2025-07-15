const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const connectDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Mongoose Connected");

        if (process.env.NODE_ENV !== 'production') {
            console.log("Borrando colecciones...");
            const collections = await mongoose.connection.db.collections();

            for (let collection of collections) {
                try {
                    await collection.deleteMany({});
                    console.log(`Colección '${collection.collectionName}' vaciada`);
                } catch (err) {
                    console.error(`Error al borrar ${collection.collectionName}:`, err.message);
                }
            }
        }
    } catch (error) {
        console.error("Error conectando a MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDatabase;

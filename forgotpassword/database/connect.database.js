import mongoose from "mongoose";

class Database {
    #connectionString;
    constructor(){
        this.#connectionString = null;
    }

    setDatabaseConfig(connectionString) {
        this.#connectionString = connectionString;
    }

    async connect() {
        try {
            await mongoose.connect(this.#connectionString);
            console.log("Database connected successfully");
        } catch (error) {
            console.error("Database connection failed:", error);
        }
    }

    async disconnect() {
        try {
            await mongoose.disconnect();
            console.log("Database disconnected successfully");
        } catch (error) {
            console.error("Database disconnection failed:", error);
        }
    }

    async pingDatabase() {
        try {
            await mongoose.connection.db.command({ ping: 1 });
            console.log("Database connection is alive");
        } catch (error) {
            console.error("Database connection is not alive:", error);
        }
    }

};


export const database = new Database();
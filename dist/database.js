"use strict";
// import { MongoClient, Db } from 'mongodb'; // Import Db from 'mongodb' package
// import dotenv from 'dotenv';
// dotenv.config();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDatabaseConnection = exports.connectToDatabase = void 0;
// const url = process.env.MONGO_URL;
// if (!url) {
//   throw new Error('MongoDB connection URL (MONGO_URL) is not provided in the environment variables. Make sure to set it in your .env file.');
// }
// const client = new MongoClient(url);
// async function connectToDatabase(): Promise<Db> { // Change return type to Db
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB from the DB.ts');
//     return client.db(); // Return the db instance
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     throw error;
//   }
// }
// async function closeDatabaseConnection(): Promise<void> {
//   try {
//     await client.close();
//     console.log('MongoDB connection closed');
//   } catch (error) {
//     console.error('Error closing MongoDB connection:', error);
//     throw error;
//   }
// }
// process.on('SIGINT', async () => {
//   await closeDatabaseConnection();
//   process.exit(0);
// });
// export { connectToDatabase, closeDatabaseConnection };
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URL;
if (!MONGO_URI) {
    throw new Error('MongoDB connection URL (MONGO_URL) is not provided in the environment variables. Make sure to set it in your .env file.');
}
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(MONGO_URI, {
                dbName: 'epicure',
            });
            console.log('Connected to MongoDB from the DB.ts');
        }
        catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    });
}
exports.connectToDatabase = connectToDatabase;
function closeDatabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.disconnect();
            console.log('MongoDB connection closed');
        }
        catch (error) {
            console.error('Error closing MongoDB connection:', error);
            throw error;
        }
    });
}
exports.closeDatabaseConnection = closeDatabaseConnection;
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield closeDatabaseConnection();
    process.exit(0);
}));

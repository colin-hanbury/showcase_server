import { connect, connection } from 'mongoose';
import { injectable } from 'inversify';
import dotenv from "dotenv";


@injectable()
export class DatabaseConnection {

  public async initConnection(): Promise<void> {
    dotenv.config();

    const dbURL = process.env.MONGODB_URI || "";
    await this.connect(dbURL);
  }

  public async connect(connectionString: string): Promise<void> {
    connect(connectionString);
    connection.on('connected', () => {
    console.log(`mongoose connected`);

    });

    connection.on('error', (err) => {
    console.log(`mongoose connected`);

    });
  }

  public async setAutoReconnect(): Promise<void> {
    const dbURL = process.env.MONGODB_URI || "";
    await this.connect(dbURL);
    connection.on('disconnected', () => {
        console.log(`mongoose disconnected trying to reconnect on ${dbURL}`);
      this.connect(dbURL);
    });
  }

  public async disconnect(): Promise<void> {
    await connection.close();
  }
}
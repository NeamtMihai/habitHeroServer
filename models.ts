// models.ts
import mongoose, { Schema, Document } from "mongoose";

export interface Habit extends Document {
    id: string;
    name: string;
    points: number;
    lastUpdated: Date;
    has24HoursPassed: () => boolean;
}

export interface User extends Document {
    id: string;
    name: string;
    pass: string;
    habits: Habit[];
}

const HabitSchema = new Schema<Habit>({
    id: { type: String, required: true },
    name: { type: String, required: true },
    points: { type: Number, required: true },
    lastUpdated: { type: Date, required: true },
});

HabitSchema.methods.has24HoursPassed = function (): boolean {
    const now = new Date();
    const lastUpdated = new Date(this.lastUpdated);
    now.setHours(0, 0, 0, 0);
    lastUpdated.setHours(0, 0, 0, 0);
    return now > lastUpdated;
};

const UserSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    pass: { type: String, required: true },
    habits: [HabitSchema],
});

export const HabitModel = mongoose.model<Habit>('Habit', HabitSchema);

export const UserModel = mongoose.model<User>("User", UserSchema);

import { Schema, model, Document } from "mongoose";
import { ICourse } from "./Course";
import { IUser } from "./User";

export interface IAnnouncement extends Document {
  title: string; // Title of the announcement
  body: string; // Body/content of the announcement
  audience: // Who should see it
  | "all"
    | "students"
    | "instructors"
    | "course"
    | "year"
    | "department"
    | "custom";

  semester?: string; // Optional: semester (e.g., "Fall 2025")
  course?: ICourse["_id"]; // Optional: if targeted to a specific course
  year?: number; // Optional: if targeted to a specific student year
  department?: string; // Optional: if targeted to a specific department
  observers?: IUser["_id"][]; // Optional: specific users if audience = "custom"

  pinned?: boolean; // Highlight important announcements
  createdBy: IUser["_id"]; // User who created the announcement
  createdAt: Date;
  updatedAt: Date;
}


const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },

    // Audience type
    audience: {
      type: String,
      enum: [
        "all",
        "students",
        "instructors",
        "course",
        "year",
        "department",
        "custom",
      ],
      required: true,
      default: "all",
    },

    // Targeting fields
    semester: { type: String },
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    year: { type: Number },
    department: { type: String },
    observers: [{ type: Schema.Types.ObjectId, ref: "User" }],

    
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    pinned: { type: Boolean, default: false },
  },
  { timestamps: true } // createdAt & updatedAt
);

// indexes to optimize queries
AnnouncementSchema.index({ audience: 1, course: 1, year: 1 });

export const Announcement = model<IAnnouncement>(
  "Announcement",
  AnnouncementSchema
);

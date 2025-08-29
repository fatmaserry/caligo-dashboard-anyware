import { Schema } from "mongoose";
import { User, IUser } from "./User";

export interface IOrganizer extends IUser {
  permissions?: string[];
}

const OrganizerSchema = new Schema<IOrganizer>({
  permissions: [{ type: String }],
});

export const Organizer = User.discriminator<IOrganizer>(
  "Organizer",
  OrganizerSchema
);

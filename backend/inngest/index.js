<<<<<<< HEAD
import { Inngest } from "inngest";
import UserActivation from "../models/UserActivation"; // ensure `.js` is added in ESM
=======
const { Inngest } = require("inngest");
const UserActivation = require("../models/UserActivation");
>>>>>>> e9b758d14a48b25a33e2de7fd487c8e6468c4804

const inngest = new Inngest({ id: "movie-ticket-booking" });

// CREATE
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      image: image_url,
    };

    await UserActivation.create(userData);
  }
);

// UPDATE
const syncUserUpdate = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const updatedData = {
      name: `${first_name} ${last_name}`,
      email: email_addresses[0].email_address,
      image: image_url,
    };

    await UserActivation.findByIdAndUpdate(id, updatedData, { new: true, upsert: true });
  }
);

// DELETE
const syncUserDelete = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    await UserActivation.findByIdAndDelete(id);
  }
);

<<<<<<< HEAD
// ✅ Use ESM export
export {
=======
module.exports = {
>>>>>>> e9b758d14a48b25a33e2de7fd487c8e6468c4804
  inngest,
  syncUserCreation,
  syncUserUpdate,
  syncUserDelete
};

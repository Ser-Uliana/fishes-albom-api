import * as bcrypt from "bcrypt";
import { db } from "../prisma/db";

const run = async () => {
  const users = await db.orm.public.User.all();

  for (const user of users) {
    if (!user.password || user.password.startsWith("$2")) continue;

    const hash = await bcrypt.hash(user.password, 10);
    await db.orm.public.User.where({ id: user.id }).update({ password: hash });
    console.log(`hashed user ${user.id}`);
  }
  console.log("done");
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
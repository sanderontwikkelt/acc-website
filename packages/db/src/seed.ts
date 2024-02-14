import { db } from ".";
import { permission, role } from "./schema/role";
import { settings } from "./schema/settings";

async function main() {
  const actions = ["find", "create", "update", "delete"];
  const entities = ["user", "media", "role", "contact"];

  await db.insert(settings).values({
    name: "Physis",
    email: "sander.mailservice@gmail.com",
  });

  const allPermissions = actions.flatMap((action) =>
    entities.map((entity) => ({
      action,
      type:
        action === "find" ? "read" : action === "delete" ? "delete" : "write", // Here, if you want to map actions to specific operations
      entity,
    })),
  );

  // 2. Create the admin role and associate all permissions
  const adminRole = await db.insert(role).values({
    name: "Admin",
    description: "Administrator with all permissions",
  });
  await db
    .insert(permission)
    .values(allPermissions.map((p) => ({ ...p, role: adminRole })));
}

main().catch((e) => {
  throw e;
});

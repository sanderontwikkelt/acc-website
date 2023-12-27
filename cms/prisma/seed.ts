import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  const actions = ["find", "create", "update", "delete"]
  const entities = [
    "page",
    "user",
    "media",
    "role",
    "category",
    "contact",
    "teacheer",
  ]

  await prisma.settings.create({
    data: {
      name: "Physis",
      email: "sander.mailservice@gmail.com",
    },
  })

  await prisma.header.create({
    data: {
      links: JSON.stringify([]),
    },
  })

  await prisma.footer.create({
    data: {
      title: "Samen kleding maken? Schrijf je in voor de sampledag.",
      navigation: JSON.stringify([]),
      links: JSON.stringify([]),
      socials: JSON.stringify([]),
    },
  })

  const allPermissions = actions.flatMap((action) =>
    entities.map((entity) => ({
      action,
      type:
        action === "find" ? "read" : action === "delete" ? "delete" : "write", // Here, if you want to map actions to specific operations
      entity,
    }))
  )

  // 2. Create the admin role and associate all permissions
  const adminRole = await prisma.role.create({
    data: {
      name: "Admin",
      description: "Administrator with all permissions",
      permissions: {
        create: allPermissions,
      },
    },
  })

  const adminUser = await prisma.user.create({
    data: {
      email: "sanderontwikkelt@gmail.com",
      name: "Admin",
      password: await bcrypt.hash("12341234", 10),
      roles: {
        connect: { id: adminRole.id },
      },
    },
  })

  console.log(`Created admin user with id: ${adminUser.id}`)

  const page = await prisma.page.create({
    data: {
      pathname: "/",
      name: "Home",
      concept: false,
      createdBy: adminUser.id,
      updatedBy: adminUser.id,
      blocks: JSON.stringify([]), // or provide relevant JSON here
    },
  })

  // Create SEO metadata for the page
  await prisma.sEO.create({
    data: {
      title:
        "Physis: Verantwoorde Nederlandse Kledingproductie | Ervaren Atelier & Vakmanschap",
      description:
        "Geproduceerd in Nederland met vakmensen met een vluchtelingenachtergrond. Ontdek onze transparante aanpak in de fashion industry, unieke kledinglijnen en diensten zoals het maken van samples en productie. Samen voor een positieve impact op klimaat, mens en economie.",
      pageId: page.id,
    },
  })
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

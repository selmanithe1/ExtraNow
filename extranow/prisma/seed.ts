import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@extranow.fr" },
    update: {},
    create: {
      email: "admin@extranow.fr",
      name: "Administrateur ExtraNow",
      role: "ADMIN",
    },
  });
  console.log("✅ Admin créé:", admin.email);

  // Seed sample missions
  const missions = [
    {
      company: "Le Grand Bistro",
      type: "Serveur",
      location: "Paris 8ème",
      date: new Date("2024-02-20"),
      amount: 120,
      status: "EN_ATTENTE",
      clientId: admin.id,
    },
    {
      company: "Hôtel Plaza",
      type: "Barman",
      location: "Paris 17ème",
      date: new Date("2024-02-22"),
      amount: 150,
      status: "CONFIRME",
      clientId: admin.id,
    },
    {
      company: "Restaurant La Mer",
      type: "Cuisinier",
      location: "Marseille",
      date: new Date("2024-02-25"),
      amount: 180,
      status: "EN_ATTENTE",
      clientId: admin.id,
    },
  ];

  for (const mission of missions) {
    await prisma.mission.upsert({
      where: {
        id: `seed-${mission.company.replace(/\s/g, "-").toLowerCase()}`,
      },
      update: {},
      create: {
        ...mission,
        id: `seed-${mission.company.replace(/\s/g, "-").toLowerCase()}`,
      },
    });
  }
  console.log("✅ Missions de demo créées");

  // Seed a test extra user
  await prisma.extra.upsert({
    where: { email: "jean.dupont@email.fr" },
    update: {},
    create: {
      name: "Jean Dupont",
      email: "jean.dupont@email.fr",
      phone: "0612345678",
      city: "Paris",
      skills: "Service en salle, Barman, Sommelier",
      experience: "5 ans",
      bio: "Extra expérimenté dans la restauration parisienne.",
      status: "ACTIF",
      rating: 4.8,
    },
  });
  console.log("✅ Extra de demo créé");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

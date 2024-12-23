import { PrismaClient } from "@prisma/client";

export async function getAuthor(id: string) {
  const prisma = new PrismaClient();
  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(id, 10),
    },
  });
  const author = user?.username;
  return author;
}

-- DropIndex
DROP INDEX "Contact_email_createdAt_idx";

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "unread" SET DEFAULT true;

-- CreateIndex
CREATE INDEX "Contact_email_unread_archived_createdAt_idx" ON "Contact"("email", "unread", "archived", "createdAt");

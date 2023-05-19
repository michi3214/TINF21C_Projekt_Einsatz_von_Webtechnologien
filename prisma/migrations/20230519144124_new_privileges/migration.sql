/*
  Warnings:

  - You are about to drop the column `privilege_delete` on the `tbl_author` table. All the data in the column will be lost.
  - You are about to drop the column `privilege_update` on the `tbl_author` table. All the data in the column will be lost.
  - You are about to drop the column `privilege_user_management` on the `tbl_author` table. All the data in the column will be lost.
  - Added the required column `privilege` to the `tbl_author` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tbl_author" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "alias" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "privilege" INTEGER NOT NULL
);
INSERT INTO "new_tbl_author" ("alias", "name", "password", "salt") SELECT "alias", "name", "password", "salt" FROM "tbl_author";
DROP TABLE "tbl_author";
ALTER TABLE "new_tbl_author" RENAME TO "tbl_author";
CREATE UNIQUE INDEX "tbl_author_alias_key" ON "tbl_author"("alias");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

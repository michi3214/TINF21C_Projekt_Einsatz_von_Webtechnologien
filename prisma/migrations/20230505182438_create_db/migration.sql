-- CreateTable
CREATE TABLE "tbl_author" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "alias" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "privilege_user_management" BOOLEAN NOT NULL,
    "privilege_update" BOOLEAN NOT NULL,
    "privilege_delete" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "tbl_content" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "headline" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "modify_timestamp" DATETIME NOT NULL,
    "creation_timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_name" TEXT NOT NULL,
    CONSTRAINT "tbl_content_author_name_fkey" FOREIGN KEY ("author_name") REFERENCES "tbl_author" ("alias") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_author_alias_key" ON "tbl_author"("alias");

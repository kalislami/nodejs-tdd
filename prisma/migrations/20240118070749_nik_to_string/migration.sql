-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "token" TEXT,
    "nik" TEXT,
    "user_type" TEXT NOT NULL,
    "last_login" DATETIME
);
INSERT INTO "new_users" ("last_login", "name", "nik", "password", "token", "user_type", "username") SELECT "last_login", "name", "nik", "password", "token", "user_type", "username" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

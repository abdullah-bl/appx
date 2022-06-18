-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Append" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "no" INTEGER,
    "start" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "internal" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "personId" INTEGER,
    "branchId" INTEGER,
    "unitId" INTEGER,
    "departmentId" INTEGER,
    CONSTRAINT "Append_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Append_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Append_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Append_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Append" ("active", "branchId", "createdAt", "departmentId", "end", "id", "no", "personId", "start", "unitId", "updatedAt") SELECT "active", "branchId", "createdAt", "departmentId", "end", "id", "no", "personId", "start", "unitId", "updatedAt" FROM "Append";
DROP TABLE "Append";
ALTER TABLE "new_Append" RENAME TO "Append";
CREATE UNIQUE INDEX "Append_no_key" ON "Append"("no");
CREATE INDEX "Append_start_end_active_idx" ON "Append"("start", "end", "active");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "color" TEXT NOT NULL DEFAULT '#11d1b5'
);
INSERT INTO "new_User" ("admin", "color", "createdAt", "id", "name", "password", "updatedAt", "username") SELECT "admin", "color", "createdAt", "id", "name", "password", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE INDEX "User_username_admin_idx" ON "User"("username", "admin");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

/*
  Warnings:

  - You are about to drop the column `active` on the `Append` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Append" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
INSERT INTO "new_Append" ("branchId", "createdAt", "departmentId", "end", "id", "internal", "personId", "start", "unitId", "updatedAt") SELECT "branchId", "createdAt", "departmentId", "end", "id", "internal", "personId", "start", "unitId", "updatedAt" FROM "Append";
DROP TABLE "Append";
ALTER TABLE "new_Append" RENAME TO "Append";
CREATE INDEX "Append_start_end_personId_idx" ON "Append"("start", "end", "personId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

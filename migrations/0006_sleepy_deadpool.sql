ALTER TABLE "roles" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "roles" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "users" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;
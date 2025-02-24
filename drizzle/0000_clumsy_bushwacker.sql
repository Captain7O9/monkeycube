CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "times" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"time" serial NOT NULL,
	"date" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"is_plus_two" boolean DEFAULT false NOT NULL,
	"is_dnf" boolean DEFAULT false NOT NULL,
	"scramble" text NOT NULL,
	"event" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	"theme" text DEFAULT 'serika dark' NOT NULL,
	"custom_theme" json DEFAULT '{"--background-color":"#323437","--main-color":"#e2b714","--sub-color":"#646669","--sub-alt-color":"#2c2e31","--text-color":"#d1d0c5","--error-color":"#ca4754","--white":"#fff","--yellow":"#f7c331","--green":"#2ecc71","--blue":"#3498db","--red":"#e74c3c","--orange":"#f39c12"}'::json,
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "times" ADD CONSTRAINT "times_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
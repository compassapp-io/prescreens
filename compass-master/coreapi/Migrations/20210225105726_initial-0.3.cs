using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace coreapi.Migrations
{
    public partial class initial03 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Content",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    title = table.Column<string>(nullable: false),
                    description = table.Column<string>(nullable: false),
                    mediaid = table.Column<long>(nullable: true),
                    meta = table.Column<string>(type: "jsonb", nullable: true),
                    createdAt = table.Column<DateTime>(nullable: false),
                    createdBy = table.Column<string>(nullable: true),
                    updatedAt = table.Column<DateTime>(nullable: false),
                    updatedBy = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Content", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Media",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Media", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Content");

            migrationBuilder.DropTable(
                name: "Media");
        }
    }
}

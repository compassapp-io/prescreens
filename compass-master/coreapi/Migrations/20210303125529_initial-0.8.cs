using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace coreapi.Migrations
{
    public partial class initial08 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Assessments",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    parentid = table.Column<long>(nullable: true),
                    question = table.Column<string>(nullable: false),
                    response = table.Column<string>(nullable: false),
                    type = table.Column<string>(nullable: false),
                    meta = table.Column<string>(type: "jsonb", nullable: true),
                    createdAt = table.Column<DateTime>(nullable: false),
                    createdBy = table.Column<string>(nullable: true),
                    updatedAt = table.Column<DateTime>(nullable: false),
                    updatedBy = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Assessments", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Assessments");
        }
    }
}

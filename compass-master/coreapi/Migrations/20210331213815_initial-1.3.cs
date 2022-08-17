using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace coreapi.Migrations
{
    public partial class initial13 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ContentConsumption",
                columns: table => new
                {
                    id = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    mediaid = table.Column<long>(nullable: false),
                    userid = table.Column<long>(nullable: false),
                    totallength = table.Column<double>(nullable: false),
                    consumptionlength = table.Column<double>(nullable: false),
                    meta = table.Column<string>(type: "jsonb", nullable: true),
                    createdAt = table.Column<DateTime>(nullable: false),
                    createdBy = table.Column<string>(nullable: true),
                    updatedAt = table.Column<DateTime>(nullable: false),
                    updatedBy = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentConsumption", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContentConsumption");
        }
    }
}

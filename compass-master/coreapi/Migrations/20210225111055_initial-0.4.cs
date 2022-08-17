using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace coreapi.Migrations
{
    public partial class initial04 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "createdAt",
                table: "Media",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "createdBy",
                table: "Media",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "meta",
                table: "Media",
                type: "jsonb",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "updatedAt",
                table: "Media",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "updatedBy",
                table: "Media",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "createdAt",
                table: "Media");

            migrationBuilder.DropColumn(
                name: "createdBy",
                table: "Media");

            migrationBuilder.DropColumn(
                name: "meta",
                table: "Media");

            migrationBuilder.DropColumn(
                name: "updatedAt",
                table: "Media");

            migrationBuilder.DropColumn(
                name: "updatedBy",
                table: "Media");
        }
    }
}

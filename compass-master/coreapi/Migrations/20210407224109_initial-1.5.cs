using Microsoft.EntityFrameworkCore.Migrations;

namespace coreapi.Migrations
{
    public partial class initial15 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "mediaid",
                table: "Content");

            migrationBuilder.AddColumn<string>(
                name: "mediaids",
                table: "Content",
                type: "jsonb",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "mediaids",
                table: "Content");

            migrationBuilder.AddColumn<long>(
                name: "mediaid",
                table: "Content",
                type: "bigint",
                nullable: true);
        }
    }
}

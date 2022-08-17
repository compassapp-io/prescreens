using Microsoft.EntityFrameworkCore.Migrations;

namespace coreapi.Migrations
{
    public partial class initial11 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "Users",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<string>(
                name: "appleuid",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "googleuid",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "appleuid",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "googleuid",
                table: "Users");

            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "Users",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace coreapi.Migrations
{
    public partial class initial17 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "admin",
                table: "Users",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "boolean");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "admin",
                table: "Users",
                type: "boolean",
                nullable: false,
                oldClrType: typeof(bool),
                oldNullable: true);
        }
    }
}

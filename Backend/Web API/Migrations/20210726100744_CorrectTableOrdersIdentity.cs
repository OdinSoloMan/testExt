using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BackEnd.Migrations
{
    public partial class CorrectTableOrdersIdentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_UsersId1",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_UsersId1",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "UsersId1",
                table: "Orders");

            migrationBuilder.AlterColumn<string>(
                name: "UsersId",
                table: "Orders",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UsersId",
                table: "Orders",
                column: "UsersId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_UsersId",
                table: "Orders",
                column: "UsersId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_UsersId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_UsersId",
                table: "Orders");

            migrationBuilder.AlterColumn<Guid>(
                name: "UsersId",
                table: "Orders",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UsersId1",
                table: "Orders",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UsersId1",
                table: "Orders",
                column: "UsersId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_UsersId1",
                table: "Orders",
                column: "UsersId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

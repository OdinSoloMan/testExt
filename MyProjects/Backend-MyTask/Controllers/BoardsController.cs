using Backend_MyTask.DataAccess;
using Backend_MyTask.Domain;
using Backend_MyTask.Service.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_MyTask.Controllers
{
    [Route("board")]
    [ApiController]
    public class BoardsController : ControllerBase
    {
        private readonly IBoardRepository _repo;

        public BoardsController(IBoardRepository repo)
        {
            _repo = repo;
        }

        // GET: board/readall
        [HttpGet("read-all-board")]
        public async Task<ActionResult<string>> GetReadAllBoard() =>
            new OkObjectResult(await _repo.ReadAll());

        // GET board/read/{id}
        [HttpGet("read/{id}")]
        public async Task<ActionResult<string>> GetReadBoard(Guid id)
        {
            var res = await _repo.Read(id);
            if(res != null)
            {
                return new OkObjectResult(res);
            }
            return StatusCode(StatusCodes.Status204NoContent, new Response { Status = "Error", Message = "This board will not find!" });
        }

        // POST board/add
        [HttpPost("add")]
        public async Task<ActionResult<string>> PostAddBoard([FromBody] Board board)
        {
            if (ModelState.IsValid)
            {
                board.BoardCreate(board.Name, board.UserId);
                await _repo.Create(board);
                return new OkObjectResult(board);
            }
            return BadRequest(ModelState);
        }

        // PUT board/update/{id}
        [HttpPut("update/{id}")]
        public async Task<ActionResult<string>> PutUpdateBoard(Guid id, [FromBody] Board board)
        {
            var res = _repo.Read(id);
            if(res != null)
            {
                await _repo.Update(board);
                return new OkObjectResult(board);
            }
            return StatusCode(StatusCodes.Status204NoContent, new Response { Status = "Error", Message = "This board will not find!" });
        }

        // DELETE board/delete/{id}
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<string>> DeleteBoard(Guid id)
        {
            try
            {
                await _repo.Delete(id);
                return new OkObjectResult(new { delete_board = id });
            }
            catch
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "An error occurred while uninstalling!" });
            }
        }


        // GET board/readuser/{id}
        [HttpGet("readuser/{id}")]
        public async Task<ActionResult<string>> GetReadUserBoard(Guid id)
        {
            var res = await _repo.ReadUserBoard(id);
            if (res != null)
            {
                return new OkObjectResult(res);
            }
            return StatusCode(StatusCodes.Status204NoContent, new Response { Status = "Error", Message = "This board will not find!" });
        }
    }
}

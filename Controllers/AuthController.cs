using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Mikado.Models;
using Mikado.Services;
using Mikado.Data;

namespace Mikado.Controllers
{
  [Produces("application/json")]
  [Route("api/[controller]")]
  [ApiController]

  public class AuthController : ControllerBase
  {
    private readonly MediaDbContext _context;
    private IUserService _userService;
    private readonly IDataRepository<User> _repo;
    public AuthController(MediaDbContext context, IUserService userService, IDataRepository<User> repo)
    {
      _userService = userService;
      _repo = repo;
      _context = context;
    }

    [AllowAnonymous]
    [HttpPost("authenticate")]
    public async Task<IActionResult> Authenticate([FromBody]Authenticate user)
    {
      var authUser = _userService.Authenticate(user.Username, user.Password);
      var savedUser = await _context.Users.FindAsync(user);

      bool validPassword = BCrypt.Net.BCrypt.Verify(savedUser.Password, user.Password);

      if (authUser == null || !validPassword)
        return BadRequest(new { message = "Username or password is incorrect" });

      return Ok(user);
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup([FromBody] User user)
    {
      _repo.Add(user);

      var hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.Password);
      user.Password = hashedPassword;
      var save = await _repo.SaveAsync(user);

      return CreatedAtAction("GetUser", new { id = user.UserId }, user);
    }

    [HttpGet]
    public IActionResult GetAll()
    {
      var users = _userService.GetAll();
      return Ok(users);
    }
  }
}
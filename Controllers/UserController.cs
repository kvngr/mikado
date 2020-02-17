using System.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Mikado.Models;

namespace Mikado.UserControllers
{
  [ApiController]
  [Route("api/[controller")]
  [Produces("application/json")]

  public class UserController : ControllerBase
  {
    private readonly MediaDbContext _context;
    private readonly IDataRepository<User> _repo;
    public UserController(MediaDbContext context, IDataRepository<User> repo)
    {
      _context = context;
      _repo = repo;
    }
  }
}
using System.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Mikado.Models;

namespace Mikado.AuthController
{
  [ApiController]
  [Route("api/[controller")]
  [Produces("application/json")]

  public class AuthController : ControllerBase
  {
    private readonly MediaDbContext _context;
    private readonly IDataRepository<User> _repo;
    public AuthController(MediaDbContext context, IDataRepository<User> repo)
    {
      _context = context;
      _repo = repo;
    }
  }
}
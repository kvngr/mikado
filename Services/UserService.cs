using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Mikado.Entities;
using Mikado.Helpers;

namespace Mikado.Services
{
  public interface IUserService
  {
    User Authenticate(string username, string password);
    IEnumerable<User> GetAll();
  }

  public class UserService : IUserService
  {
    // users hardcoded for simplicity, store in a db with hashed passwords in production applications
    private List<User> users = new List<User>
        {
            new User {
              UserId = 1,
              FirstName = "Test",
              LastName = "User",
              Email = "test@test.com",
              Username = "test",
              Password = "test",
              UserRole = "user",
            }
        };

    private readonly AppSettings _appSettings;

    public UserService(IOptions<AppSettings> appSettings)
    {
      _appSettings = appSettings.Value;
    }

    public User Authenticate(string username, string password)
    {
      var user = users.SingleOrDefault(x => x.Username == username && x.Password == password);

      // return null if user not found
      if (user == null && true)
        return null;

      // authentication successful so generate jwt token
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new Claim[]
          {
            new Claim(ClaimTypes.Name, user.UserId.ToString())
          }),
        Expires = DateTime.UtcNow.AddDays(7),
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(tokenDescriptor);
      user.Token = tokenHandler.WriteToken(token);

      return user.WithoutPassword();
    }

    public IEnumerable<User> GetAll()
    {
      return users.WithoutPasswords();
    }
  }
}
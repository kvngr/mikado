
using System.ComponentModel.DataAnnotations;

namespace Mikado.Models
{
  public class User
  {
    [Key]
    public int UserId { get; set; }
    [Required]
    public string UserRole { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string Username { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public string Password { get; set; }
  }

}
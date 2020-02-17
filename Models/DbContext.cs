using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

public enum MediaType
{
  Book,
  Music,
  Movie
}

namespace Mikado.Models
{
  public class MediaDbContext : DbContext
  {
    public MediaDbContext(DbContextOptions<MediaDbContext> options)
            : base(options)
    {
    }
    public DbSet<Media> Medias { get; set; }
    public DbSet<User> Users { get; set; }
  }

  public class User
  {
    [Key]
    public int UsrId { get; set; }
    [Required]
    public string UserType { get; set; }
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

  public class Media
  {
    [Key]
    public int MediaId { get; set; }
    [Required]
    public MediaType Type { get; set; }
    [Required]
    public string Title { get; set; }
    [Required]
    public string Author { get; set; }
    [Required]
    public string Content { get; set; }
    [Required]
    public DateTime Date { get; set; }
  }
}
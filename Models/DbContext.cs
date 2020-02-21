using Microsoft.EntityFrameworkCore;

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
}
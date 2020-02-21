using System;
using System.ComponentModel.DataAnnotations;

namespace Mikado.Models
{
  public class Media
  {
    [Key]
    public int MediaId { get; set; }
    [Required]
    public string Type { get; set; }
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


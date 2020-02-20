using System;
using System.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Mikado.Models;

namespace Mikado.MediaController
{
  [Produces("application/json")]
  [Route("api/[controller]")]
  [ApiController]
  public class MediaController : ControllerBase
  {
    private readonly MediaDbContext _context;
    private readonly IDataRepository<Media> _repo;

    public MediaController(MediaDbContext context, IDataRepository<Media> repo)
    {
      _context = context;
      _repo = repo;
    }

    // GET ALL
    [HttpGet]
    public IEnumerable<Media> GetMedias()
    {
      return _context.Medias.OrderByDescending(media => media.MediaId);
    }

    // FIND ONE
    [HttpGet("{id}")]
    public async Task<IActionResult> GetMedia([FromRoute] int id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var media = await _context.Medias.FindAsync(id);

      if (media == null)
      {
        return NotFound();
      }
      return Ok(media);
    }

    // UPDATE ONE
    [HttpPut("{id}")]
    public async Task<IActionResult> PutMedia([FromRoute] int id, [FromBody] Media media)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (id != media.MediaId)
      {
        return BadRequest();
      }

      _context.Entry(media).State = EntityState.Modified;

      try
      {
        _repo.Update(media);
        var save = await _repo.SaveAsync(media);
      }
      catch (DbUpdateConcurrencyException)
      {
        if (MediaExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    // CREATE
    [HttpPost]
    public async Task<IActionResult> PostMedia([FromBody] Media media)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      _repo.Add(media);
      var save = await _repo.SaveAsync(media);

      return CreatedAtAction("GetMedia", new { id = media.MediaId }, media);
    }

    // DELETE ONE
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMedia([FromRoute] int id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var media = await _context.Medias.FindAsync(id);
      if (media == null)
      {
        return NotFound();
      }
      _repo.Delete(media);
      var save = await _repo.SaveAsync(media);

      return Ok(media);
    }
    private bool MediaExists(int id)
    {
      return _context.Medias.Any(media => media.MediaId == id);
    }
  }
}

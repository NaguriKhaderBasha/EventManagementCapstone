using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using EventManagement.Data;
using EventManagement.Models;
using System;

namespace EventManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private static readonly HashSet<string> AllowedStatuses = new() { "upcoming", "completed", "active", "cancelled" };

        public EventController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/event
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            var events = await _context.Events.ToListAsync();
            return Ok(events);
        }

        // POST: api/event (Insert a new event)
        [HttpPost]
        public async Task<ActionResult<Event>> CreateEvent([FromBody] Event newEvent)
        {
            if (newEvent == null)
            {
                return BadRequest("Invalid event data.");
            }

            // Validate status field
            if (!AllowedStatuses.Contains(newEvent.Status))
            {
                return BadRequest($"Invalid status value. Allowed values: {string.Join(", ", AllowedStatuses)}");
            }

            try
            {
                _context.Events.Add(newEvent);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetEvents), new { id = newEvent.Id }, newEvent);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error saving event: {ex.Message}");
            }
        }

        // PUT: api/event/{id} (Update an existing event)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(int id, [FromBody] Event updatedEvent)
        {
            if (updatedEvent == null || id != updatedEvent.Id)
            {
                return BadRequest("Invalid request data.");
            }

            // Validate status field
            if (!AllowedStatuses.Contains(updatedEvent.Status))
            {
                return BadRequest($"Invalid status value. Allowed values: {string.Join(", ", AllowedStatuses)}");
            }

            var existingEvent = await _context.Events.FindAsync(id);
            if (existingEvent == null)
            {
                return NotFound("Event not found.");
            }

            // Update event fields
            existingEvent.Name = updatedEvent.Name;
            existingEvent.EventDate = updatedEvent.EventDate;
            existingEvent.Attendees = updatedEvent.Attendees;
            existingEvent.Status = updatedEvent.Status;

            try
            {
                await _context.SaveChangesAsync();
                return NoContent(); // 204 No Content
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error updating event: {ex.Message}");
            }
        }

        // DELETE: api/event/{id} (Delete an event)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var eventToDelete = await _context.Events.FindAsync(id);
            if (eventToDelete == null)
            {
                return NotFound("Event not found.");
            }

            try
            {
                _context.Events.Remove(eventToDelete);
                await _context.SaveChangesAsync();
                return NoContent(); // 204 No Content
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deleting event: {ex.Message}");
            }
        }
    }
}

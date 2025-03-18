using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventManagement.Data;
using EventManagement.Models;
using EventManagement.DTO;
using System.Linq;
using System.Threading.Tasks;

namespace EventManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LoginController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginUser request)
        {
            if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Invalid request data");
            }

            // Fetch user from app_users table
            var result = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (result != null)
            {
                // Fetching dashboard data
                var totalEvents = await _context.Events.CountAsync();
                var activeEvents = await _context.Events.CountAsync(e => e.Status == "active");
                var totalAttendees = await _context.Attendees.CountAsync();
                var totalRevenue = await _context.Revenues.SumAsync(r => r.Amount);

                var upcomingEvents = await _context.Events
                    .Where(e => e.Status == "upcoming")
                    .OrderBy(e => e.EventDate)
                    .Select(e => new
                    {
                        e.Id,
                        e.Name,
                        EventDate = e.EventDate.ToString("MMM dd, yyyy"),
                        e.Attendees
                    })
                    .ToListAsync();

                return Ok(new
                {
                    Message = "Login successful",
                    User = request.Email,
                    DashboardData = new
                    {
                        TotalEvents = totalEvents,
                        ActiveEvents = activeEvents,
                        TotalAttendees = totalAttendees,
                        TotalRevenue = totalRevenue,
                        UpcomingEvents = upcomingEvents
                    }
                });
            }

            return Unauthorized("Invalid username or password");
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using EventManagement.Data;
using EventManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserRegisterController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserRegisterController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public IActionResult RegisterUser([FromBody] User userData)
        {
            if (userData == null || string.IsNullOrEmpty(userData.FirstName) ||
                string.IsNullOrEmpty(userData.LastName) || string.IsNullOrEmpty(userData.Email) ||
                string.IsNullOrEmpty(userData.Password))
            {
                return BadRequest(new { status = "failure", message = "Invalid input data" });
            }

            try
            {
                User newUser = new User
                {
                    FirstName = userData.FirstName,
                    LastName = userData.LastName,
                    Email = userData.Email,
                    Password = userData.Password, // Consider hashing the password before saving
                    Role = "user",
                    Status = "active",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.Users.Add(newUser);
                _context.SaveChanges();

                return Ok(new { status = "success", message = "User registered successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { status = "failure", message = ex.Message });
            }
        }
    }
}

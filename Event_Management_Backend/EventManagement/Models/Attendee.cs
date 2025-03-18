using System;
using System.Collections.Generic;

namespace EventManagement.Models;

public partial class Attendee
{
    public int Id { get; set; }

    public int REventId { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public DateTime? RegistrationDate { get; set; }
}

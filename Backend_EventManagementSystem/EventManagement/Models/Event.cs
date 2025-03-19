using System;
using System.Collections.Generic;

namespace EventManagement.Models;

public partial class Event
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public DateOnly EventDate { get; set; }

    public int? Attendees { get; set; }

    public string Status { get; set; } = null!;
}

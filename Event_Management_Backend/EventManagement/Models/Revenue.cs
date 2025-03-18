using System;
using System.Collections.Generic;

namespace EventManagement.Models;

public partial class Revenue
{
    public int Id { get; set; }

    public int REventId { get; set; }

    public decimal Amount { get; set; }

    public DateTime? ReceivedDate { get; set; }
}

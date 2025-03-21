﻿using System;
using System.Collections.Generic;

namespace EventManagement.Models;

public partial class Notification
{
    public int Id { get; set; }

    public int RUserId { get; set; }

    public string Message { get; set; } = null!;

    public bool? IsRead { get; set; }

    public DateTime? CreatedAt { get; set; }
}

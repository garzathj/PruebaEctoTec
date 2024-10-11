using System.ComponentModel.DataAnnotations;

namespace PruebaEctoTec.Server.EF;

public partial class Project
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; } = null!;
}

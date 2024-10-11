using Microsoft.EntityFrameworkCore;

namespace PruebaEctoTec.Server.EF;

public partial class DbContext : Microsoft.EntityFrameworkCore.DbContext
{
    private string _hgWebsiteHostingerConn;

    public DbContext(DataAccess da)
    {
        _hgWebsiteHostingerConn = da.hgWebsiteHostingerConn;
    }

    public DbContext(DataAccess da, DbContextOptions<DbContext> options)
        : base(options)
    {
        _hgWebsiteHostingerConn = da.hgWebsiteHostingerConn;
    }

    public virtual DbSet<Project> Projects { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseMySQL(this._hgWebsiteHostingerConn);

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Name).HasMaxLength(1000);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

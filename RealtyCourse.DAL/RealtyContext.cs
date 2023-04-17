using Microsoft.EntityFrameworkCore;
using RealtyCourse.Business.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace RealtyCourse.DAL
{
    public class RealtyContext : DbContext
    {
        public DbSet<House> Houses { get; set; }
        public DbSet<Apartment> Apartments { get; set; }

        public RealtyContext(DbContextOptions<RealtyContext> options) : base(options) { }

        public RealtyContext() { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.RemovePluralazingTableNames();
        }
    }
}

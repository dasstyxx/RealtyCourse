using Microsoft.EntityFrameworkCore;
using RealtyCourse.Business.Models;
using RealtyCourse.DAL;
using RealtyCourse.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace RealtyCourse.Tests
{
    public class ConnectionTest
    {
        //[Fact]
        public void HouseConnectionTest()
        {
            using (var realtyContext = GetContext())
            {
                House foundHouse = realtyContext.Houses.Find(1);
                Assert.NotNull(foundHouse);
            }
        }

        [Fact]
        public void HouseGetWithRepository()
        {
            using (var realtyContext = GetContext())
            {
                using (var repo = new GenericRepository<House, RealtyContext>(realtyContext))
                {
                    List<House> houses = repo.GetAllWithoutTracking()
                        .Take(2)
                        .ToList();

                    Assert.NotEmpty(houses);
                }

            }
        }


        [Fact]
        public void ApartmentGetWithRepository()
        {
            using (var realtyContext = GetContext())
            {
                using (var repo = new GenericRepository<Apartment, RealtyContext>(realtyContext))
                {
                    List<Apartment> apartments = repo.GetAllWithoutTracking()
                        .Take(5)
                        .ToList();

                    Assert.NotEmpty(apartments);
                }

            }
        }

        private RealtyContext GetContext()
        {
            string connectionString = @"Data Source=LAPTOP-7KS1AJ2Q;Initial Catalog=RealtyCourse;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False";
            DbContextOptionsBuilder<RealtyContext> optionsBuilder = new DbContextOptionsBuilder<RealtyContext>();
            optionsBuilder.UseSqlServer(connectionString);
            return new RealtyContext(optionsBuilder.Options);
        }
    }
}

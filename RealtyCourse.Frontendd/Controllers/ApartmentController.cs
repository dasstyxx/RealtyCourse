using Microsoft.AspNetCore.Mvc;
using RealtyCourse.Business.Models;
using RealtyCourse.DAL.Repositories;
using RealtyCourse.DAL;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RealtyCourse.Frontend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApartmentController : Controller
    {
        private readonly GenericRepository<Apartment, RealtyContext> _apartmentRepository;

        public ApartmentController(GenericRepository<Apartment, RealtyContext> repository)
        {
            _apartmentRepository = repository;
        }


        [Route("getall")]
        [HttpGet]
        public IActionResult GetAll()
        {
            List<Apartment> apartments = _apartmentRepository.GetAllWithoutTracking()
                .ToList();

            return Json(apartments);
        }

        [Route("get")]
        [HttpGet]
        public IActionResult GetOne(int? id)
        {
            if (!id.HasValue) return NotFound();

            var apartment = _apartmentRepository.GetWithoutTracking(x => x.Id == id.Value);

            return Json(new { apartmentInfo = apartment });
        }
    }
}

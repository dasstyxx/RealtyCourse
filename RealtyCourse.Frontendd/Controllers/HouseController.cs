using Microsoft.AspNetCore.Mvc;
using RealtyCourse.Business.Models;
using RealtyCourse.DAL;
using RealtyCourse.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RealtyCourse.Frontend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HouseController : Controller
    {
        private readonly GenericRepository<House, RealtyContext> _houseRepository;

        public HouseController(GenericRepository<House, RealtyContext> repository)
        {
            _houseRepository = repository;
        }

        [Route("getall")]
        [HttpGet]
        public IActionResult GetAll()
        {
            List<House> houses = _houseRepository.GetAllWithoutTracking()
                .ToList();

            return Json(houses);
        }

        [Route("get")]
        [HttpGet]
        public IActionResult GetOne(int? id)
        {
            if (!id.HasValue) return NotFound("Id is missing!");

            var house = _houseRepository.GetWithoutTracking(x => x.Id == id.Value);

            return Json(new { houseInfo = house});
        }
    }
}

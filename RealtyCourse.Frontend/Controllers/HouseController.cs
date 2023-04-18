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
        public IActionResult GetAll(int? page, int? pageSize)
        {
            int targetPage = page.GetValueOrDefault(1);
            int targetPageSize = pageSize.GetValueOrDefault(10);

            IQueryable<House> allEntities = _houseRepository.GetAllWithoutTracking();
            int totalCount = allEntities.Count();

            int skipPages = (targetPage - 1) * targetPageSize;
            //if (skipPages > totalCount)
            //{
            //    return NotFound("Page is not found!");
            //}

            List<House> housesInfo = allEntities
                .Skip(skipPages)
                .Take(targetPageSize)
                .ToList();

            return Json(new { housesInfo, totalCount });
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

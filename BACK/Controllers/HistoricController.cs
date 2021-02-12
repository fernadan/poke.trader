using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Services;
using API.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HistoricController : Controller
    {
        private readonly HistoricServices _hisotircService;

        public HistoricController(HistoricServices hisotircService)
        {
            _hisotircService = hisotircService;
        }

        [HttpGet("{id:length(24)}")]
        public ActionResult<List<Historic>> Get(string id)
        {
            var hist = _hisotircService.GetByUser(id);

            if (hist == null)
            {
                return BadRequest();
            }

            return hist;
        }
    }
}
